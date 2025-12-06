import Banner from "@/components/common/banner";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#EAEAEA] px-2">
      <Header />
      <Banner />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
