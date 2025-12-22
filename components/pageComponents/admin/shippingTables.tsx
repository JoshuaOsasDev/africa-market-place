"use client";
import ReusableTable from "@/components/common/reusableTable";
import { shippingData } from "@/lib/data";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function ShippingTable({
  shipping,
}: {
  shipping: string | string[] | undefined;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-[#D4EDDA] text-[#155724]";
      case "Cancelled":
        return "bg-[#F8D7DA] text-[#721C24]";
      case "In Transit":
        return "bg-[#FFF3CD] text-[#856404]";
      case "Pending":
        return "bg-[#E7E8EB] text-[#383D44]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Table columns configuration

  return (
    <div className="">
      <ReusableTable
        order={shipping}
        data={shippingData}
        columns={[
          {
            label: "Tracking No.",
            renderCell: (item) => (
              <span className="font-medium text-[#333843]">
                {item.trackingNo}
              </span>
            ),
          },
          {
            label: "Customer",
            renderCell: (item) => (
              <span className="text-[#667085]">{item.customer}</span>
            ),
          },
          {
            label: "Destination",
            renderCell: (item) => (
              <span className="text-[#667085]">{item.destination}</span>
            ),
          },
          {
            label: "Delivery Date",
            renderCell: (item) => (
              <span className="text-[#667085]">{item.deliveryDate}</span>
            ),
          },
          {
            label: "Status",
            renderCell: (item) => (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusStyles(
                  item.status,
                )}`}
              >
                {item.status}
              </span>
            ),
          },
          {
            label: "Action",
            renderCell: (item) => (
              <button className="text-gray-400 transition-colors hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            ),
          },
        ]}
        columnsStyle="80px 155.14px 150px 120px 170px 170px 120px"
        itemsPerPage={10}
        onSelectChange={(selectedIds) =>
          setSelectedIds(selectedIds as string[])
        }
      />
    </div>
  );
}
