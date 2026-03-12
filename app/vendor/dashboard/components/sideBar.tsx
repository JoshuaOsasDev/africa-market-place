import React from "react";

import Image from "next/image";

import NavLinks from "./navLinks";

import supportPageIcon from "../../../../public/vendor/dashboard-images/support-page-icon.svg";
import settingPageIcon from "../../../../public/vendor/dashboard-images/setting-page-icon.svg";

const SideBar = () => {
  return (
    <div className="flex h-full flex-col bg-[#FFFFFF] px-4.5 py-3">
      <div className="flex grow flex-row justify-between md:flex-col md:space-y-1 md:space-x-0">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form className="hidden md:block">
          <button className="flex w-full grow items-center justify-center gap-2 p-3 text-[12px] font-semibold text-[#667085] hover:bg-[#EAF2EA] hover:text-[#2E7D32] md:flex-none md:justify-start md:p-2 md:px-3">
            <Image src={supportPageIcon} width={24} alt="help-icon" />
            <div className="hidden md:block">Support</div>
          </button>

          <button className="flex w-full grow items-center justify-center gap-2 p-3 text-[12px] font-semibold text-[#667085] hover:bg-[#EAF2EA] hover:text-[#2E7D32] md:flex-none md:justify-start md:p-2 md:px-3">
            <Image src={settingPageIcon} width={24} alt="settings-icon" />
            <div className="hidden md:block">Setting</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SideBar;
