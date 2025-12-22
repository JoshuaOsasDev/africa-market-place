"use client";

import React from "react";
import Image from "next/image";
// import hamburgerMenu from "../../../../public/common/hamburger-menu.svg";
// import notificationIconFilled from "../../../../public/common/notification-icon-filled.svg";
// import mobileViewUserIcon from "../../../../public/common/mobile-view-user-icon.svg";
// import mainLogo from "../../../../public/common/logo.svg";
// import dropdownIcon from "../../../../public/common/drop-down-icon.svg";
// import notificationFilledIcon from "../../../../public/common/notification-icon-filled.svg";
// import profilePictureIcon from "../../../../public/common/profile-picture.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path === "/admin/dashboard") {
      return "Overview";
    }
    if (path === "/admin/dashboard/users") {
      return "Users";
    }
    if (path === "/admin/dashboard/sellers") {
      return "Sellers";
    }
    if (path === "/admin/dashboard/productReview") {
      return "Product Review";
    }
    if (path === "/admin/dashboard/shipping") {
      return "Shipping";
    }
    if (path === "/admin/dashboard/roles") {
      return "Roles";
    }
    if (path === "/admin/dashboard/payout") {
      return "Payout";
    }
    if (path === "/admin/dashboard/pageSetups") {
      return "Page Setups";
    }
    if (path === "/admin/dashboard/reports") {
      return "Reports";
    }
    if (path === "/admin/dashboard/settings") {
      return "Settings";
    }
  };

  const headerText = getPageTitle(pathname);

  return (
    <div className="fixed z-100 h-[60px] w-full bg-white">
      {/* Mobile view */}
      {/* <div className="flex h-[50px] items-center justify-between bg-[#FAFAFF] px-6 md:hidden">
        <div className="">
          <Image
            src={hamburgerMenu}
            alt="hamburger-menu"
            className="h-[30px] w-[30px] rounded-[4px] border border-[#DBDBDB] px-1.5 py-1.5"
          />
        </div>

        <div className="flex gap-2.5">
          <Image src={notificationIconFilled} alt="notification-icon-filled" />
          <Image
            src={mobileViewUserIcon}
            alt="user-icon"
            className="h-[29px] w-[29px] rounded-[32.22px] bg-[#EAF2EA] p-[4.83px]"
          />
        </div>
      </div> */}

      {/* Desktop view */}
      <div className="flex h-full items-center">
        {/* LOGO */}
        <div className="hidden w-[296px] items-center justify-between md:flex">
          <Link href="/" className="px-[30px] py-3">
            <h1
              className={`text-2xl text-[#2E7D32]`}
              style={{ fontFamily: "var(--font-changa)" }}
            >
              African Kitchen{" "}
            </h1>
          </Link>
        </div>

        <div className="hidden items-center px-[21px] md:flex">
          <h1 className="text-[20px] font-medium text-[#45464E]">
            Dashboard/{headerText}
          </h1>

          <div className="absolute right-[21px] flex items-center gap-5">
            <button className="flex items-center justify-center gap-2.5 rounded-xl bg-[#FAFAFA] px-3 py-1.5">
              <span className="text-[14px] font-normal text-[#1C1D22]">
                Admin
              </span>
              <span>
                {" "}
                <ChevronDown />
              </span>
            </button>
            <Bell fill="#2E7D32" className="text-[#2E7D32]" />

            <div className="relative h-8 w-8">
              <Image
                fill
                src={"/admin-dashboard-image/admin-profile-image.jpg"}
                alt="profile-picture"
                className="object-fit rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
