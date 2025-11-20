// app/test-components-phase3/page.tsx

"use client";

import { ProductCard } from "@/components/product/productCard";
import { Tabs } from "@/components/common/tabs";
import { ProductTabs } from "@/components/product/productTabs";
import { ProductInfo } from "@/components/product/productInfo";
import { RelatedProducts } from "@/components/product/relatedProducts";
import { useState } from "react";

export default function TestComponentsPhase3Page() {
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([]);

  const mockProduct = {
    id: "1",
    name: "Chinese Cabbage",
    slug: "chinese-cabbage",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",
    price: 17.28,
    originalPrice: 48.0,
    discount: 64,
    rating: 5,
    reviewCount: 4,
    inStock: true,
  };

  const mockRelatedProducts = [
    {
      id: "2",
      name: "Red Tomato",
      slug: "red-tomato",
      image: "https://images.unsplash.com/photo-1546470427-227dddc29d64?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 4.5,
      reviewCount: 12,
      inStock: true,
    },
    {
      id: "3",
      name: "Fresh Corn",
      slug: "fresh-corn",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 4,
      reviewCount: 8,
      inStock: true,
    },
    {
      id: "4",
      name: "Green Chili",
      slug: "green-chili",
      image: "https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 5,
      reviewCount: 15,
      inStock: true,
    },
    {
      id: "5",
      name: "Fresh Potato",
      slug: "fresh-potato",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
      price: 25.0,
      originalPrice: 25.0,
      rating: 4.5,
      reviewCount: 20,
      inStock: false,
    },
  ];

  const handleAddToCart = (productId: string) => {
    console.log("Add to cart:", productId);
    alert(`Added product ${productId} to cart!`);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-[#111827]">
          Phase 3 Components Test
        </h1>

        {/* ProductCard */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            ProductCard Component
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProductCard
              {...mockProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlistedProducts.includes(mockProduct.id)}
            />
            <ProductCard
              {...mockProduct}
              id="product-2"
              discount={0}
              originalPrice={undefined}
              inStock={false}
            />
          </div>
        </section>

        {/* Tabs Component */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            Tabs Component (Generic)
          </h2>
          <div className="border border-[#E5E7EB] rounded-lg p-6">
            <Tabs
              tabs={[
                {
                  id: "tab1",
                  label: "Tab One",
                  content: <p className="text-[#6F6F6F]">Content for tab 1</p>,
                },
                {
                  id: "tab2",
                  label: "Tab Two",
                  content: <p className="text-[#6F6F6F]">Content for tab 2</p>,
                },
                {
                  id: "tab3",
                  label: "Tab Three",
                  content: <p className="text-[#6F6F6F]">Content for tab 3</p>,
                },
              ]}
            />
          </div>
        </section>

        {/* ProductTabs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            ProductTabs Component
          </h2>
          <div className="border border-[#E5E7EB] rounded-lg p-6">
            <ProductTabs
              description="Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar."
              features={[
                "100 g of fresh leaves provides.",
                "Aliquam ac est at augue volutpat elementum.",
                "Quisque nec enim eget sapien molestie.",
                "Proin convallis odio volutpat finibus posuere.",
              ]}
            />
          </div>
        </section>

        {/* ProductInfo */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            ProductInfo Component
          </h2>
          <div className="border border-[#E5E7EB] rounded-lg p-6 max-w-2xl">
            <ProductInfo
              name="Chinese Cabbage"
              price={17.28}
              originalPrice={48.0}
              inStock={true}
              rating={5}
              reviewCount={4}
              sku="2,51,594"
              description="Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar."
              category={{ name: "Vegetables", slug: "vegetables" }}
              tags={["Vegetables", "Healthy", "Chinese", "Cabbage", "Green Cabbage"]}
              onAddToCart={(qty) => alert(`Added ${qty} to cart!`)}
              onToggleWishlist={() => alert("Toggled wishlist!")}
              isWishlisted={false}
            />
          </div>
        </section>

        {/* RelatedProducts */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            RelatedProducts Component
          </h2>
          <RelatedProducts
            products={mockRelatedProducts}
            viewAllLink="/products"
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistedProducts={wishlistedProducts}
          />
        </section>
      </div>
    </div>
  );
}