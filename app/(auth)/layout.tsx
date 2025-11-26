"use client";
import { useState } from "react";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Banner from "@/components/common/banner";
import AuthProgressbar from "@/components/common/authProgressbar";

function layout({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState(2);

  return (
    <div className=" min-h-screen  bg-[#EAEAEA] px-2 flex flex-col">
      <Header />
      <Banner />
      <div className="flex flex-col justify-center items-center flex-1  mx-auto  space-y-2 bg-white my-4 rounded-lg 
      w-9/10 sm:w-7/10 md:w-5/10 lg:w-4/10 
      ">
        <div className="rounded-md">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default layout;
