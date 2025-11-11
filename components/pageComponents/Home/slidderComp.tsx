import Carousel from '@/components/common/carousel'
import React from 'react'
import CategorySection from './categorySection'

function SlidderComp() {
  return (
      <div className='grid grid-cols-10  gap-4 my-6 mx-3 '>
          <div className='  hidden lg:block  lg:col-span-2 border-[#EAEAEA] rounded-[10px] border-2 p-4 '>
              <CategorySection />
          </div>
          <div className=' col-span-10 lg:col-span-8 '>
              <Carousel />
          </div>
        
    </div>
  )
}

export default SlidderComp