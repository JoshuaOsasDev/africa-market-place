import { MapPin, UserRound } from "lucide-react";

export default function ShippingDetailsPage() {
  return (
    <div className="w-full">
      <div className="items-center justify-items-start space-x-2 md:flex">
        <p className="text-[16px] text-[#45464E]">
          <span className="font-medium">Order Number: </span>
          <span className="font-normal">#743648</span>
        </p>
        <p className="text-[16px] text-[#45464E]">
          <span className="font-medium">Order Date : </span>
          <span>12 Sept 2022 - 12:55 pm</span>
        </p>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* CUSTOMER CARD */}
        <div className="flex h-full w-full flex-col justify-between space-y-0 rounded-xl bg-white p-4 shadow-sm md:space-y-3.5">
          {/* Header */}
          <div className="flex flex-col items-start justify-between space-y-2.5 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2EA]">
                <UserRound className="h-5 w-5 text-[#2E7D32]" />
              </div>

              <div className="text-sm">
                <p className="font-medium text-[#1F2937]">Janet Adebayo</p>
                <p className="text-xs text-[#6B7280]">
                  Customer since{" "}
                  <span className="font-semibold">12 Sept 2022</span>
                </p>
              </div>
            </div>

            <span className="rounded-full bg-[#FFF9EA] px-3 py-1 text-xs font-medium text-[#FBC02D]">
              Pending
            </span>
          </div>

          {/* Footer */}
          <div className="mt-4 flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center">
            <p className="flex flex-col space-x-2 text-[#8B8D97]">
              <span className="text-xs">Phone</span>
              <span className="text-sm font-medium text-black">
                +2349021233422
              </span>
            </p>
            <p className="flex flex-col items-start space-x-2 text-[#8B8D97]">
              <span className="text-xs">Email</span>
              <span className="text-sm font-medium text-black">
                chrisnnaji443@gmail.com
              </span>
            </p>
          </div>
        </div>

        {/* SHIPMENT CARD */}
        <div className="flex h-full w-full flex-col justify-between space-y-3.5 rounded-xl bg-white p-4 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2EA]">
                <MapPin className="h-5 w-5 text-[#2E7D32]" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <p className="flex flex-col space-x-2 text-[#8B8D97]">
              <span className="text-xs">Home Address</span>
              <span className="text-sm font-medium text-[#45464E]">
                No. 15 Adekunle Street, Yaba, Lagos State
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
