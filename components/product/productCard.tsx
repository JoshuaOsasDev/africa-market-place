"use client";

import Image from "next/image";
import Link from "next/link";
import TextStyle from "@/components/common/textStyle";
import { CartButton } from "@/components/common/cartButton";
import { StarRating } from "@/components/common/starRating";
import { useAppSelector } from "@/redux/store";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useUserWishlist } from "@/lib/hooks/userDashboard/useUser";

export function ProductCard(product: any) {
  const wishlist = useAppSelector((state) => state.wishlist);
  const [wishlistedProducts, setWishlistedProducts] = useState(
    wishlist.wishlist?.data || [],
  );
  const data = product?.product;

  // Discount logic
  const hasDiscount = data?.salePrice && data?.salePrice < data?.price;
  const displayPrice = hasDiscount ? data?.salePrice : data?.price;

  const discountPercent = hasDiscount
    ? Math.round(((data?.price - data?.salePrice) / data?.price) * 100)
    : (product?.discount ?? "");

  //WishList function

  const { isPending, mutate: postWishlist } = useUserWishlist();
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!data?.slug) return;

    postWishlist(data._id);

    // dispatch(setWishlistAction([...wishlistedProducts, product.slug]));

    setWishlistedProducts((prev = []) => {
      const exists = prev.some((item: any) => item.slug === data.slug);

      return exists
        ? prev.filter((item: any) => item.slug !== data.slug)
        : [...prev, data];
    });
  };

  const isWishlisted = wishlistedProducts?.some(
    (item: any) => item?.slug === data?.slug,
  );

  return (
    <div className="group relative w-85 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-lg sm:w-70 md:w-62.5">
      {/* Discount Badge */}
      {hasDiscount && (
        <span className="absolute top-1 left-2 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          -{discountPercent}%
        </span>
      )}

      {/* Wishlist (optional UI only) */}

      <button
        onClick={handleToggleWishlist}
        className="absolute top-0 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95"
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

      <Link href={`user/products/${data?.slug}`}>
        {/* Image */}
        <div className="relative mb-3 h-[180px] w-full overflow-hidden rounded-xl bg-gray-100">
          {data?.images?.[0] && (
            <Image
              src={data.images[0].url}
              alt={data.images[0]._id}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
        </div>

        {/* Content */}
        <div className="space-y-2 px-1">
          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 md:text-base">
            {data?.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <StarRating rating={data?.rating} />
            <span className="text-xs text-gray-500">({data?.rating || 0})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900 md:text-lg">
              ${displayPrice}
            </span>

            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ${data?.price}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <div className="mt-4">
        <CartButton
          product={data}
          className="flex w-full items-center justify-center gap-2 rounded-xl border py-2 text-sm font-medium transition"
        />
      </div>
    </div>
  );
}
