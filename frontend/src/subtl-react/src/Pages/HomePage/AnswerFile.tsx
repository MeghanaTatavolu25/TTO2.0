import { IconButton } from "@mui/material";
import { RawAxiosResponseHeaders } from "axios";
import { CaretDown, CaretUp } from "phosphor-react";
import React, { useEffect, useState } from "react";
import HighlightedText from "../../Components/HighlightedText.tsx";
import { PDFViewer } from "../../Components/PDFViewer.tsx";
import { getPage, getPDF } from "../../utils/APIUtils.ts";
import { Answer } from "./@types";

const ArrowBtnStyle={
    position: "absolute" as 'absolute',
    left: "50%",
    zIndex: "100",
}

export function AnswerFile(props: { answer: Answer, selected: number, page: { url: string, highlight: number, headers:RawAxiosResponseHeaders } | null }) {

    const [docsObject, setDocsObjects] = useState<{[page:string]:{ url: string, highlight: number, headers:RawAxiosResponseHeaders }}>({})
    const [currPageNo, setcurrPageNo] = useState<number|null>(null)
    const [currPageObject, setcurrPageObject] = useState<{ url: string, highlight: number, headers:RawAxiosResponseHeaders } | null>(null)

    useEffect(()=>{
        if(props.answer.document_type==='pdf'){
            setcurrPageNo(props.answer.page_no)
            setDocsObjects((prev)=>({
                ...prev,
                [props.answer.page_no]:props.page
            }));
            setcurrPageObject(props.page)
        }
    },[props.page]);

    useEffect(()=>{
        if(currPageNo){

            if(currPageNo in docsObject){
                setcurrPageObject(docsObject[currPageNo])
                console.log(docsObject[currPageNo])
            }else{
                getPage(currPageNo, props.answer.document_id).then((res)=>{
                    setcurrPageObject(res)
                    setDocsObjects((prev)=>({
                        ...prev,
                        [currPageNo]:res
                    }));
                })
            }  
        }
    },[currPageNo]);

    function getPrevPage(){
        if(currPageNo){
            let temp = currPageNo
            setcurrPageNo(temp-1)
        }
    }
    function getNextPage(){
        if(currPageNo){
            let temp = currPageNo
            setcurrPageNo(temp+1)
        }
    }

    return (
        props.answer ? 
        <>
                <IconButton 
                onClick={()=>getPrevPage()}
                style={{
                ...ArrowBtnStyle, 
                top:"0",
                display:props.page&&props.page?.headers.first_page==='False'?"block":"none"
                }}>
                    <CaretUp size={32} weight="bold" />
                </IconButton>
                <IconButton 
                onClick={()=>getNextPage()}
                style={{
                    display:props.page&&props.page?.headers.last_page==='False'?"block":"none",
                    ...ArrowBtnStyle, 
                    bottom:"0"
                    }}>
                    <CaretDown size={32} weight="bold" />
                </IconButton>
            
            {props.selected!==100
                && props.answer.document_type === 'pdf'
                &&
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    id={`pdf`}
                    style={{
                        width: '100%',
                        height: '100%',
                        overflowX: 'hidden',
                        overflowY: 'scroll',
                        borderRadius: '8px',
                        marginBottom: '20px',
                    }}>
                    {currPageObject&&props.page && <PDFViewer
                        width={document.getElementById(`popupinner`)?.clientWidth}
                        url={currPageObject.url}
                        highlight={currPageObject.highlight}
                    />}
                </div>}



                {/* youtube */}

                {props.selected !== 100 && props.answer.document_type === 'youtube' && <div id="contentOverlay" style={{
                    width: '100%',
                    height: '100%',
                }}>
                    <iframe
                    className="youtubeIframe"
                        src={`https://www.youtube.com/embed/${props.answer.metadata[0]}?autoplay=1&start=${Math.floor(props.answer.metadata[1])}`}
                        allowFullScreen frameBorder={0} allow="autoplay" style={{ borderRadius: '6px', width: '100%', height: '100%' }} ></iframe>
                </div>}

        </> : null

    )
}