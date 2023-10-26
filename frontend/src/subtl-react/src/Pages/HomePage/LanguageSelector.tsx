import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

const LanguageSelector = () => {
  const [Reload, setReload] = useState(true);
  const [Language, setLanguage] = useState(localStorage.getItem("language"));
  if (Language === null) {
    localStorage.setItem("language", "TEL");
  }
  useEffect(() => {
    setLanguage(localStorage.getItem("language"));
    console.log(Language, "Language");
  }, [Reload]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button
          variant={Language === "TEL" ? "contained" : "outlined"}
          onClick={() => {
            localStorage.setItem("language", "TEL");
            setReload(!Reload);
            window.location.reload();
          }}
        >
          Telugu
        </Button>
        <Button
          variant={Language !== "TEL" ? "contained" : "outlined"}
          onClick={() => {
            localStorage.setItem("language", "ENG");
            setReload(!Reload);
            window.location.reload();
          }}
        >
          English
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelector;
