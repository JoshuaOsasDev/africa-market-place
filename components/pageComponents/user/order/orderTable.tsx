"use client";
import Modal from "@/components/common/modal";
import ReusableTable from "@/components/common/reusableTable";
import { Eye, Pen, Trash } from "lucide-react";
import DeleteProductModal from "@/components/pageComponents/vendor/product/deleteProductModal";
import SkeletonTable from "@/components/common/skeletonTable";
import { formatDate } from "@/lib/utils";
import { UsersOrder } from "@/types/order";
import { useState } from "react";
import OrderSummaryModal from "./orderSummaryModal";
import Image from "next/image";

export default function OrderTable({
  orderParams,
  userOders,
  isLoading,
}: {
  orderParams: string | string[] | undefined;
  userOders: UsersOrder[];
  isLoading: boolean;
}) {
  const [activeOrder, setActiveOrder] = useState(null);
  let filteredOrders = userOders || [];

  if (orderParams && typeof orderParams === "string") {
    if (orderParams === "pending") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status?.toLowerCase() === "pending",
      );
    }

    if (orderParams === "on-the-way") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status?.toLowerCase() === "on-the-way",
      );
    }

    if (orderParams === "canceled") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status?.toLowerCase() === "canceled",
      );
    }

    if (orderParams === "delivered") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status?.toLowerCase() === "delivered",
      );
    }

    if (orderParams === "canceled") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status?.toLowerCase() === "cancelled",
      );
    }

    if (orderParams === "returned") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status?.toLowerCase() === "returned",
      );
    }
  }
  //console.log(userOders, "orders");

  if (isLoading) return <SkeletonTable />;
  return (
    <>
      <ReusableTable
        order={orderParams}
        data={filteredOrders}
        columnsStyle="44px .5fr .7fr .5fr .5fr .5fr .5fr .5fr .4fr"
        columns={[
          {
            label: "Order Id",
            renderCell: (item) => (
              <span className="font-semibold text-[#2E7D32]">
                #{item.orderNo}
              </span>
            ),
          },
          {
            label: "Product",
            renderCell: (item) => (
              <div className="flex items-center gap-3">
                <p className="flex flex-col">
                  {" "}
                  <span className="font-medium text-[#333843]">
                    {item.items[0].name}
                  </span>
                  <span className="text-[#667085]">
                    {item.items.length === 1
                      ? ""
                      : `+${item.items.length - 1} other products`}
                  </span>
                </p>
              </div>
            ),
          },
          {
            label: "Date",
            renderCell: (item) => (
              <span className="text-[#333843]">
                {formatDate(item.createdAt)}
              </span>
            ),
          },
          {
            label: "Total",
            renderCell: (item) => (
              <span className="font-medium text-[#667085]">
                {item.total?.toFixed(2)}
              </span>
            ),
          },
          {
            label: "Payment",
            renderCell: (item) => (
              <span className="font-medium text-[#667085]">
                {item.paymentMethod}
              </span>
            ),
          },

          {
            label: "Pay Status",
            renderCell: (item) => {
              type PaymentStatus = "pending" | "successfull" | "failed";

              const colors: Record<PaymentStatus, string> = {
                pending: "bg-[#FFF9EA] text-[#FBC02D]",
                successfull: "bg-[#E8F8FD] text-[#13B2E4]",
                failed: "bg-[#FFE8E5] text-[#FF4733]",
              };

              const status = item.paymentStatus as PaymentStatus;
              const colorClass =
                colors[status] ?? "bg-green-100 text-green-700";

              return (
                <span className={`rounded-full px-3 py-1 ${colorClass}`}>
                  {item.paymentStatus}
                </span>
              );
            },
          },

          {
            label: "Delivery Status",
            renderCell: (item) => {
              type OrderStatus = "pending" | "shipped" | "cancelled";

              const colors: Record<OrderStatus, string> = {
                pending: "bg-[#FFF9EA] text-[#FBC02D]",
                shipped: "bg-[#E8F8FD] text-[#13B2E4]",
                cancelled: "bg-[#FFE8E5] text-[#FF4733]",
              };

              const status = item.status as OrderStatus;
              const colorClass =
                colors[status] ?? "bg-green-100 text-green-700";

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
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveOrder(item)}>
                  <Eye className="h-5 w-5 text-[#667085] hover:text-gray-900" />
                </button>

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
                      onConfirm={() => console.log("DELETE:")}
                    />
                  </Modal.Window>
                </Modal>
              </div>
            ),
          },
        ]}
        itemsPerPage={1}
        onSelectChange={(selectedIds) => console.log("Selected:", selectedIds)}
      />
      {activeOrder && (
        <OrderSummaryModal
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}
    </>
  );
}
