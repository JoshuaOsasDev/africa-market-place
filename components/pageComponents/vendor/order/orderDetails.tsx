import React, { useState } from "react";
import {
  Package,
  Mail,
  Phone,
  MapPin,
  FileText,
  Truck,
  CheckCircle,
  Calendar,
  CalendarCheck,
  CreditCard,
  TruckElectric,
  Contact,
  ReceiptEuro,
  BadgeCheck,
  Map,
} from "lucide-react";
import ReusableTable from "@/components/common/reusableTable";
import Image from "next/image";

const OrderManagementUI = (order: any) => {
  const selectedOrder = order.order;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = ({
    amount,
    currency,
  }: {
    amount?: number;
    currency?: string;
  }) => {
    return `${currency === "NGN" ? "₦" : "$"}${amount?.toLocaleString()}`;
  };

  // const getStatusColor = (status: string) => {
  //   const colors = {
  //     pending: "bg-yellow-100 text-yellow-800",
  //     processing: "bg-blue-100 text-blue-800",
  //     packed: "bg-purple-100 text-purple-800",
  //     shipping: "bg-indigo-100 text-indigo-800",
  //     delivered: "bg-green-100 text-green-800",
  //   };
  //   return colors[status] || "bg-gray-100 text-gray-800";
  // };

  const orderStatuses = [
    {
      status: "Order Placed",
      desc: "An order has been placed.",
      date: formatDate(selectedOrder?.createdAt),
      active: true,
    },
    {
      status: "Processing",
      desc: "Your order is being processed.",
      date: "",
      active: selectedOrder?.status === "pending",
    },
    {
      status: "Packed",
      desc: "Your order has been packed.",
      date: "",
      active: false,
    },
    {
      status: "Shipping",
      desc: "Package on its way.",
      date: "",
      active: false,
    },
    { status: "Delivered", desc: "Delivery done.", date: "", active: false },
  ];

  return (
    <div className="mt-5 min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="mb-1.5 flex items-center justify-between text-lg font-semibold text-[#1A1C21]">
                <span> Order #{`${selectedOrder?.orderNo}`} </span>
                <span className="rounded-full bg-[#FFF9EA] px-3 py-1 text-sm font-semibold text-[#FBC02D]">
                  processing
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              {/* Order */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                    <CalendarCheck className="text-[#667085]" />
                  </div>

                  <p className="text-sm font-medium text-[#757575]">Added</p>
                </div>

                <p className="text-sm font-medium text-[#757575]">
                  {formatDate(selectedOrder?.createdAt)}
                </p>
              </div>
              {/* Paymet mothod */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                    <CreditCard className="text-[#667085]" />
                  </div>

                  <p className="text-sm font-medium text-[#757575]">
                    Payment Method
                  </p>
                </div>

                <p className="text-sm font-medium text-[#757575]">
                  {selectedOrder?.paymentMethod}
                </p>
              </div>
              {/* Shipping */}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                    <TruckElectric className="text-[#667085]" />
                  </div>

                  <p className="text-sm font-medium text-[#757575]">
                    Shipping Method
                  </p>
                </div>

                <p className="text-sm font-medium text-[#757575]">
                  {selectedOrder?.courierName || "No Courier"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Address & Status */}

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Customer</h3>
            <div className="flex flex-col gap-2">
              {/* Custormer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                    <Contact className="text-[#667085]" />
                  </div>

                  <p className="text-sm font-medium text-[#757575]">
                    Custormer
                  </p>
                </div>

                <p className="text-sm font-medium text-[#757575]">
                  {`${selectedOrder?.user.firstName} ${selectedOrder?.user.lastName}`}
                </p>
              </div>
              {/* Mail mothod */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                    <Mail className="text-[#667085]" />
                  </div>

                  <p className="text-sm font-medium text-[#757575]">Mail</p>
                </div>

                <p className="text-sm font-medium text-[#757575]">
                  {selectedOrder?.user?.email}
                </p>
              </div>
              {/* Shipping */}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                    <Phone className="text-[#667085]" />
                  </div>

                  <p className="text-sm font-medium text-[#757575]">Phone</p>
                </div>

                <p className="text-sm font-medium text-[#757575]">
                  {selectedOrder?.user?.phone}
                </p>
              </div>
            </div>
          </div>
          {/* Document */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Document</h3>
            <div className="flex flex-col gap-2">
              {/* INvoice */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                    <ReceiptEuro className="text-[#667085]" />
                  </div>

                  <p className="text-sm font-medium text-[#757575]">receipt</p>
                </div>

                <p className="text-sm font-medium text-[#757575]">
                  INV-{selectedOrder?.orderNo}
                </p>
              </div>
              {/* Shippinh mothod */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                    <Truck className="text-[#667085]" />
                  </div>

                  <p className="text-sm font-medium text-[#757575]">Shipping</p>
                </div>

                <p className="text-sm font-medium text-[#757575]">
                  SHP-{selectedOrder?.orderNo}
                </p>
              </div>
              {/* Shipping */}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                    <BadgeCheck className="text-[#667085]" />
                  </div>

                  <p className="text-sm font-medium text-[#757575]">Rewards</p>
                </div>

                <p className="text-sm font-medium text-[#757575]">
                  LSRD-{selectedOrder?.orderNo}
                </p>
              </div>
            </div>
          </div>

          {/* Address */}
          {/* <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="mb-4 font-semibold">Address</h3>
            <div className="space-y-3">
              <div className="flex items-start text-sm">
                <MapPin className="mt-0.5 mr-2 h-4 w-4 text-gray-400" />
                <div>
                  <div className="mb-1 font-medium">Billing</div>
                  <div className="text-gray-600">
                    {selectedOrder?.user?.address}, {selectedOrder?.user?.city},{" "}
                    {selectedOrder?.user?.state} {selectedOrder?.user?.zip},{" "}
                    {selectedOrder?.user?.country}
                  </div>
                </div>
              </div>
              <div className="flex items-start text-sm">
                <MapPin className="mt-0.5 mr-2 h-4 w-4 text-gray-400" />
                <div>
                  <div className="mb-1 font-medium">Shipping</div>
                  <div className="text-gray-600">
                    {selectedOrder?.user?.address}, {selectedOrder?.user?.city},{" "}
                    {selectedOrder?.user?.state} {selectedOrder?.user?.zip},{" "}
                    {selectedOrder?.user?.country}
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Order Status */}
        </div>

        <div className="mt-5 grid gap-6 md:grid-cols-3">
          <div className="h-fit rounded-lg bg-white p-6 shadow-sm md:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Order Items</h2>

            <div className="space-y-4">
              {selectedOrder?.items?.map((item: any, index: number) => (
                <div
                  key={item.id || index}
                  className="flex items-center justify-between rounded-xl border border-[#E0E2E7] p-4 transition hover:shadow-sm"
                >
                  {/* LEFT: Product Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-[#F6F6F6]">
                      {item?.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-[#1A1C21]">
                        {item?.name}
                      </p>

                      <p className="text-xs text-[#667085]">SKU: {item?.sku}</p>

                      {item?.variant && (
                        <p className="text-xs text-[#667085]">
                          Variant: {item.variant}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* CENTER: Quantity */}
                  <div className="hidden flex-col items-center md:flex">
                    <p className="text-xs text-[#667085]">Qty</p>
                    <p className="font-semibold">{item?.quantity}</p>
                  </div>

                  {/* CENTER: Price */}
                  <div className="hidden flex-col items-center md:flex">
                    <p className="text-xs text-[#667085]">Price</p>
                    <p className="font-semibold">
                      £{item?.salePrice?.toFixed(2)}
                    </p>
                  </div>

                  {/* RIGHT: Total */}
                  <div className="text-right">
                    <p className="text-xs text-[#667085]">Total</p>
                    <p className="text-sm font-bold text-[#2E7D32]">
                      £{item?.total?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1">
            {/* Address */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Address</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                      <MapPin className="text-[#667085]" />
                    </div>

                    <div className="flex flex-col items-start justify-start">
                      <p className="text-sm font-medium text-[#757575]">
                        Billing
                      </p>
                      <p className="text-sm font-medium text-[#757575]">
                        {selectedOrder?.user?.address},{" "}
                        {selectedOrder?.user?.city},{" "}
                        {selectedOrder?.user?.state} {selectedOrder?.user?.zip},{" "}
                        {selectedOrder?.user?.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full border-4 border-[#F0F1F3] bg-[#E0E2E7] p-2">
                      <MapPin className="text-[#667085]" />
                    </div>

                    <div className="mt-2 flex flex-col items-start justify-start">
                      <p className="text-sm font-medium text-[#757575]">
                        Shipping
                      </p>
                      <p className="text-sm font-medium text-[#757575]">
                        {selectedOrder?.user?.address},{" "}
                        {selectedOrder?.user?.city},{" "}
                        {selectedOrder?.user?.state} {selectedOrder?.user?.zip},{" "}
                        {selectedOrder?.user?.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="mt-3 rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-semibold">Order Status</h3>
              <div className="space-y-4">
                {orderStatuses.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full ${
                        item.active
                          ? "bg-[#2E7D32] text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {item.active ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <div className="h-3 w-3 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.status}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                      {item.date && (
                        <div className="mt-1 text-xs text-gray-400">
                          {item.date}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementUI;
