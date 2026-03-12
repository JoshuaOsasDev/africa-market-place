import Image from 'next/image'
import React from 'react'

function Newletter() {
  return (
      <div className='w-full h-[250px] my-10 relative
      
       md:h-[320px] lg:h-[443px] rounded-[30px
      '>
          <Image
              src={"/images/banner4.jpg"}
              alt='new letter'
              fill
          
          />
    </div>
  )
}

export default Newletter