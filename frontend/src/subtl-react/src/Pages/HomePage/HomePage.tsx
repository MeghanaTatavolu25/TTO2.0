import React, { useEffect, useState } from "react";
import RenderImage from "../../Components/RenderImage.tsx";
import SubtlLogo from "../../Assets/subtl_logo.png";
import "./customStyles.css";
import { ChatSpace } from "./ChatSpace.tsx";
import { Answer, chatFunctions } from "./@types";
import UserMenu from "./UserMenu.tsx";

export default function HomePage() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [question, setQuestion] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [lang, Setlanguage] = useState(localStorage.getItem("language"));

  const openWebsite = () => {
    window.open("https://www.subtl.ai/", "_blank");
  };
  const updateMessages = (Answers: Answer[]) => {
    setAnswers(Answers);
  };
  const updateQuestion = (question: string) => {
    setQuestion(question);
    setAnswers([]);
  };

  const chatFunctions: chatFunctions = {
    updateMessages: updateMessages,
    updateQuestion: updateQuestion,
  };

  useEffect(() => {
    let token = sessionStorage.getItem("access_token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return loggedIn ? (
    <div style={{ display: "flex" }} className="homePage">
      <div
        className="header"
        style={{
          position: "absolute",
          width: "300px",
          top: "10px",
          left: "0%",
        }}
      >
        <div
          className="headerDiv"
          style={{
            width: "400px",
            height: "400px",
            background: "white",
            borderRadius: "50%",
            position: "relative",
            top: "-272px",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: "20%",
            top: "35%",
            textAlign: "center",
          }}
          className="subtlbotinfo"
        >
          <h2>
            {lang === "ENG" ? "What is Subtl-Bot?" : "Subtl-Bot అంటే ఏమిటి?"}
          </h2>
          <p>
            {lang === "ENG"
              ? "AI answering for private documents, websites and videos. Just ask subtl-bot and get insights instantly!"
              : "ప్రైవేట్ డాక్యుమెంట్‌లు, వెబ్‌సైట్‌లు మరియు వీడియోల కోసం AI సమాధానం ఇస్తుంది. కేవలం subtl-botని అడగండి మరియు తక్షణమే అంతర్దృష్టులను పొందండి!"}
          </p>
        </div>
        <RenderImage
          src={SubtlLogo}
          styles={{
            width: "100%",
            position: "relative",
            top: "-426px",
            left: "54px",
            cursor: "pointer",
          }}
          onClick={openWebsite}
        />
      </div>
      <ChatSpace answers={answers} question={question} />
      <UserMenu />
    </div>
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Sorry Please{" "}
      <a style={{ margin: "5px" }} href={"/"}>
        Login
      </a>{" "}
      to Access this Page
    </div>
  );
}
