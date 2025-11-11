import { sliderCardPropType } from "@/types/appTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SlideCard({ id, imgUrl, link, alt }: sliderCardPropType) {
  return (
    <Link href={link} key={id} className="w-full ">
      <div className="relative w-full h-[443px] rounded-[30px] overflow-hidden">
        <Image alt={alt} src={imgUrl} fill  />
      </div>
    </Link>
  );
}

export default SlideCard;
