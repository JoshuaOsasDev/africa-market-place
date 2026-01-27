"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductMock, RelatedProduct } from "@/types/product";
import { Review } from "@/types/review";
import { ProductImageGallery } from "@/components/product/productImageGallery";
import { ProductInfo } from "@/components/product/productInfo";
import { ProductTabs } from "@/components/product/productTabs";
import { RelatedProducts } from "@/components/product/relatedProducts";

interface ProductDetailClientProps {
  product: ProductMock & { reviews: Review[] };
  relatedProducts: RelatedProduct[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([]);

  const handleAddToCart = async (quantity: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Added ${quantity} of ${product.name} to cart`);
        alert(`Added ${quantity} ${product.name} to cart!`);
        resolve(true);
      }, 500);
    });
  };

  const handleToggleWishlist = () => {
    setWishlistedProducts((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id],
    );
  };

  const handleRelatedProductAddToCart = (productId: string) => {
    console.log("Add related product to cart:", productId);
    alert(`Added product ${productId} to cart!`);
  };

  const handleRelatedProductWishlist = (productId: string) => {
    setWishlistedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#6F6F6F]">
          <Link href="/" className="transition-colors hover:text-[#2E7D32]">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${product.category.slug}`}
            className="transition-colors hover:text-[#2E7D32]"
          >
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="font-medium text-[#111827]">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <ProductImageGallery
              images={product.images}
              alt={product.name}
              productName={product.name}
            />
          </div>

          <div>
            <ProductInfo
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              inStock={product.inStock}
              rating={product.rating}
              reviewCount={product.reviewCount}
              sku={product.sku}
              description={product.description.split("\n")[0]}
              category={product.category}
              tags={product.tags}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlistedProducts.includes(product.id)}
              maxQuantity={product.stockQuantity}
            />
          </div>
        </div>

        {/* Product Tabs Section with Reviews */}
        <div className="mb-16">
          <ProductTabs
            description={product.description}
            features={product.features}
            reviews={product.reviews}
            additionalInfo={
              product.additionalInfo && (
                <div className="text-base text-[#6F6F6F]">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.additionalInfo).map(
                        ([key, value], index, array) => (
                          <tr
                            key={key}
                            className={
                              index < array.length - 1
                                ? "border-b border-[#E5E7EB]"
                                : ""
                            }
                          >
                            <td className="w-1/3 py-3 pr-4 font-medium text-[#111827] capitalize">
                              {key}
                            </td>
                            <td className="py-3 text-[#6F6F6F]">{value}</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              )
            }
          />
        </div>

        {/* Related Products Section */}
        <RelatedProducts
          products={relatedProducts}
          title="Related Products"
          viewAllLink="/products"
          onAddToCart={handleRelatedProductAddToCart}
          onToggleWishlist={handleRelatedProductWishlist}
          wishlistedProducts={wishlistedProducts}
        />
      </div>
    </div>
  );
}
