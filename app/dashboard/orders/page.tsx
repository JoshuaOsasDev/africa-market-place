import Image from "next/image";
import React from "react";
import emptyDashboardImage from "../../../public/dashboard-images/empty-dashboard-image.svg";

const OrdersPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center pt-20">
      <Image
        src={emptyDashboardImage}
        alt="empty-state-image"
        className="w-[136.53px] h-[132.43px]"
      />
      <h1 className="font-medium text-[32px]">No Orders yet</h1>
      <p className="w-[352px] text-center text-[16px] font-normal text-[#475467]">
        You will have analytics when customers purchase your goods
      </p>
      <button className="text-[16px] font-medium bg-[#2E7D32] px-4 py-3 rounded-[27px] text-[#EAF2EA]">
        + Add Order
      </button>
    </div>
  );
};

export default OrdersPage;
