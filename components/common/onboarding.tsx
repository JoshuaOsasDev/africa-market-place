"use client"
import React, { useState } from 'react'
import TextStyle from './textStyle'

function Onboarding() {



  const list = [
    {
      value:1,
      id:1
    }, {
      value: 2,
      id: 2
    }
  ]
  const [level, setLevel] = useState(1)
  return (
    <div className='flex justify-center items-center flex-1 '>
      <div className='rounded-md bg-white w-5/6 md:w-2/3 lg:w-1/3 p-2 lg:p-4 '>
        {/* stages start */}
        <div className=' flex w-full items-center space-x-2'>
          { 
            list.map(item => { 
              return <div key={item.id} className='flex flex-1 flex-row items-center space-x-2'>
                <div className={ `flex items-center justify-center rounded-full  w-8 h-8 ${level === item.value ? "bg-[#2E7D32]" : "bg-[#EAF2EA]"}`}>
                  <TextStyle textContent={item.value.toString()}
                    textStyle={ `text-[16px] ${level == item.value ? "text-[#fff]" : "text-[#2E7D32] text-bold"}`}
                  />
                </div>
                <div className={ `flex-1 h-2 rounded-lg ${level === item.value ? "bg-[#2E7D32]" : "bg-[#EAF2EA]"}`} />
              </div>
              //
            })
          }
        </div>
        {/* stages ends */}
         {/* heading */}
        <div className='flex flex-col justify-center'>
        
        <TextStyle
          textContent='Choose how you want sign up as.'
          textStyle='text-[#000000] text-[24px] text-center font-["Nunito Sans"]'
        />
        <TextStyle
            textContent='Lorem ipsum dictum neque consequat sodales orci sagittis ac nunc semper lacus adipiscing duis scelerisque'
            textStyle='text-center text-[#757575]'
        />
      </div>
      {/* heading test */}
      </div>
     
   </div>
  )
}

export default Onboarding