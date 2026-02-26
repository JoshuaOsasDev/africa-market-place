"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CartItem } from "@/types/cart";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { CouponCode } from "@/components/cart/CouponCode";
import { MobileOrderSummary } from "@/components/cart/MobileOrderSummary";
import { useAppSelector } from "@/redux/store";
import { useCart } from "@/lib/hooks/useCart";

export function CartPageClient() {
  const cart: CartItem[] = useAppSelector(
    (state) => state.product.checkout.cart,
  );

  //console.log(cart, "carts");

  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemove = (productId: string) => {
    const product = cartItems?.find((item: CartItem) => item.pid === productId);
    if (product) {
      removeFromCart(product);
    }
  };

  const handleApplyCoupon = (code: string) => {
    alert(`Coupon "${code}" applied!`);
  };

  if (cart?.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-[#111827]">
            Your cart is empty
          </h1>
          <p className="mb-6 text-[#6F6F6F]">
            Looks like you have not added any items yet.
          </p>
          <Link href="/products">
            <button className="rounded-full bg-[#2E7D32] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#246628]">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-[#111827] transition-colors hover:text-[#2E7D32]"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to shop</span>
        </Link>

        <div className="hidden gap-8 lg:grid lg:grid-cols-[1fr_350px]">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-[#E5E7EB] pb-4 text-xs font-semibold tracking-wider text-[#6F6F6F] uppercase">
              <div>Product</div>
              <div>Price</div>
              <div className="text-center">Quantity</div>
              <div>Subtotal</div>
              <div className="w-6"></div>
            </div>

            <div>
              {cart?.map((item: CartItem) => (
                <CartItemRow
                  key={item.pid}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            <CouponCode onApply={handleApplyCoupon} />
          </div>

          <div className="sticky top-8 h-fit">
            <CartSummary summary={cart} />
          </div>
        </div>

        <div className="lg:hidden">
          <MobileOrderSummary
            items={cart}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            onApplyCoupon={handleApplyCoupon}
          />
        </div>
      </div>
    </div>
  );
}
