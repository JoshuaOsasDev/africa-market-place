import Image from 'next/image'
import React from 'react'
import searchIcon from '../../../public/dashboard-images/search-icon.svg'
import notificationIcon from '../../../public/dashboard-images/notification-icon.svg'
import mailIcon from '../../../public/dashboard-images/mail-icon.svg'
import profilePicture from '../../../public/dashboard-images/profile-picture.svg'

const Navbar = () => {
  return (
    <div className='flex items-center justify-around h-full'>
        <div className='flex gap-2.5 bg-[#F6F6F6] w-[435px] h-[52px] rounded-[26px] px-4 py-3.5'>
            <Image src={searchIcon} width={24} alt='search-icon' />
            <input type='text' placeholder='Search' className='w-full outline-none placeholder-[#BABABA]' />
        </div>

        <div className='flex gap-2'>
            <Image src={notificationIcon} alt='notification-icon' className='bg-[#F6F6F6] rounded-[20px] w-10 h-10 p-2' />
            <Image src={mailIcon} alt='mail-icon' className='bg-[#F6F6F6] rounded-[20px] w-10 h-10 p-2' />

            <div className='flex items-center gap-3'>
                <Image src={profilePicture} alt='user-profile-picture' className='w-10 h-10' />
                <div className='flex flex-col'>
                    <span className='text-[#000000] font-medium text-[16px]'>Johnmarvel</span>
                    <span>Vendor</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar