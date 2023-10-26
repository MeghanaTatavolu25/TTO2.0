import React from "react";
import HighlightedText from "../../Components/HighlightedText.tsx";

export function Bubble(props: { children: React.ReactElement,  highlight:string }) {


    return (
            <div className="bubbleLeft" style={{
                background: "#b4d8f8",
                width: "80%",
                height: "fit-content",
                borderRadius: "12px",
                padding: '20px',
                marginBottom:'20px',
                maxWidth:'80%',
                position:'relative' as 'relative'
            }}>
                <HighlightedText highlight={props.highlight}>
                    {props.children}
                </HighlightedText>
            </div> 
    )
}