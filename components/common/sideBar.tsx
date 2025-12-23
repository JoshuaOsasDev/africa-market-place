import Image from "next/image";
import Link from "next/link";

import supportPageIcon from "../../public/dashboard-images/support-page-icon.svg";
import settingPageIcon from "../../public/dashboard-images/setting-page-icon.svg";
import logo from "../../public/images/logo.png";
import NavLinks from "./NavLinks";

const SideBar = () => {
  return (
    <div className="mt-3 flex h-full flex-col border-r border-[#F0F1F3] bg-[#FFFFFF] px-4.5 py-3">
      {/* <div className="relative w-[100px] h-[50px]">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="africa market place logo"
            fill
            className="object-contain object-center"
          />
        </Link>
      </div> */}

      <div className="flex grow flex-row justify-between md:flex-col md:space-y-1 md:space-x-0">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <div className="hidden md:block">
          <Link
            href={""}
            className="flex w-full grow items-center justify-center gap-2 p-3 text-[12px] font-semibold text-[#667085] hover:bg-[#EAF2EA] hover:text-[#2E7D32] md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <Image src={supportPageIcon} width={24} alt="help-icon" />
            <div className="hidden md:block">Support</div>
          </Link>

          <Link
            href={""}
            className="flex w-full grow items-center justify-center gap-2 p-3 text-[12px] font-semibold text-[#667085] hover:bg-[#EAF2EA] hover:text-[#2E7D32] md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <Image src={settingPageIcon} width={24} alt="settings-icon" />
            <div className="hidden md:block">Setting</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
