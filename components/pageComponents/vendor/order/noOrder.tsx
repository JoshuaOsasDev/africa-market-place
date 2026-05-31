"use client";
import { Button } from "@/components/ui/button";
import { setShowForm } from "@/redux/slices/showFormSlice";
import { useAppDispatch } from "@/redux/store";
import { CircleOff } from "lucide-react";
import React from "react";

export default function NoOrder({
  type,
  show,
  showFormNoOrder,
  productForm,
  paragraph = " You don’t have any orders at the moment. When customers place orders,they’ll appear here for you to manage.",
}: {
  type: string;
  productForm: React.JSX.Element;
  showFormNoOrder: boolean;
  show: boolean;
  paragraph?: string;
}) {
  const dispatch = useAppDispatch();
  const openForm = () => {
    dispatch(
      setShowForm({
        showform: {
          show: show,
          type: type,
        },
      }),
    );
  };
  console.log(showFormNoOrder, "form order");
  if (showFormNoOrder) return productForm;

  //For no Order yet
  if (type === "Order")
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 text-center">
        {/* Icon */}
        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#EAF2EA]">
          <CircleOff className="h-24 w-24 animate-spin text-[#2E7D32]" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-[#101828] sm:text-3xl">
          No orders yet
        </h1>

        {/* Description */}
        <p className="max-w-md text-base font-normal text-[#475467]">
          {paragraph}
        </p>
      </div>
    );

  return (
    <div className="mb-5 flex flex-col items-center gap-4 pt-20">
      {/* Icon */}
      <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#EAF2EA]">
        <CircleOff className="h-24 w-24 animate-spin text-[#2E7D32]" />
      </div>
      <h1 className="text-[32px] font-medium">No {type} yet</h1>
      <p className="w-88 text-center text-[16px] font-normal text-[#475467]">
        {paragraph}
      </p>
      <Button
        onClick={openForm}
        className="rounded-[27px] bg-[#2E7D32] px-4 py-3 text-[16px] font-medium text-[#EAF2EA]"
      >
        + Add {type}
      </Button>
    </div>
  );
}
