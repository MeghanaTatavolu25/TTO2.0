import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  height:'100%',
  justifyContent:'center',
  overflowWrap: "anywhere" as 'anywhere'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function DropFiles(props:{returnFiles:(val:File[])=>void, files:File[], text:string}) {

    const [uploaded,setuploaded] = useState<File[]>([])
    const onDrop = useCallback((acceptedFiles:File[]) => {
        setuploaded((prev)=>[...prev, ...acceptedFiles])
    }, [])

    useEffect(()=>{
      props.returnFiles(uploaded)
    },[uploaded])

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: {'.pdf': [],'video/mp4': [], '.vtt':[]}, onDrop});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    // ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>{props.text}</p>
        {props.files.map((item, index)=>(
            <>
            {item.name}<br/>
            </>
        ))}
      </div>
  );
}