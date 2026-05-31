"use client";

import { CartItem } from "@/types/cart";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import { usePostOrder } from "@/lib/hooks/userDashboard/useUser";
import { postUserOrder } from "@/services/apiServices/userDashboard";
import Link from "next/link";

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
  // console.log(subtotal, cart, "dis");

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
            £{subtotal?.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6F6F6F]">Shipping:</span>
          <span className="font-medium text-[#111827]">
            £{shipping?.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6F6F6F]">Discount:</span>
            <span className="font-medium text-[#2E7D32]">
              -£{discount?.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3">
          <span className="font-semibold text-[#111827]">Total:</span>
          <span className="text-lg font-bold text-[#111827]">
            £{total?.toFixed(2)}
          </span>
        </div>
      </div>

      <Link href={"/user/checkout"}>
        <button className="w-full cursor-pointer rounded-full bg-[#2E7D32] py-3 font-semibold text-white transition-colors hover:bg-[#246628]">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
}
