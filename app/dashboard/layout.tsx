

import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-fit md:h-screen flex-col md:flex-row md:overflow-hidden bg-[#FAFAFF]">
      <div className="w-full flex-none md:w-[264px]">
        <SideBar />
      </div>
      <div className="flex flex-col w-full">
        <div className="h-20 bg-[#FFFFFF]">
        <Navbar />
      </div>
      
      <div className="grow  md:overflow-y-auto ">{children}</div>
      </div>
      
    </div>
  );
}