"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Cart } from "@/types/cart";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { CouponCode } from "@/components/cart/CouponCode";
import { MobileOrderSummary } from "@/components/cart/MobileOrderSummary";

interface CartPageClientProps {
  initialCart: Cart;
}

export function CartPageClient({ initialCart }: CartPageClientProps) {
  const [cart, setCart] = useState<Cart>(initialCart);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      const subtotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: updatedItems,
        summary: {
          ...prevCart.summary,
          subtotal,
          total: subtotal - (prevCart.summary.discount || 0),
        },
      };
    });
  };

  const handleRemove = (id: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((item) => item.id !== id);

      const subtotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: updatedItems,
        summary: {
          ...prevCart.summary,
          subtotal,
          total: subtotal - (prevCart.summary.discount || 0),
        },
      };
    });
  };

  const handleApplyCoupon = (code: string) => {
    console.log("Applying coupon:", code);
    alert(`Coupon "${code}" applied!`);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111827] mb-4">
            Your cart is empty
          </h1>
          <p className="text-[#6F6F6F] mb-6">
            Looks like you haven't added any items yet.
          </p>
          <Link href="/products">
            <button className="px-6 py-3 bg-[#2E7D32] hover:bg-[#246628] text-white font-semibold rounded-full transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#111827] hover:text-[#2E7D32] transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to shop</span>
        </Link>

        <div className="hidden lg:grid lg:grid-cols-[1fr_350px] gap-8">
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-4 border-b border-[#E5E7EB] text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider">
              <div>Product</div>
              <div>Price</div>
              <div className="text-center">Quantity</div>
              <div>Subtotal</div>
              <div className="w-6"></div>
            </div>

            <div>
              {cart.items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            <CouponCode onApply={handleApplyCoupon} />
          </div>

          <div className="h-fit sticky top-8">
            <CartSummary summary={cart.summary} />
          </div>
        </div>

        <div className="lg:hidden">
          <MobileOrderSummary
            items={cart.items}
            summary={cart.summary}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            onApplyCoupon={handleApplyCoupon}
          />
        </div>
      </div>
    </div>
  );
}