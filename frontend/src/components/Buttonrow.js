import React from 'react';
import "../styles/Buttonrow.css"
import { useState, useEffect } from "react";

function ButtonRow(patent) {
  console.log(patent);
  const [activeButton, setActiveButton] = useState(0);

  const buttonStyle = (buttonIndex) => ({
    flexGrow: buttons[buttonIndex].length / 10, // Adjust the factor as needed
  });

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <div style={{fontFamily:'Prompt'}}>
      <Userow onButtonClick={handleButtonClick} activeButton={activeButton} />
      {activeButton === 0 && (
        <div style={{ marginTop: "2em" }}>
          <p style={{ fontSize: "1.1vw", fontWeight: "500", color: "#2C2C2C" }}>Summary</p>
          <p style={{fontSize:"1.05vw",fontWeight:300}}>{patent.patent.patent.Overview}
          </p>
        </div>
      )}
      {activeButton === 1 && (
        <div style={{ marginTop: "2em" }}>
          <p style={{ fontSize: "1.1vw", fontWeight: "500", color: "#2C2C2C" }}>Type of Work</p>
          <p style={{fontSize:"1.05vw",fontWeight:300}} >{patent.patent.patent.Type_of_Work}
          </p>
        </div>
      )}
      {activeButton === 2 && (
        <div style={{ marginTop: "2em" }}>
          <p style={{ fontSize: "1.1vw", fontWeight: "500", color: "#2C2C2C" }}>State of Work</p>
          <p style={{fontSize:"1.05vw",fontWeight:300}} >{patent.patent.patent.State_of_Work}
        </p>
        </div>
      )}
      {activeButton === 3 && (
        <div style={{ marginTop: "2em" }}>
          <p style={{ fontSize: "1.1vw", fontWeight: "500", color: "#2C2C2C" }}>Potential Applications</p>
          <p style={{fontSize:"1.05vw",fontWeight:300}} >{patent.patent.patent.Potential_Applications}
          </p>
        </div>
      )}
      {activeButton === 4 && (
        <div style={{ marginTop: "2em" }}>
          <p style={{ fontSize: "1.1vw", fontWeight: "500", color: "#2C2C2C" }}>Related Publications</p>
          <p style={{fontSize:"1.05vw",fontWeight:300}} > {patent.patent.patent.Related_Publications.map(result => ( <div>{result} &nbsp </div> ))} 
          </p>
        </div>
      )}
      {activeButton === 5 && (
        <div style={{ marginTop: "2em" }}>
          <p style={{ fontSize: "1.1vw", fontWeight: "500", color: "#2C2C2C" }}>Demo Link</p>
          <p style={{fontSize:"1.05vw",fontWeight:300}} >{patent.patent.patent.Demo_Link}
          </p>
        </div>
      )}
    </div>
  );
}

const Userow = (props) => {
  const buttons = ["Overview", "Type of work", "State of work", "Potential Applications", "Related Publications", "Demo Link"];

  return (
    <div style={{ display: "flex", alignItems: "left" }}>
    {buttons.map((button,index) => (
      <div
        key={index}
        style={{
          padding: "0.1em",
          textDecoration: props.activeButton === index ? "underline" : "none",
          cursor: "pointer",
          marginLeft: 0,
          marginRight: "auto",
          whiteSpace: "nowrap",
          fontSize:"1.1vw",
          font:"Montserrat",
          color: props.activeButton===index? "#1A1A1A":"#515151",
          fontWeight: props.activeButton===index? "500":"400"

        }}
        onClick={() => props.onButtonClick(index)}

      >
        {button}
      </div>
    ))}
  </div>
  );
};


export default ButtonRow;
