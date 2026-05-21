import Image from "next/image";
//import logo from "https://res.cloudinary.com/dtxai4k4r/image/upload/v1773526193/africa_market_place_desktop_banner_ww9s3x.png"
import searchIcon from "../../../../public/vendor/dashboard-images/search-icon.svg";
import notificationIcon from "../../../../public/vendor/dashboard-images/notification-icon.svg";
import mailIcon from "../../../../public/vendor/dashboard-images/mail-icon.svg";
import profilePicture from "../../../../public/vendor/dashboard-images/profile-picture.svg";
import hamburgerMenu from "../../../../public/vendor/dashboard-images/hamburger-menu.svg";
import notificationIconFilled from "../../../../public/vendor/dashboard-images/notification-icon-filled.svg";
import mobileViewUserIcon from "../../../../public/vendor/dashboard-images/mobile-view-user-icon.svg";
import Link from "next/link";

const logo =
  "https://res.cloudinary.com/dtxai4k4r/image/upload/v1773526193/africa_market_place_desktop_banner_ww9s3x.png";
const Navbar = () => {
  return (
    <>
      {/* Mobile view */}
      <div className="flex h-[50px] items-center justify-between bg-[#FAFAFF] px-6 sm:hidden">
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
      </div>

      {/* Desktop view */}
      <div className="hidden h-20 items-center justify-between pr-10 pl-4.5 sm:flex">
        <Link href="/">
          <Image src={logo} alt="logo" className="" />
        </Link>
        <div className="flex gap-2.5 rounded-[26px] bg-[#F6F6F6] px-4 py-3.5 sm:h-[45px] sm:w-[350px] lg:h-[52px] lg:w-[435px]">
          <Image src={searchIcon} width={24} alt="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="w-full placeholder-[#BABABA] outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Image
            src={notificationIcon}
            alt="notification-icon"
            className="rounded-[20px] bg-[#F6F6F6] p-2 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
          />
          <Image
            src={mailIcon}
            alt="mail-icon"
            className="rounded-[20px] bg-[#F6F6F6] p-2 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
          />

          <div className="flex items-center gap-3">
            <Image
              src={profilePicture}
              alt="user-profile-picture"
              className="h-10 w-10"
            />
            <div className="flex flex-col">
              <span className="font-medium text-[#000000] sm:text-[12px] lg:text-[16px]">
                Johnmarvel
              </span>
              <span className="text-[#979797] sm:text-[10px] lg:text-[14px]">
                Vendor
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
