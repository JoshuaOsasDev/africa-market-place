import { inter } from "../font";
import NavBar from "./components/Navbar";
import SideBar from "./components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.className} flex h-screen flex-col overflow-hidden bg-[#FAFAFF]`}>
      
      <div className=" bg-[#FFFFFF]">
        <NavBar />
      </div>

      <div className="flex w-full grow h-0">
        
        <div className="hidden h-full flex-none md:block md:w-[264px] bg-[#FFFFFF]">
          <SideBar />
        </div>
  
        <div className="grow md:overflow-y-auto px-4 md:px-[30px] py-4 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}