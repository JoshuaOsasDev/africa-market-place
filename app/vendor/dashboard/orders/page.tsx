import Image from "next/image";
import React from "react";
import emptyDashboardImage from "../../../public/dashboard-images/empty-dashboard-image.svg";

const OrdersPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-20">
      {/* <Image
        src={emptyDashboardImage}
        alt="empty-state-image"
        className="w-[136.53px] h-[132.43px]"
      /> */}
      <h1 className="text-[32px] font-medium">No Orders yet</h1>
      <p className="w-[352px] text-center text-[16px] font-normal text-[#475467]">
        You will have analytics when customers purchase your goods
      </p>
      <button className="rounded-[27px] bg-[#2E7D32] px-4 py-3 text-[16px] font-medium text-[#EAF2EA]">
        + Add Order
      </button>
    </div>
  );
};

export default OrdersPage;
