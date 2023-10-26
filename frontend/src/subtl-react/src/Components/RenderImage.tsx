import React from 'react'

export default function RenderImage({src, width='100%', styles=undefined,onClick}:{src:string, width?:string, styles?:React.CSSProperties | undefined,onClick?:()=>void}){

    return(
        <img  src={src} style={{width:width,...styles}} onClick={onClick}/>
    )
}