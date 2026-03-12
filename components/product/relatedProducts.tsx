"use client";

import React from "react";
import { ProductCard } from "@/components/product/productCard";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { p } from "framer-motion/client";

interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  title?: string;
  viewAllLink?: string;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistedProducts?: string[];
  className?: string;
}

export function RelatedProducts({
  products,
  title = "Related Products",
  viewAllLink,
  onAddToCart,
  onToggleWishlist,
  wishlistedProducts = [],
  className,
}: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return <p className="text-center text-lg"> No related product yet</p>;
  }

  return (
    <section className={cn("w-full", className)}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[24px] font-bold text-[#111827] lg:text-[32px]">
          {title}
        </h2>

        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="flex items-center gap-2 font-medium text-[#2E7D32] transition-all hover:gap-3"
          >
            <span className="text-sm lg:text-base">View All</span>
            <ChevronRight size={20} />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            slug={product.slug}
            image={product.image}
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            rating={product.rating}
            reviewCount={product.reviewCount}
            inStock={product.inStock}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlistedProducts.includes(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
