import { salesData } from "@/lib/data";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import FilterButton from "@/components/common/filterButton";
import ProductTableReactTable from "../product/productTableReactTable.tsx";

export default function DashboardSalesAndProduct() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[23rem_1fr_1fr]">
      <div className="w-full rounded-xl border border-[#E0E2E7] bg-white p-6 md:h-[432px] md:w-[360px]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#333843]">
              Sales by Location
            </h3>
            <p className="text-sm text-[#667085]">
              Sales performance by location
            </p>
          </div>
          <button className="rounded-lg p-1 hover:bg-gray-100">
            <MoreVertical className="h-5 w-5 text-[#667085]" />
          </button>
        </div>

        <div className="space-y-4">
          {salesData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-2 md:grid-cols-[200px_90px]"
            >
              <div className="flex items-center space-x-2.5">
                <div className="relative h-10 w-10">
                  <Image
                    src={item.flag}
                    alt="country flag"
                    fill
                    className="rounded-[20px] object-fill object-center"
                  />
                </div>
                <div>
                  <h4 className="text-[14px] font-medium text-[#1A1C21]">
                    {item.country}
                  </h4>
                  <p className="text-sm text-[#667085]">{item.sales} Sales</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <h4 className="text-[14px] font-medium text-[#1A1C21]">
                  ${item.revenue.toLocaleString()}
                </h4>
                <p
                  className={`rounded-full px-1.5 py-0.5 text-sm font-semibold ${
                    item.change >= 0
                      ? "bg-[#E7F4EE] text-[#2E7D32]"
                      : "bg-[#FFEBEE] text-[#C62828]"
                  }`}
                >
                  {item.change >= 0 ? "+" : ""}
                  {item.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full rounded-xl border border-[#E0E2E7] bg-white md:h-[432px] lg:col-span-2">
        <div className="flex items-center justify-between px-6 py-4.5">
          <h4 className="text-xl font-medium text-[#333843]">
            Top Selling Product
          </h4>
          <FilterButton />
        </div>
        {/* <div className="">
          <ProductTableReactTable ITEMS_PER_PAGE={3} />
        </div> */}
      </div>
    </div>
  );
}
