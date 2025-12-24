import Carousel from '@/components/common/carousel'
import HomeAccordion from './HomeAccordion'

function SlidderComp() {
  return (
      <div className='grid grid-cols-10  gap-4 my-6 px-2 '>
          <div className='  hidden lg:block  lg:col-span-2 border-[#EAEAEA] rounded-[10px] border-2 p-4 '>
              <HomeAccordion />
          </div>
          <div className=' col-span-10 lg:col-span-8 '>
              <Carousel />
          </div>
        
    </div>
  )
}

export default SlidderComp