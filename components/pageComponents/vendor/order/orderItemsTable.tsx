import ReusableTable from "@/components/common/reusableTable";
import { Eye } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Order } from "@/types/appTypes";
import Link from "next/link";

export default function OrderItemsTable({
  orders,
  totalPages,
}: {
  orders: Order[];
  totalPages: number;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-[#D4EDDA] text-[#155724]";
      case "Cancelled":
        return "bg-[#F8D7DA] text-[#721C24]";
      case "Shipped":
        return "bg-[#D1ECF1] text-[#0C5460]";
      case "pending":
        return "bg-[#FFF9EA] text-[#FBC02D]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="">
      <ReusableTable
        order={"order"}
        data={orders}
        columns={[
          {
            label: "Product",
            renderCell: (item) => (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6F6F6]">
                  {item.items[0]?.image && (
                    <img
                      className="object-cover text-lg"
                      src={item.items[0]?.image || ""}
                      alt="order image"
                      // fill
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[#333843]">
                    {item.items[0].name}
                  </span>
                  <span className="text-xs text-[#667085]">
                    +{item.items.length} Other Products
                  </span>
                </div>
              </div>
            ),
          },
          {
            label: "Order ID",
            renderCell: (item) => (
              <span className="font-semibold text-[#2E7D32]">
                {item.orderNo}
              </span>
            ),
          },
          {
            label: "Date",
            renderCell: (item) => (
              <span className="text-sm text-[#667085]">
                {formatDate(item.createdAt)}
              </span>
            ),
          },
          {
            label: "Customer",
            renderCell: (item) => (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#333843]">
                  {`${item.user.firstName} ${item.user.lastName}`}
                </span>
                <span className="text-xs text-[#667085]">{item.email}</span>
              </div>
            ),
          },
          {
            label: "Total",
            renderCell: (item) => (
              <span className="font-semibold text-[#333843]">{item.total}</span>
            ),
          },
          {
            label: "Payment",
            renderCell: (item) => (
              <span className="text-sm text-[#667085]">
                {item.paymentMethod || "-"}
              </span>
            ),
          },
          {
            label: "Status",
            renderCell: (item) => (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-lg font-medium ${getStatusStyles(
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
              <div className="flex items-center gap-3">
                <Link href={`/vendor/dashboard/orders/${item?._id}`}>
                  <Eye className="h-5 w-5 text-[#667085] hover:text-gray-900" />
                </Link>

                {/* <Modal>
                  <Modal.Open opens={`edit-product-${item.slug}`}>
                    <button
                      type="button"
                      className="flex cursor-pointer items-center hover:text-gray-900"
                    >
                      <Pen className="h-5 w-5 text-[#667085] hover:bg-gray-900" />
                    </button>
                  </Modal.Open>

                  <Modal.Window
                    name={`edit-product-${item.slug}`}
                    className="top-4.5 my-auto max-w-3xl overflow-y-scroll"
                  >
                    <EditProduct existingData={item.slug} />
                  </Modal.Window>
                </Modal> */}
              </div>
            ),
          },
        ]}
        columnsStyle="60px 1fr .5fr .6fr.7fr .5fr .5fr .5fr .5fr"
        totalPages={totalPages}
        onSelectChange={(selectedIds) =>
          setSelectedIds(selectedIds as string[])
        }
      />
    </div>
  );
}
