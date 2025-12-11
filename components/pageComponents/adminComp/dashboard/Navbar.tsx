"use client";

import React from "react";
import Image from "next/image";
import hamburgerMenu from "../../../../public/common/hamburger-menu.svg";
import notificationIconFilled from "../../../../public/common/notification-icon-filled.svg";
import mobileViewUserIcon from "../../../../public/common/mobile-view-user-icon.svg";
import mainLogo from "../../../../public/common/logo.svg"
import dropdownIcon from "../../../../public/common/drop-down-icon.svg"
import notificationFilledIcon from "../../../../public/common/notification-icon-filled.svg"
import profilePictureIcon from "../../../../public/common/profile-picture.svg"
import Link from "next/link";
import { usePathname } from "next/navigation";


const Navbar = () => {

    const pathname = usePathname();

    const getPageTitle = (path: string) => {
        if(path === '/admin/dashboard'){
            return 'Overview'
        }
        if(path === '/admin/dashboard/users'){
            return 'Users'
        }
        if(path === '/admin/dashboard/sellers'){
            return 'Sellers'
        }
        if(path === '/admin/dashboard/productReview'){
            return 'Product Review'
        }
        if(path === '/admin/dashboard/shipping'){
            return 'Shipping'
        }
        if(path === '/admin/dashboard/roles'){
            return 'Roles'
        }
        if(path === '/admin/dashboard/payout'){
            return 'Payout'
        }
        if(path === '/admin/dashboard/pageSetups'){
            return 'Page Setups'
        }
        if(path === '/admin/dashboard/reports'){
            return 'Reports'
        }
        if(path === '/admin/dashboard/settings'){
            return 'Settings'
        }
    }

    const headerText = getPageTitle(pathname);

  return (
    <div className="h-[60px] ">
      {/* Mobile view */}
      <div className="flex sm:hidden items-center justify-between px-6 h-[50px] bg-[#FAFAFF]">
        <div className="">
          <Image
            src={hamburgerMenu}
            alt="hamburger-menu"
            className="border rounded-[4px] px-1.5 py-1.5 border-[#DBDBDB] w-[30px] h-[30px]"
          />
        </div>

        <div className="flex gap-2.5">
          <Image src={notificationIconFilled} alt="notification-icon-filled" />
          <Image
            src={mobileViewUserIcon}
            alt="user-icon"
            className="bg-[#EAF2EA] rounded-[32.22px] p-[4.83px] w-[29px] h-[29px]"
          />
        </div>
      </div>

      {/* Desktop view */}
      <div className="flex items-center h-full">
        <div className="hidden sm:flex items-center justify-between w-[296px]">
            <Link href='/' className="px-[30px] ">
            <Image src={mainLogo} alt="main-logo" className="" />
            </Link>
        </div>

      <div className="hidden sm:flex items-center px-[21px]">
        <h1 className="text-[#45464E] text-[20px] font-medium">{headerText}</h1>

        <div className="absolute right-[21px] flex gap-5">
            <button className="flex items-center bg-[#FAFAFA] rounded-[8px] px-3 gap-2.5">
                <span className="text-[14px] text-[#1C1D22] font-normal">Admin</span>
                <Image src={dropdownIcon} alt="drop-down-icon" />
            </button>

            <Image src={notificationFilledIcon} alt="notification-icon" />
            <Image src={profilePictureIcon} alt="profile-picture" />
            
        </div>
      </div>
      </div>

    </div>
  );
};

export default Navbar;
