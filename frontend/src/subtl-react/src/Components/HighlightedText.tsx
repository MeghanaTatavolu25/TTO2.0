import React, { useState, useEffect } from "react";

export default function HighlightedText(props: {
  children: React.ReactElement;
  highlight: string;
}) {
  const [before, setBefore] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);

  useEffect(() => {
    // console.log(props.children)
    if (props.children && props.highlight) {
      let text = props.children.props.children as string;
      setBefore(
        `${text
          .substring(
            0,
            text.toLowerCase().indexOf(props.highlight.toLowerCase())
          )
          .trim()} `
      );
      setAfter(
        ` ${text
          .slice(
            text.toLowerCase().indexOf(props.highlight.toLowerCase()) +
              props.highlight.length
          )
          .trim()}`
      );
    }
  }, []);

  return before && after ? (
    <>
      {before}
      <b>{props.highlight}</b>
      {after}
    </>
  ) : (
    <>{props.children}</>
  );
}
