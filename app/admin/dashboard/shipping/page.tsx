import ShippingTable from "@/components/pageComponents/admin/shippingTables";
import {
  ChevronDown,
  Truck,
  TruckElectric,
  TruckElectricIcon,
} from "lucide-react";

export default function ShippingPage() {
  return (
    <div>
      <div className="mt-5 grid grid-cols-2 gap-8 md:grid-cols-3">
        {/* TOTAL SHIPMENT */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5 md:h-[130px] md:w-[315px]">
          <div className="w-fit rounded-xl bg-[#EAF2EA] px-2 py-2">
            <Truck className="text-[#2E7D32]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">Total Shipments</h3>
            <p className="text-xl font-medium">100</p>
          </div>
        </div>
        {/* SHIPPING TODAY */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5 md:h-[130px] md:w-[315px]">
          <div className="w-fit rounded-xl bg-[#8A38F51A] px-2 py-2">
            <Truck className="text-[#8A38F5]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">Shipment Today</h3>
            <p className="text-xl font-medium">90</p>
          </div>
        </div>
        {/* PENDING TODAY */}
        <div className="flex flex-col justify-between  rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5 md:h-[130px] md:w-[315px]">
          <div className="w-fit rounded-xl bg-[#FFF9EA] px-2 py-2">
            <TruckElectric className="text-[#FFAE00]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">Pending Shipment</h3>
            <p className="text-xl font-medium">5</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2.5 rounded-[10px] bg-[#FFFFFF] p-4">
        {/* SHIPPING FILTER */}
        <div className="">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search Input */}
            <div className="min-w-[200px] flex-1">
              <div className="relative">
                <svg
                  className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400"
                  fill="none"
                  stroke="#949494"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search user..."
                  className="w-full rounded-xl border border-[#DEDEDE] py-3 pr-20 pl-10 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none"
                />
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="relative w-[200px]">
              <select className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none">
                <option>Status</option>
                <option>Delivered</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#949494]" />
            </div>

            {/* Joined Date Dropdown */}
            <div className="relative w-[200px]">
              <select className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none">
                <option>Joined Date</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>

            {/* Create Shipment Button */}
            <button className="bg-green-[#2E7D32] flex items-center gap-2 rounded-lg bg-[#2E7D32] p-3 text-[16px] font-medium whitespace-nowrap text-white hover:bg-green-700">
              <span>
                <TruckElectricIcon />
              </span>{" "}
              Create Shipment
            </button>
          </div>
        </div>

        {/* SHIPPING TABLE */}
        <ShippingTable shipping={"shipping"} />
      </div>
    </div>
  );
}
