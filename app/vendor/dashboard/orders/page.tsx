"use client";

import Image from "next/image";
import React, { useState } from "react";
import emptyDashboardImage from "../../../../public/dashboard-images/empty-dashboard-image.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


import Link from "next/link";
import exportIcon from "../../../../public/dashboard-images/export-icon.svg";
import calendarIcon from "../../../../public/dashboard-images/calendar-icon.svg";
import filterIcon from "../../../../public/dashboard-images/filter-icon.svg";
import OrdersTable from "../components/ordersPageComponent/OrdersTable";

const ordersPage = () => {

  // State to track the active tab, defaulting to 'All Time'
  const [activeTab, setActiveTab] = useState('All Time');

  // Function to define tab styles based on active state
  const getTabClass = (tabName: string) => {
    return activeTab === tabName
      ? "bg-[#EAF2EA] rounded-[6px] px-3 py-1.5 text-[#2E7D32] text-[14px] font-semibold leading-5"
      : "px-3 py-1.5 text-[14px] font-medium text-[#667085] hover:bg-[#EAF2EA] rounded-[6px]";
  };
  

  return (
    <>
      {/* Empty dashboard state */}
      {/* <div className='flex flex-col gap-4 items-center pt-20'>
        <Image src={emptyDashboardImage} alt='empty-state-image' className='w-[136.53px] h-[132.43px]' />
        <h1 className='font-medium text-[32px]'>No Orders yet</h1>
        <p className='w-[352px] text-center text-[16px] font-normal text-[#475467]'>You will have analytics when customers purchase your goods</p>
        <button className='text-[16px] font-medium bg-[#2E7D32] px-4 py-3 rounded-[27px] text-[#EAF2EA]'>+ Add Order</button>
    </div> */}

      <div className="py-[15px]">
        <div className="flex justify-between mb-6">
          <div className="hidden md:block">
            <h1 className="text-[#333843] text-2xl font-medium leading-8">
              Order
            </h1>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/vendor/dashboard"
                    className="text-[#2E7D32] font-medium text-[14px] leading-[20px]"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#667085] font-medium text-[14px] leading-[20px]">
                    Order List
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex gap-4 self-end">
            <button className="flex gap-1 w-[98px] h-10 rounded-[8px] px-3.5 py-2.5 bg-[#EAF2EA] text-[#2E7D32] text-[14px] font-semibold leading-[20px] ">
              <Image src={exportIcon} alt="export-icon" /> Export
            </button>
            <button className="w-[123px] h-10 rounded-[8px] px-3.5 py-2.5 bg-[#2E7D32] text-[#FFFFFF] text-[14px] font-semibold leading-[20px]">
              + Add Order
            </button>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="hidden md:flex justify-around h-[40px] bg-[#FFFFFF] rounded-[8px] border border-[#E0E2E7] p-1">
            <button className={getTabClass('All Time')} onClick={() => setActiveTab('All Time')}>
              All Time
            </button>
            <button className={getTabClass('12 Months')} onClick={() => setActiveTab('12 Months')}>
              12 Months
            </button>
            <button className={getTabClass('30 Days')} onClick={() => setActiveTab('30 Days')}>
              30 Days
            </button>
            <button className={getTabClass('7 Days')} onClick={() => setActiveTab('7 Days')}>
              7 Days
            </button>
            <button className={getTabClass('24 Hour')} onClick={() => setActiveTab('24 Hour')}>
              24 Hour
            </button>
          </div>

          <div className="flex gap-4">
            <button className="flex w-[142px] h-[40px] rounded-[8px] bg-[#FFFFFF] border border-[#E0E2E7] px-3.5 py-2.5 gap-2 text-[14px] text-[#667085] font-medium ">
              <Image src={calendarIcon} alt="calendar-icon" /> Select Dates
            </button>
            <button className="flex w-[98px] h-[40px] rounded-[8px] border px-3.5 py-2.5 gap-2 bg-[#FFFFFF] border-[#E0E2E7] text-[14px] text-[#667085] leading-5 font-medium">
              <Image src={filterIcon} alt="filter-icon" /> Filter
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[1116px] mx-auto  border border-[#E0E2E7] rounded-[8px]">
          {/* Orders table */}
          <div className="grow overflow-x-auto">
            <OrdersTable />
          </div>

          
        </div>
      </div>
    </>
  );
};

export default ordersPage;
