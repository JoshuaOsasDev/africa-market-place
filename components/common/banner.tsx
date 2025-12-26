import Image from 'next/image'
import React from 'react'

function Banner() {
  return (
      <div className='relative w-full h-18'>
          <Image
              fill
              src={"/images/banner.jpg"}
              alt='banner'
              className='absolute'
          />
    </div>
  )
}

export default Banner