import { inter } from "../../font";
import NavBar from "../../../components/pageComponents/adminComp/dashboard/Navbar";
import SideBar from "../../../components/pageComponents/adminComp/dashboard/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex h-screen flex-col overflow-hidden bg-[#FAFAFF]`}>
      
      <div className=" bg-[#FFFFFF]">
        <NavBar />
      </div>

      <div className="flex w-full grow h-0">
        
        <div className="hidden h-full flex-none md:block md:w-[296px] bg-[#FFFFFF]">
          <SideBar />
        </div>
  
        <div className="flex-1 md:overflow-y-auto sm:px-5 sm:py-10 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}