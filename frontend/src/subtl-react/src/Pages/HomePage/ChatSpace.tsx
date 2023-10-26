import {
  AxiosHeaders,
  AxiosResponse,
  RawAxiosRequestHeaders,
  RawAxiosResponseHeaders,
} from "axios";
import React, { useState } from "react";
import HighlightedText from "../../Components/HighlightedText.tsx";
import { PDFViewer } from "../../Components/PDFViewer.tsx";
import RenderImage from "../../Components/RenderImage.tsx";
import { getPDF } from "../../utils/APIUtils.ts";
import { Answer } from "./@types";
import { AnswerFile } from "./AnswerFile.tsx";
import subtlBot from "../../Assets/subtl-bot-icon.svg";
import { Popup } from "./Popup.tsx";
import { Button } from "@mui/material";
import ChatBlock from "./ChatBlock.tsx";

export function ChatSpace(props: {
  answers: Answer[];
  question: string | null;
}) {
  const [selected, setSelected] = useState(100);
  const [page, setPage] = useState<{
    url: string;
    highlight: number;
    headers: RawAxiosResponseHeaders;
  } | null>(null);
  const [show, setShow] = useState(false);
  const [loadNum, setLoadNum] = useState(10);
  const [language, Setlanguage] = useState(localStorage.getItem("language"));

  function documentTypeString(doctype: string, name: string) {
    if (doctype === "youtube") {
      return `Video - ${name}`;
    } else if (doctype === "csv") {
      return `Source - ${name}`;
    } else if (doctype === "website") {
      return `URL - ${name}`;
    }
  }

  return (
    <>
      <div
        id="chatspace"
        style={{
          position: "absolute",
          width: "69%", //50
          height: "77vh", //65
          background: "white",
          borderRadius: "11px",
          left: "23%",
          top: "8%", //10
          padding: "40px",
          boxShadow: "0px 0px 10px 4px #00000017",
          overflowY: "scroll",
        }}
      >
        {/* <div style={{ width: '100%', height: '100%', display: 'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
                <div style={{width:'30%', display:'flex'}}>
                    <RenderImage src={subtlBot} />
                </div>
                <p>Subtl-Bot can help you get answers related to private documents, websites, and videos.
                        <br/><br/>Just ask me and get insights instantly!
                    </p>
            </div> */}

        {!props.question && (
          <div
            className="bubbleLeft"
            style={{
              background: "#b4d8f8",
              width: "fit-content",
              height: "fit-content",
              borderRadius: "12px",
              padding: "20px",
              position: "relative" as "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "3%",
              }}
            >
              <RenderImage
                src={subtlBot}
                width={"40px"}
                styles={{
                  background: "white",
                  padding: "10px",
                  paddingRight: "15px",
                  paddingLeft: "15px",
                  borderRadius: "19px",
                }}
              />
              <p
                style={{
                  marginLeft: "6%",
                  width: "346px",
                  maxWidth: "50vw",
                }}
              >
                {language !== "TEL"
                  ? "Hey there! What can I help you with today?"
                  : "నమస్కరమ, నేను మేకు ఈరోజు ఎల సహాయ పడగలను"}
              </p>
            </div>
          </div>
        )}

        {props.question && (
          <>
            <div
              className="bubbleRight"
              style={{
                background: "#0085e5",
                width: "fit-content",
                height: "fit-content",
                position: "relative",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                color: "white",
                marginLeft: "auto",
                marginBottom: "20px",
                maxWidth: "80%",
              }}
            >
              <span>{props.question}</span>
            </div>

            {props.answers.map(
              (answer, i) =>
                i + 1 <= loadNum && (
                  <ChatBlock
                    i={i}
                    loadNum={loadNum}
                    answer={answer}
                    setLoadNum={setLoadNum}
                  />
                )
            )}
          </>
        )}
      </div>
      {show && (
        <Popup
          updateShow={() => {
            setShow(false);
            setSelected(100);
            setPage(null);
          }}
        >
          <AnswerFile
            answer={props.answers[selected]}
            selected={selected}
            page={page}
          />
        </Popup>
      )}
    </>
  );
}

/*
At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
praesentium voluptatum deleniti atque corrupti quos dolores et quas
molestias excepturi sint occaecati cupiditate non provident, similique
sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore..................... <b>42</b>
  "https://www.youtube.com/embed/aVAvO-stA-s"              
*/
