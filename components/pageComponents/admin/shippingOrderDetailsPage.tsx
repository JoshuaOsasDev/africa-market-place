"use client";
import { useState } from "react";
import ReusableTable from "@/components/common/reusableTable";
import { ArrowDownWideNarrow, DollarSign } from "lucide-react";

export default function ShippingOrderDetailsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Mock order items data
  const orderItems = [
    {
      id: "1",
      productName: "Red Pepper",
      unitPrice: "₦21,000.00",
      qty: 2,
      discount: "₦0.00",
      orderTotal: "₦50,000.00",
      status: "Delivered",
    },
    {
      id: "2",
      productName: "Green Beans",
      unitPrice: "₦21,000.00",
      qty: 2,
      discount: "₦0.00",
      orderTotal: "₦50,000.00",
      status: "Pending",
    },
    {
      id: "3",
      productName: "Red Pepper",
      unitPrice: "₦21,000.00",
      qty: 2,
      discount: "₦0.00",
      orderTotal: "₦50,000.00",
      status: "Delivered",
    },
    {
      id: "4",
      productName: "Potatoes",
      unitPrice: "₦21,000.00",
      qty: 2,
      discount: "₦0.00",
      orderTotal: "₦50,000.00",
      status: "Declined",
    },
    {
      id: "5",
      productName: "Red Pepper",
      unitPrice: "₦21,000.00",
      qty: 2,
      discount: "₦0.00",
      orderTotal: "₦50,000.00",
      status: "Delivered",
    },
    {
      id: "6",
      productName: "Red Pepper",
      unitPrice: "₦21,000.00",
      qty: 2,
      discount: "₦0.00",
      orderTotal: "₦50,000.00",
      status: "Delivered",
    },
    {
      id: "7",
      productName: "Green Beans",
      unitPrice: "₦21,000.00",
      qty: 2,
      discount: "₦0.00",
      orderTotal: "₦50,000.00",
      status: "Pending",
    },
    {
      id: "8",
      productName: "Potatoes",
      unitPrice: "₦21,000.00",
      qty: 2,
      discount: "₦0.00",
      orderTotal: "₦50,000.00",
      status: "Declined",
    },
  ];

  // Status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-[#D4EDDA] text-[#155724]";
      case "Pending":
        return "bg-[#FFF3CD] text-[#856404]";
      case "Declined":
        return "bg-[#F8D7DA] text-[#721C24]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Product icon helper
  const getProductIcon = (productName: string) => {
    switch (productName) {
      case "Red Pepper":
        return "🌶️";
      case "Green Beans":
        return "🫘";
      case "Potatoes":
        return "🥔";
      default:
        return "📦";
    }
  };

  return (
    <div className="mt-3.5 w-full space-y-6 rounded-xl bg-white p-2.5">
      {/* Header with item count */}
      <div>
        <h2 className="mb-1 text-[16px] font-semibold text-[#333843]">
          Items <span className="text-[#667085]">{orderItems.length}</span>
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white">
        <ReusableTable
          order="asc"
          data={orderItems}
          columns={[
            {
              label: (
                <div className="flex items-center gap-2">
                  <span>Product Name</span>
                  <ArrowDownWideNarrow />
                </div>
              ),
              renderCell: (item) => (
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {getProductIcon(item.productName)}
                  </span>
                  <span className="font-medium text-[#333843]">
                    {item.productName}
                  </span>
                </div>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <span>Unit Price</span>
                  <ArrowDownWideNarrow />
                </div>
              ),
              renderCell: (item) => (
                <span className="text-[#667085]">{item.unitPrice}</span>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <span>Qty</span>
                  <ArrowDownWideNarrow />
                </div>
              ),
              renderCell: (item) => (
                <span className="text-[#667085]">{item.qty}</span>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <span>Discount</span>
                  <ArrowDownWideNarrow />
                </div>
              ),
              renderCell: (item) => (
                <span className="text-[#667085]">{item.discount}</span>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <span>Order Total</span>
                  <ArrowDownWideNarrow />
                </div>
              ),
              renderCell: (item) => (
                <span className="font-medium text-[#333843]">
                  {item.orderTotal}
                </span>
              ),
            },
            {
              label: (
                <div className="flex items-center gap-2">
                  <span>Status</span>
                  <ArrowDownWideNarrow />
                </div>
              ),
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
          ]}
          columnsStyle="50px 0.8fr 0.6fr 120px 0.6fr 0.6fr 0.6fr"
          itemsPerPage={10}
          onSelectChange={(selectedIds) =>
            setSelectedIds(selectedIds as string[])
          }
        />
      </div>

      {/* Total Section */}
      <div className="flex justify-end">
        <div className="w-full rounded-lg border-gray-200 bg-white p-1 md:w-96">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="text-[16px] font-semibold text-[#333843]">
              Total
            </span>
            <span className="text-[18px] font-bold text-[#2E7D32]">
              ₦150,000.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
