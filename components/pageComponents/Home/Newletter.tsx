import Image from 'next/image'
import React from 'react'

function Newletter() {
  return (
      <div className='w-full h-[526px] my-10 relative'>
          <Image
              src={"/images/banner4.jpg"}
              alt='new letter'
              fill
          
          />
    </div>
  )
}

export default Newletter