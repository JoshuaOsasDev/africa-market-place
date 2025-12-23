import DashboardNavbar from "@/components/common/dashboardNavbar";
import SideBar from "@/components/common/sideBar";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-fit md:h-screen flex-col md:flex-row md:overflow-hidden bg-[#FAFAFF]">
//       <div className="w-full flex-none md:w-[264px]">
//         <SideBar />
//       </div>
//       <div className="flex flex-col w-full">
//         <div className="h-20 bg-[#FFFFFF]">
//           <DashboardNavbar />
//         </div>

//         <div className="grow  md:overflow-y-auto ">{children}</div>
//       </div>
//     </div>
//   );
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-0 md:grid-cols-[16rem_1fr] md:grid-rows-[auto_1fr]">
      <div className="md:col-span-full md:h-20">
        {" "}
        <DashboardNavbar />
      </div>

      <aside className="bg-white">
        <SideBar />
      </aside>

      <main className="bg-white px-4 pb-1 md:bg-[#F0F1F3] md:pt-5">
        {children}
      </main>
    </div>
  );
}

