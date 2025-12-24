import { inter } from "@/app/layout";
import Navbar from "@/components/pageComponents/admin/navbar";
import Sidebar from "@/components/pageComponents/admin/sidebar";
import { Changa_One } from "next/font/google";

export const changa = Changa_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-changa",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.className} ${changa.variable} flex h-screen flex-col bg-[#FAFAFF]`}
    >
      <div className="bg-[#FFFFFF]">
        <Navbar />
      </div>

      <div className="w-full grow md:grid md:grid-cols-[280px_1fr]">
        <div className="mt-8 hidden h-full flex-none bg-[#FFFFFF] md:block md:w-[296px]">
          <Sidebar />
        </div>

        <div className="mt-8 h-full flex-1 px-4 py-4 md:px-[30px]">
          {children}
        </div>
      </div>
    </div>
  );
}
