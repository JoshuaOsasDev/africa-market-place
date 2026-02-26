"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// const orderTabs = [
//   { label: "All Orders", value: "all", count: null, active: true },
//   { label: "Ongoing Orders", value: "pending", count: 10, active: false },
//   { label: "Progress", value: "on-the-way", count: 0, active: false },
//   { label: "Shipped Orders", value: "delivered", count: 5, active: false },
//   { label: "Cancelled Orders", value: "canceled", count: 6, active: false },
//   { label: "Returned", value: "returned", count: 5, active: false },
// ];

export default function OrderTabs({
  tabCounts,
}: {
  tabCounts: Record<string, number>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeValue = searchParams.get("order") || "all";

  const orderTabs = [
    { label: "All Orders", value: "all", count: tabCounts.all },

    { label: "Ongoing Orders", value: "pending", count: tabCounts.pending },

    { label: "Progress", value: "on-the-way", count: tabCounts["on-the-way"] },

    { label: "Shipped Orders", value: "delivered", count: tabCounts.delivered },

    { label: "Cancelled Orders", value: "canceled", count: tabCounts.canceled },

    { label: "Returned", value: "returned", count: tabCounts.returned },
  ];

  const activeTabIndex = orderTabs.findIndex(
    (tab) => tab.value === activeValue,
  );

  const activeTab = activeTabIndex === -1 ? 0 : activeTabIndex;

  const handleOrderFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("order", value);
    } else {
      params.delete("order");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-[30px] w-full">
      {/* 
          MOBILE DROPDOWN
    */}
      <div className="mb-4 md:hidden">
        <select
          className="w-[210px] rounded-xl border border-[#EEEEEE] px-4 py-3 text-[16px]"
          value={orderTabs[activeTab].value}
          onChange={(e) => {
            // const index = orderTabs.findIndex(
            //   (tab) => tab.value === e.target.value,
            // );
            // setActiveTab(index);
            handleOrderFilter(e.target.value);
          }}
        >
          {orderTabs.map((tab) => (
            <option key={tab.value} value={tab.value}>
              {tab.label}
              {tab.count !== null ? ` (${tab.count})` : ""}
            </option>
          ))}
        </select>
      </div>

      {/* 
          DESKTOP TABS
      */}
      <div className="hidden w-full items-center justify-around rounded-[35px] border-b-2 border-gray-200 bg-white px-4 py-2 md:flex">
        {orderTabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => {
              //   setActiveTab(index);
              handleOrderFilter(tab.value);
            }}
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-[18px] font-medium transition-all duration-300 ${
              activeTab === index
                ? "rounded-full bg-black px-3 py-2 text-white"
                : "text-[#6F6F6F] hover:rounded-full hover:bg-black hover:px-3 hover:py-2 hover:text-white"
            }`}
          >
            <span>{tab.label}</span>

            {tab.count > 0 && (
              <span
                className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                  activeTab === index
                    ? "bg-white text-black"
                    : "bg-[#EAF2EA] text-[#2E7D32]"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
