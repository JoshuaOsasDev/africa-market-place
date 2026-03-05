"use client";

import React from "react";
import Link from "next/link";
import { CartItem } from "@/types/cart";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { usePostOrder } from "@/lib/hooks/userDashboard/useUser";
import { postUserOrder } from "@/services/apiServices/userDashboard";

interface CartSummaryProps {
  summary: CartItem[];
  className?: string;
}

export function CartSummary({ className }: CartSummaryProps) {
  const subtotal = useAppSelector((state) => state.product.checkout.subtotal);
  const total = useAppSelector((state) => state.product.checkout.total);
  const discount = useAppSelector((state) => state.product.checkout.discount);
  const shipping = useAppSelector((state) => state.product.checkout.shipping);
  const users = useAppSelector((state) => state.user.user);
  const cart = useAppSelector((state) => state.product.checkout.cart);
  // console.log(users, cart, "dis");

  const { mutate: createOrder, isPending } = usePostOrder();

  const handlePostOrder = () => {
    const data = {
      user: {
        firstName: users?.firstName,
        lastName: users?.lastName,
        email: users?.email,
        address: users?.address,
        city: users?.city,
        phone: users?.phone,
      },

      items: cart?.map((item: any) => ({
        pid: item.pid,
        name: item.name,
        salePrice: item.salePrice,
        sku: item.sku,
        shop: item.shop,
        quantity: item.quantity,
        subtotal: item.subtotal,
        image: item.images[0]?.url,
      })),
      subtotal,
      shipping,
      discount,
      total,
    };

    // createOrder(data);
    postUserOrder(data);
  };
  return (
    <div
      className={cn(
        "rounded-lg border border-[#E5E7EB] bg-white p-6",
        className,
      )}
    >
      <h2 className="mb-4 text-lg font-semibold text-[#111827]">
        Cart Summary
      </h2>

      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6F6F6F]">Subtotal:</span>
          <span className="font-medium text-[#111827]">
            ${subtotal?.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6F6F6F]">Shipping:</span>
          <span className="font-medium text-[#111827]">{shipping}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6F6F6F]">Discount:</span>
            <span className="font-medium text-[#2E7D32]">
              -${discount?.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3">
          <span className="font-semibold text-[#111827]">Total:</span>
          <span className="text-lg font-bold text-[#111827]">
            ${total?.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={handlePostOrder}
        className="w-full cursor-pointer rounded-full bg-[#2E7D32] py-3 font-semibold text-white transition-colors hover:bg-[#246628]"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
