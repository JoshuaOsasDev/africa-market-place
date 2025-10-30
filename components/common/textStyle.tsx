import React from 'react'



function TextStyle(props: { 
    textContent: string,
    textStyle: string
}) {
  return (
      <div>
          <p className={ `font-["Inter"]  font-[12px] text-["#6F6F6F"] tracking-normal leading-1 ${props.textStyle}`}>
              { 
                  props.textContent
              }
          </p>
    </div>
  )
}

export default TextStyle