import React from 'react'
import Image from 'next/image';
import NavLinks from './Navlinks';
import logoutPageIcon from "../../../../public/admin/dashboard_images_and_icons/logout-page-icon.svg";

const Sidebar = () => {
  return (
    <div className='flex flex-col h-full bg-[#FFFFFF] py-3 px-4.5'>
        

        <div className="flex grow flex-row justify-between md:flex-col md:space-x-0 md:space-y-1">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form className='hidden md:block'>
          <button className="flex grow items-center justify-center gap-2  w-[233px] mx-auto px-5 py-4 rounded-[12px] text-[12px] font-semibold hover:bg-[#f9ecec] text-[#667085] md:flex-none md:justify-start">
            <Image src={logoutPageIcon} width={24} alt='logout-icon' />
            <div className="hidden md:block text-[#CC5F5F]">Logout</div>
          </button>

          
        </form>
      </div>
    </div>
  )
}

export default Sidebar