import { IconButton } from "@mui/material";
import { XCircle } from "phosphor-react";
import React from "react";

export function Popup(props: { children: React.ReactElement, updateShow: (val: boolean) => void }) {

    return (
        <div
        className="popupcontainer"
            onClick={() => props.updateShow(false)}
            style={{
                position: 'absolute',
                width: '100vw',
                height: '100vh',
                background: '#0000001a',
                zIndex: 1000,
                left: 0,
                top: 0,
                display:"block"
            }}>
            <div
            id={'popupinner'}
                onClick={(e) => {
                    e.stopPropagation()
                }}
                style={{
                    position: 'absolute',
                    width: "74%",
                    height: "80%",
                    background: "white",
                    borderRadius: "11px",
                    left: "10%",
                    top: "5%",
                    padding: "40px",
                    boxShadow: '0px 0px 10px 4px #00000017',
                    overflowY: 'scroll',
                    display:'block',
                    overflow:'hidden',
                    paddingTop:'50px'
                }}>
                <IconButton className="popupcancelbtn" style={{ position: "absolute", right: "6px", top: "6px" }} onClick={() => props.updateShow(false)}>
                    <XCircle size={32} />
                </IconButton>
                {props.children}
            </div>
        </div>
    )
}