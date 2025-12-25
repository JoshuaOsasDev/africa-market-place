"use client";
import Modal from "@/components/common/Modal";
import ReusableTable from "@/components/common/reusableTable";
import { ordersData } from "@/lib/data";
import { Eye, Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EditProduct from "../../vendor/product/EditProduct";
import DeleteProductModal from "../../vendor/product/DeleteProductModal";

export default function OrderTable({
  order,
}: {
  order: string | string[] | undefined;
}) {
  return (
    <ReusableTable
      order={order}
      data={ordersData}
      columnsStyle="44px .5fr 1fr .5fr .5fr .5fr .5fr .5fr"
      columns={[
        {
          label: "Order Id",
          renderCell: (item) => (
            <span className="font-semibold text-[#2E7D32]">
              #{item.orderId}
            </span>
          ),
        },
        {
          label: "Product",
          renderCell: (item) => (
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#F6F6F6] p-1">
                <Image
                  src={item.image}
                  alt={item.product}
                  width={40}
                  height={40}
                />
              </div>
              <p className="flex flex-col">
                {" "}
                <span className="font-medium text-[#333843]">
                  {item.product}
                </span>
                <span className="text-[#667085]">+3 other products</span>
              </p>
            </div>
          ),
        },
        {
          label: "Date",
          renderCell: (item) => (
            <span className="text-[#333843]">{item.date}</span>
          ),
        },
        {
          label: "Total",
          renderCell: (item) => (
            <span className="font-medium text-[#667085]">{item.total}</span>
          ),
        },
        {
          label: "Payment",
          renderCell: (item) => (
            <span className="font-medium text-[#667085]">{item.payment}</span>
          ),
        },

        {
          label: "Status",
          renderCell: (item) => {
            type OrderStatus = "Processing" | "Shipped" | "Cancelled";

            const colors: Record<OrderStatus, string> = {
              Processing: "bg-[#FFF9EA] text-[#FBC02D]",
              Shipped: "bg-[#E8F8FD] text-[#13B2E4]",
              Cancelled: "bg-[#FFE8E5] text-[#FF4733]",
            };

            const status = item.status as OrderStatus;
            const colorClass = colors[status] ?? "bg-green-100 text-green-700";

            return (
              <span className={`rounded-full px-3 py-1 ${colorClass}`}>
                {item.status}
              </span>
            );
          },
        },
        {
          label: "Action",
          renderCell: (item) => (
            <div className="flex items-center gap-1">
              <Link href={"/vendor/dashboard/product/details"}>
                <Eye className="h-5 w-5 text-[#667085] hover:text-gray-900" />
              </Link>
              {order !== "cancelled" && order !== "shipped" && (
                <Modal>
                  <Modal.Open opens={`edit-product-${item.id}`}>
                    <button
                      type="button"
                      className="flex cursor-pointer items-center hover:text-gray-900"
                    >
                      <Pen className="h-5 w-5 text-[#667085]" />
                    </button>
                  </Modal.Open>

                  <Modal.Window
                    name={`edit-product-${item.id}`}
                    className="top-4.5 my-auto max-w-3xl overflow-y-scroll"
                  >
                    <EditProduct />
                  </Modal.Window>
                </Modal>
              )}

              <Modal>
                <Modal.Open opens={`delete-product-${item.id}`}>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center"
                  >
                    <Trash className="h-5 w-5 cursor-pointer text-[#667085] hover:text-red-700" />
                  </button>
                </Modal.Open>

                <Modal.Window
                  name={`delete-product-${item.id}`}
                  className="max-w-md"
                >
                  <DeleteProductModal
                    text="order"
                    productName={item.name}
                    onConfirm={() => console.log("DELETE:", item.id)}
                  />
                </Modal.Window>
              </Modal>
            </div>
          ),
        },
      ]}
      itemsPerPage={5}
      onSelectChange={(selectedIds) => console.log("Selected:", selectedIds)}
    />
  );
}
