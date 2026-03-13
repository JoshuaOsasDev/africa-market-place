import Link from "next/link";
import { BiSupport } from "react-icons/bi";
import UserNavLinks from "./userNavLinks";
import UserSettingComp from "@/components/pageComponents/user/dashboard/userSettingComp";
import clsx from "clsx";

const SideBar = () => {
  return (
    <div className="mt-3 flex h-full flex-col border-r border-[#F0F1F3] bg-[#FFFFFF] px-4.5 py-3">
      <div className="flex grow flex-row justify-between md:flex-col md:space-y-1 md:space-x-0">
        <UserNavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <div className="hidden md:block">
          <Link
            href={""}
            /* className="flex w-full grow items-center justify-center gap-2 p-3 text-[12px] font-semibold text-[#667085] hover:bg-[#EAF2EA] hover:text-[#2E7D32] md:flex-none md:justify-start md:p-2 md:px-3" */
            className={clsx(
              "hidden grow place-items-start justify-center gap-2 rounded-xl p-3 px-3 py-2 text-[14px] font-bold text-[#667085] hover:bg-[#EAF2EA] hover:text-[#2E7D32] md:flex md:flex-none md:justify-start md:p-2 md:px-3",
            )}
          >
            <BiSupport size={20} color="grey" />
            <div className="hidden md:block">Support</div>
          </Link>
          <UserSettingComp />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
