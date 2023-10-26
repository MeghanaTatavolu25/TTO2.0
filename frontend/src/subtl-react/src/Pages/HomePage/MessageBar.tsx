import React, { useEffect, useMemo, useState } from "react";
import {
  IconButton,
  TextField,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import {
  getMeiliRecommendations,
  sendMessage,
  speechtotexteng,
  speechtotexttel,
  translate,
} from "../../utils/APIUtils.ts";
import { Microphone, PaperPlaneTilt, StopCircle } from "phosphor-react";
import { Answer, chatFunctions } from "./@types";
import AWS from "aws-sdk";
import { useId } from "react";

AWS.config.update({
  accessKeyId: "AKIA3BOLL3RQW4AXHILC",
  secretAccessKey: "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",
  region: "us-east-2",
});

const s3 = new AWS.S3();

async function uploadFile(file: any) {
  console.log("Upload File started");
  let temp = file.name.split(".");
  let fileExtension = temp[temp.length - 1];
  let fileName = file.name.replace(/[^a-zA-Z0-9]/g, "_");
  fileName = fileName + "." + fileExtension;
  let url =
    "https://bahubhashak-iiit.s3.us-east-2.amazonaws.com/ts/" + fileName;
  const params = {
    Bucket: "bahubhashak-iiit",
    Key: "ts/" + fileName,
    ACL: "public-read",
    ContentType: file.type,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params)
      .on("httpUploadProgress", (evt) => {
        // that's how you can keep track of your upload progress
      })
      .on("complete", (data) => {
        resolve(url);
      })
      .send((err) => {
        if (err) {
          reject(err);
        }
      });
  });
}

export function MessageBar(props: { chatFunctions: chatFunctions }) {
  const [question, setQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [language, setLanguage] = useState(localStorage.getItem("language"));
  const [recording, setRecording] = useState(false);
  let answers: any = [];
  const MicRecorder = require("mic-recorder-to-mp3");
  const s3 = new AWS.S3();
  const recorder = useMemo(
    () =>
      new MicRecorder({
        bitRate: 128,
      }),
    []
  );
  useEffect(() => {
    const meiliRecommendations = document.getElementById(
      "meiliRecommendations"
    ) as HTMLElement;
    document.addEventListener("click", function (event) {
      if (!meiliRecommendations.contains(event.target as Node)) {
        setRecommendations([]);
      }
    });
  }, []);

  useEffect(() => {
    if (recommendations.length > 0) console.log(recommendations);
  }, [recommendations]);

  function Ask(query?: string) {
    let ask = "";
    console.log(query, "Ask Triggered");
    if (query !== undefined) {
      ask = query;
    } else {
      ask = question as string;
    }
    // if (question === null) return;
    props.chatFunctions.updateQuestion(ask);
    sendMessage(
      ask as string,
      sessionStorage.getItem("company_group") as string,
      sessionStorage.getItem("access_token") as string
    ).then((res: any) => {
      if (language === "ENG") {
        props.chatFunctions.updateMessages(res);
        res.map((data: any) => {
          console.log(data.answer, "Anaswers");
        });
      } else {
        props.chatFunctions.updateMessages(
          res.map((obj: any) => ({
            answer: obj.answer,
            id: obj.id,
            phrase: obj.phrase,
          }))
        );
      }
    });
    setQuestion(null);
    setRecommendations([]);
  }

  function VoiceAsk() {
    console.log("Hello");
    setRecording(!recording);
    if (!recording) {
      recorder
        .start()
        .then(() => {
          console.log("Helloi");
        })
        .catch((err: any) => {
          console.error("Error in recording is...", err);
        });
    } else {
      recorder
        .stop()
        .getMp3()
        .then(async (props: [buffer: any, blob: any]) => {
          const file = new File(props[0], "me-at-thevoice.mp3", {
            type: "audio/mp3",
            lastModified: Date.now(),
          });

          await uploadFile(file).then((res: any) => {
            setLoading(true);
            if (language === "ENG") {
              speechtotexteng(res).then((result: any) => {
                setLoading(false);
                Ask(result);
              });
            } else {
              speechtotexttel(res).then((result: any) => {
                console.log(result, "Result");
                setLoading(false);
                Ask(result);
              });
            }
          });
        })
        .catch((e: any) => {
          alert("We could not retrieve your message");
          console.log(e);
        });
    }
  }

  return (
    <>
      <div id="meiliRecommendations">
        {recommendations.length > 0 && (
          <div
            className="recommendations"
            style={{
              position: "absolute",
              width: "fit-content",
              left: "23%",
              bottom: "14vh",
              borderRadius: "6px",
              background: "white",
              padding: "15px",
              boxShadow: "0px 0px 5px 1px #0000001f",
              height: "166px",
            }}
          >
            <h3
              style={{
                padding: "8px",
                margin: 0,
                fontSize: "18px",
              }}
            >
              Recent Questions
            </h3>
            {recommendations.map((item, index) => (
              <div
                style={{
                  fontSize: "15px",
                  cursor: "pointer",
                  margin: "10px",
                }}
                onClick={() => {
                  // setQuestion(item.query_string);
                  Ask(item.query_string);
                }}
              >
                {item.query_string}
              </div>
            ))}
          </div>
        )}
      </div>

      <span
        className="messageBar"
        style={{
          position: "absolute",
          width: "calc(69% + 56px)",
          height: "60px",
          top: "85vh",
          left: "23%",
          borderRadius: "8px",
          background: "white",
          padding: "10px",
        }}
      >
        <TextField
          autoComplete="off"
          style={{ width: "100%" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (language === "ENG") Ask();
              else {
                translate(question, "tel", "eng").then((res: any) => {
                  setQuestion(res.data);
                  Ask();
                });
              }
              return;
            }
            if (question)
              getMeiliRecommendations(
                question,
                sessionStorage.getItem("company_id") as string
              ).then((res: any) => {
                console.log(res, "Recommendations");
                if (language === "ENG") setRecommendations(res);
                else {
                  // translate(question, "tel", "eng").then((res: any) => {
                  // });
                }
              });
          }}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          value={question ? question : ""}
          label={language !== "TEL" ? "Ask Me Anything!" : "నన్ను ఏమైనా అడగండి"}
          variant="filled"
        />
        <span
          style={{
            position: "relative",
            left: "calc(100% - (80px + 30px))",
            top: "-52px",
          }}
        >
          {" "}
          {loading ? (
            <IconButton>
              <CircularProgress />
            </IconButton>
          ) : (
            <IconButton onClick={() => VoiceAsk()}>
              {recording ? (
                <StopCircle weight="fill" size={32} color={"red"} />
              ) : (
                <Microphone
                  weight="fill"
                  size={32}
                  //    color={'#0085e5'}
                />
              )}
            </IconButton>
          )}
        </span>
        <span
          style={{
            position: "relative",
            left: "calc(100% - (80px + 30px))",
            top: "-52px",
          }}
        >
          <IconButton onClick={() => Ask()}>
            <PaperPlaneTilt
              weight="fill"
              size={32}
              //    color={'#0085e5'}
            />
          </IconButton>
        </span>
      </span>
    </>
  );
}
