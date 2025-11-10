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
      <div className="flex flex-col justify-center items-center flex-1 w-5/6 md:w-2/3 lg:w-1/3 mx-auto  space-y-2 bg-white my-4 rounded-lg p-8">
              <div className="rounded-md   p-2 lg:p-4 ">
                  <AuthProgressbar
                  level={2}
                  />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default layout;
