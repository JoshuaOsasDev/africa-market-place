import { ChevronDown, TruckElectricIcon } from "lucide-react";

export default function ShippingFilter() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Search Input */}
      <div className="hidden min-w-50 flex-1 md:block">
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
      <div className="relative hidden w-50 md:block">
        <select className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none">
          <option>Status</option>
          <option>Delivered</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#949494]" />
      </div>

      {/* Joined Date Dropdown */}
      <div className="relative hidden w-50 md:block">
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
  );
}
