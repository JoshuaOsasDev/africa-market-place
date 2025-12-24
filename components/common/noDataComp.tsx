"use client";
import Image, { StaticImageData } from "next/image";
import React from "react";

type NoDataCompProps = {
  image: StaticImageData;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string; // optional for wrapper styling
  imageClassName?: string; // optional for image styling
};

const NoDataComp: React.FC<NoDataCompProps> = ({
  image,
  title = "No Data",
  description = "There is no data to display.",
  buttonText,
  onButtonClick,
  className = "",
  imageClassName = "w-[136.53px] h-[132.43px]",
}) => {
  return (
    <div className={`flex flex-col items-center gap-4 pt-20 ${className}`}>
      <Image src={image} alt="empty-state-image" className={imageClassName} />
      <h1 className="text-center text-[32px] font-medium">{title}</h1>
      {description && (
        <p className="w-[352px] text-center text-[16px] font-normal text-[#475467]">
          {description}
        </p>
      )}
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="rounded-[27px] bg-[#2E7D32] px-4 py-3 text-[16px] font-medium text-[#EAF2EA]"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default NoDataComp;
