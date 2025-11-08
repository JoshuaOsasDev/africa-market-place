import React from "react";

function TextStyle(props: { textContent: string; textStyle?: string }) {
  return (
    <span
      className={`font-["Inter"]  font-[12px] text-["#6F6F6F"] tracking-normal  block ${props.textStyle}`}
    >
      {props.textContent}
    </span>
  );
}

export default TextStyle;
