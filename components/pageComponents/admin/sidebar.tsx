import React from "react";

import Navlinks from "./navlinks";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col bg-[#FFFFFF] px-4.5 py-3">
      <div className="flex grow flex-row justify-between md:flex-col md:space-y-1 md:space-x-0">
        <Navlinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form className="hidden md:block">
          <button className="mx-auto flex w-[233px] grow items-center justify-center gap-2 rounded-[12px] px-5 py-4 text-[12px] font-semibold text-[#667085] hover:bg-[#f9ecec] md:flex-none md:justify-start">
            {/* <Image src={LogOut} width={24} alt="logout-icon" /> */}
            <LogOut />
            <div className="hidden text-[#CC5F5F] md:block">Logout</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
