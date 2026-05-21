"use client";

import React, { useMemo, useState } from "react";
import { Heart, Loader2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/lib/hooks/useCart";
import Link from "next/link";
import { useUserWishlist } from "@/lib/hooks/userDashboard/useUser";
import { useAppSelector } from "@/redux/store";

interface ProductCardProps {
  product: Product;
  className?: string;
  quantity?: number;
}

export default function ProductCard({
  product,
  quantity = 1,
  className = "",
}: ProductCardProps) {
  const wishlist = useAppSelector((state) => state.wishlist);
  const [wishlistedProducts, setWishlistedProducts] = useState(
    wishlist.wishlist?.data || [],
  );
  const { isInCart, addToCart, removeFromCart, isAdding, isRemoving } =
    useCart(product);

  const { isPending, mutate: postWishlist } = useUserWishlist();

  const id = product?._id;
  const name = product?.name;
  const slug = product?.slug;
  const imageUrl = product?.images?.[0]?.url;

  const price = product?.price ?? product?.salePrice ?? 0;
  const salePrice = product?.salePrice ?? 0;
  const stockQuantity = product?.stockQuantity ?? 0;

  // console.log(stockQuantity, "stock");
  //  Discount logic
  const hasDiscount = salePrice && salePrice < price;
  const displayPrice = hasDiscount ? salePrice : price;

  const discountPercent = hasDiscount
    ? Math.round(((price - salePrice) / price) * 100)
    : (product?.discount ?? "");

  const isOutOfStock = stockQuantity === 0;

  //console.log(isInCart, "isInCart");
  const isProcessing = isAdding || isRemoving;

  const handleCartAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;

    if (isInCart) {
      removeFromCart(product);
    } else {
      addToCart(product, quantity);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product?.slug) return;

    postWishlist(product._id);

    // dispatch(setWishlistAction([...wishlistedProducts, product.slug]));

    setWishlistedProducts((prev = []) => {
      const exists = prev.some((item: any) => item.slug === product.slug);

      return exists
        ? prev.filter((item: any) => item.slug !== product.slug)
        : [...prev, product];
    });
  };

  const isWishlisted = wishlistedProducts?.some(
    (item: any) => item?.slug === product?.slug,
  );
  const dynamicClasses = useMemo(() => {
    return isInCart
      ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
      : "border-[#2E7D32] bg-white text-[#2E7D32] hover:bg-green-50";
  }, [isInCart]);

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-[#F0F0F0] bg-white transition-all duration-300 hover:border-[#E0E0E0] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${isOutOfStock ? "pointer-events-none opacity-80" : "cursor-pointer"} ${className}`}
    >
      <Link href={`/user/products/${slug}`}>
        {/* Favorite Heart */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95"
        >
          <Heart
            size={16}
            className={`transition-colors duration-200 ${
              isWishlisted
                ? "fill-[#E74C3C] stroke-[#E74C3C]"
                : "fill-none stroke-[#999999] group-hover:stroke-[#666666]"
            }`}
          />
        </button>

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10 rounded-full bg-[#E74C3C] px-2.5 py-1 shadow-sm">
            <span className="text-[11px] font-bold text-white">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* Image */}
        <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-[#FAFAFA] p-6">
          {imageUrl ? (
            <div className="relative h-full w-full">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-200">
              <span className="text-xs text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex items-center justify-between px-3 py-1 md:p-4">
          <div>
            <h3 className="mb-1 line-clamp-2 font-medium group-hover:text-[#2E7D32] md:text-lg">
              {name}
            </h3>

            {/* Price */}
            <div className="mb-3 flex items-end gap-2">
              <span className="text-sm font-bold md:text-xl">
                €{displayPrice.toFixed(2)}
              </span>

              {hasDiscount && (
                <span className="text-[10px] text-[#BABABA] line-through md:text-[16px]">
                  €{price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleCartAction}
            disabled={isOutOfStock || isProcessing}
            className={`rounded-[20] p-3 ${
              isOutOfStock
                ? "cursor-not-allowed bg-[#E8E8E8] text-[#999999]"
                : "bg-[#F5F5F5] text-[#2C2C2C] hover:bg-[#2E7D32] hover:text-white"
            }${dynamicClasses} disabled:cursor-not-allowed`}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShoppingBag size={20} />
            )}
          </button>
        </div>
      </Link>

      {/* Dark Overlay when Out of Stock */}
      {isOutOfStock && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/90">
          <span className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black">
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
}
