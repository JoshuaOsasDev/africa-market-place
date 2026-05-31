import Image from "next/image";
import React from "react";

function Newletter() {
  return (
    <div className="rounded-[30px relative my-10 h-[250px] w-full md:h-[320px] lg:h-[443px]">
      <Image
        src={"/images/banner4.jpg"}
        alt="new letter"
        fill
        // /images/home_banner.png
      />
    </div>
  );
}

export default Newletter;
