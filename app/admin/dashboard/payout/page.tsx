import PayoutDetailsPage from "@/components/pageComponents/admin/payout/payoutDetailsPage";
import {
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
  ChevronDown,
} from "lucide-react";

export default function PayoutPage() {
  return (
    <div className="w-full">
      <div className="mt-5 mb-4 grid grid-cols-2 gap-8 md:grid-cols-3">
        {/* TOTAL SHIPMENT */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5 md:h-[130px] md:w-[315px]">
          <div className="w-fit rounded-xl bg-[#EAF2EA] px-2 py-2">
            <Banknote className="text-[#2E7D32]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">Total Payout</h3>
            <p className="text-xl font-medium">100</p>
          </div>
        </div>
        {/* SHIPPING TODAY */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5 md:h-[130px] md:w-[315px]">
          <div className="w-fit rounded-xl bg-[#8A38F51A] px-2 py-2">
            <BanknoteArrowUp className="text-[#8A38F5]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">Number of Payout</h3>
            <p className="text-xl font-medium">90</p>
          </div>
        </div>
        {/* PENDING TODAY */}
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5 md:h-[130px] md:w-[315px]">
          <div className="w-fit rounded-xl bg-[#FFF9EA] px-2 py-2">
            <BanknoteArrowDown className="text-[#FFAE00]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#8B8D97]">Pending Payout</h3>
            <p className="text-xl font-medium">5</p>
          </div>
        </div>
      </div>

      <div className="rounded-[10px] bg-white p-4">
        <div className="flex items-center justify-between py-1.5">
          <h3 className="text-xl text-black">Payout</h3>
          <div className="relative hidden w-40 md:block">
            <select className="w-full cursor-pointer appearance-none rounded-xl border border-[#DEDEDE] bg-white p-3 text-[16px] text-[#949494] focus:border-[#2E7D32] focus:outline-none">
              <option>Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Declined</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-[#949494]" />
          </div>
        </div>
        <PayoutDetailsPage />
      </div>
      {/* PAYOUTDETAILS PAGE */}
    </div>
  );
}
