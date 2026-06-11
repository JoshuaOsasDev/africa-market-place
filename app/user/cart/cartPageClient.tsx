"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CartItem } from "@/types/cart";
import { CartItemRow } from "@/components/cart/cartItemRow";
import { CartSummary } from "@/components/cart/cartSummary";
import { CouponCode } from "@/components/cart/couponCode";
import { MobileOrderSummary } from "@/components/cart/mobileOrderSummary";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCart } from "@/lib/hooks/useCart";
import { deleteCart } from "@/redux/slices/product";
import { useRemoveFromCart } from "@/lib/hooks/userDashboard/useUser";
import { Product } from "@/types/product";

/**
 * CartPageClient Component
 * Serves as the orchestration layer for the user's shopping cart.
 * Synchronizes client-side UI states (Redux) with server persistence layers (TanStack Query)
 * and adaptively switches layout interfaces between mobile and large desktop viewports.
 */
export function CartPageClient() {
  const dispatch = useAppDispatch();

  // Subscribes directly to the checkout slice in the global Redux store for real-time item lists
  const cart: CartItem[] = useAppSelector(
    (state) => state.product.checkout.cart,
  );

  // TanStack Query custom mutation context for offloading state updates to the remote infrastructure
  const {
    mutate: removeFromCartAPI,
    isPending: isRemoving,
    variables: removingVariables,
  } = useRemoveFromCart();

  // console.log(cart, "carts");

  // console.log(isRemoving, removingVariables, "main is removale");
  // Custom persistent layout context handler controlling item quantities locally
  const { cartItems, updateQuantity } = useCart();

  /**
   * Orchestrates multi-tier product removal operations.
   * Optimistically updates internal local store vectors before executing remote API sync.
   * @param productToRemove The product model instance intended for deletion.
   */
  const removeP = (productToRemove: Product) => {
    // Stage 1: Dispatches instant cache evictions to provide latency-free client visual feedback
    removeFromCartAPI({ pid: productToRemove });

    // Stage 2: Persists mutations across the remote server infrastructure
    dispatch(deleteCart(productToRemove.slug));
  };

  /**
   * Proxy routine managing incremental or decremental changes inside item metrics.
   */
  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  /**
   * Resolves the associated target metadata from the operational cart array matching a specific ID.
   */
  const handleRemove = (productId: string) => {
    const product = cartItems?.find((item: CartItem) => item.pid === productId);

    if (product) {
      removeP(product);
    }
  };

  /**
   * Processes promotional code validation logic.
   */
  const handleApplyCoupon = (code: string) => {
    alert(`Coupon "${code}" applied!`);
  };

  // console.log(cart, "cart items");

  /* ── FALLBACK EMPTY STATE VIEW ── */
  // Conditional early return block triggered when no actionable entities remain in the user's checkout session
  if (!cart || cart?.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-[#111827]">
            Your cart is empty
          </h1>
          <p className="mb-6 text-[#6F6F6F]">
            Looks like you have not added any items yet.
          </p>
          <Link href="/user/products">
            <button className="rounded-full bg-[#2E7D32] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#246628]">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  /* ── ACTIVE CART INTERFACE ── */
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Escape Anchor */}
        <Link
          href="/user/products"
          className="mb-6 inline-flex items-center gap-2 text-[#111827] transition-colors hover:text-[#2E7D32]"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to shop</span>
        </Link>

        {/* DESKTOP RESPONSIVE GRID (Visible from min-width: 1024px onwards) */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-[1fr_350px]">
          {/* Main Transactional Entry Frame */}
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
            {/* Tabular Header Structure */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-[#E5E7EB] pb-4 text-xs font-semibold tracking-wider text-[#6F6F6F] uppercase">
              <div>Product</div>
              <div>Price</div>
              <div className="text-center">Quantity</div>
              <div>Subtotal</div>
              <div className="w-6"></div>
            </div>

            {/* Individual Structural Entity Rows Mapping */}
            <div>
              {cart?.map((item: CartItem) => (
                <CartItemRow
                  key={item.pid}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                  isRemoving={
                    isRemoving && removingVariables?.pid?.pid === item?.pid
                  }
                />
              ))}
            </div>

            {/* Promotional Input Matrix Element */}
            <CouponCode onApply={handleApplyCoupon} />
          </div>

          {/* Sticky Billing Calculations Panel */}
          <div className="sticky top-8 h-fit">
            <CartSummary summary={cart} />
          </div>
        </div>

        {/* MOBILE RESPONSIVE COMPACT WRAPPER (Hidden on screens larger than 1023px) */}
        {/* Consolidates rows, actions, counters, and pricing summaries into a mobile-friendly view */}
        <div className="lg:hidden">
          <MobileOrderSummary
            items={cart}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            isRemoving={isRemoving}
            removingVariables={removingVariables}
            onApplyCoupon={handleApplyCoupon}
          />
        </div>
      </div>
    </div>
  );
}
