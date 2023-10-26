import React, { useEffect } from "react";
import { Document, Page,pdfjs  } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export function PDFViewer(props:{url:string, width:number|undefined, highlight:number}) {

    function onDocumentLoadSuccess(e: any) {
        if (props.highlight !== undefined) {
            // console.log(document.getElementById(`pdf`))
            let answer = props.highlight;
            if (props.highlight > 0.05) {
                answer = answer - 0.05;
            }
            let pdf = document.getElementById("pdf")
            setTimeout(() => {
                if (pdf) {
                    pdf.scroll(0, pdf.scrollHeight * answer);
                    // console.log("scrolled", pdf.scrollHeight * answer)
                }
            }, 200);
        }
    }

    return (
        <Document file={props.url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page width={props.width} pageIndex={0}/>
      </Document>
    )
}