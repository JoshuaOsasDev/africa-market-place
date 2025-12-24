import Image from 'next/image'
import React from 'react'
import logo from '../../../public/dashboard-images/logo.svg'
import searchIcon from '../../../public/dashboard-images/search-icon.svg'
import notificationIcon from '../../../public/dashboard-images/notification-icon.svg'
import mailIcon from '../../../public/dashboard-images/mail-icon.svg'
import profilePicture from '../../../public/dashboard-images/profile-picture.svg'
import hamburgerMenu from '../../../public/dashboard-images/hamburger-menu.svg'
import notificationIconFilled from '../../../public/dashboard-images/notification-icon-filled.svg'
import mobileViewUserIcon from '../../../public/dashboard-images/mobile-view-user-icon.svg'
import Link from 'next/link'

const Navbar = () => {
  return (
    <>

    {/* Mobile view */}
    <div className='flex sm:hidden items-center justify-between px-6 h-[50px] bg-[#FAFAFF]'>
        <div className=''>
            <Image src={hamburgerMenu} alt='hamburger-menu' className='border rounded-[4px] px-1.5 py-1.5 border-[#DBDBDB] w-[30px] h-[30px]' />
        </div>

        <div className='flex gap-2.5'>
            <Image src={notificationIconFilled} alt='notification-icon-filled' />
            <Image src={mobileViewUserIcon} alt='user-icon' className='bg-[#EAF2EA] rounded-[32.22px] p-[4.83px] w-[29px] h-[29px]' />
        </div>
        

    </div>



    {/* Desktop view */}
    <div className='hidden sm:flex items-center justify-between h-20 pl-4.5 pr-10'>
        <Link href='/'><Image src={logo} alt='logo' className='' /></Link>
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
    </>
    
  )
}

export default Navbar