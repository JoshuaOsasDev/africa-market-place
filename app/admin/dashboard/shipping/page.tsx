import FilterButton from "@/components/common/filterButton";
import ShippingFilter from "@/components/pageComponents/admin/shippingFilter";
import ShippingTable from "@/components/pageComponents/admin/shippingTables";
import { Button } from "@/components/ui/button";
import { Share, Truck, TruckElectric } from "lucide-react";

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
        <div className="flex flex-col justify-between rounded-[12px] bg-[#FFFFFF] px-3.5 py-2.5 md:h-[130px] md:w-[315px]">
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
          <ShippingFilter />
        </div>

        <div className="flex justify-between md:hidden">
          <FilterButton />
          <Button className="border border-[#E9E9E9] bg-white p-4 py-6 text-[14px] text-[#2E7D32]">
            <Share />
            <span>Export Data</span>
          </Button>
        </div>

        {/* SHIPPING TABLE */}
        <ShippingTable shipping={"shipping"} />
      </div>
    </div>
  );
}
