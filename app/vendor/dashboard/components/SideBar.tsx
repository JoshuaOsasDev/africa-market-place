import React from 'react'

import Image from 'next/image';
import Link from 'next/link';
import NavLinks from './NavLinks';

import supportPageIcon from '../../../public/dashboard-images/support-page-icon.svg'
import settingPageIcon from '../../../public/dashboard-images/setting-page-icon.svg'

const SideBar = () => {
  return (
    <div className='flex flex-col h-full bg-[#FFFFFF] py-3 px-4.5'>
        

        <div className="flex grow flex-row justify-between md:flex-col md:space-x-0 md:space-y-1">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form className='hidden md:block'>
          <button className="flex w-full grow items-center justify-center gap-2 p-3 text-[12px] font-semibold hover:bg-[#EAF2EA] text-[#667085] hover:text-[#2E7D32] md:flex-none md:justify-start md:p-2 md:px-3">
            <Image src={supportPageIcon} width={24} alt='help-icon' />
            <div className="hidden md:block">Support</div>
          </button>

          <button className="flex w-full grow items-center justify-center gap-2 p-3 text-[12px] font-semibold hover:bg-[#EAF2EA] text-[#667085] hover:text-[#2E7D32] md:flex-none md:justify-start md:p-2 md:px-3">
            <Image src={settingPageIcon} width={24} alt='settings-icon' />
            <div className="hidden md:block">Setting</div>
          </button>
        </form>
      </div>
    </div>
  )
}

export default SideBar