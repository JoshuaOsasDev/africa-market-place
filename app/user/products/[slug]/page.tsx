"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductImageGallery } from "@/components/product/productImageGallery";
import { ProductInfo } from "@/components/product/productInfo";
import { ProductTabs } from "@/components/product/productTabs";
import { RelatedProducts } from "@/components/product/relatedProducts";
import {
  useUserProductsBySlug,
  useUserWishlist,
} from "@/lib/hooks/userDashboard/useUser";
import { UserProductLoader } from "@/components/common/skeletonTable";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

interface ProductDetailClientProps {
  // Dynamic route params passed from the page component
  resolvedParams: { slug: string };
}

export function ProductDetailClient({
  resolvedParams,
}: ProductDetailClientProps) {
  /**
   * Get wishlist state from Redux store
   */
  const wishlist = useAppSelector((state) => state.wishlist);

  /**
   * Local state used to manage wishlisted products
   * Initialized with products already stored in Redux
   */
  const [wishlistedProducts, setWishlistedProducts] = useState(
    wishlist.wishlist?.data || [],
  );

  /**
   * Next.js router instance
   * Used for client-side navigation
   */
  const router = useRouter();

  /**
   * Navigate user to category page
   */
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/user/categories?category=${categoryId}`);
  };

  /**
   * Fetch product details using the product slug
   */
  const { userProductsSlug, isLoading } = useUserProductsBySlug(
    resolvedParams.slug,
  );

  /**
   * Wishlist mutation hook
   * Can be used to sync wishlist with backend
   */
  const { mutate: postWishlist } = useUserWishlist();

  /**
   * Extract product data from API response
   */
  const product: Product = userProductsSlug?.data;

  /**
   * Related products list
   */
  const relatedProducts = product?.relatedProducts;

  /**
   * Show skeleton loader while product data is loading
   */
  if (isLoading) return <UserProductLoader />;

  /**
   * Add or remove current product from wishlist
   */
  const handleToggleWishlist = () => {
    // Prevent execution if product slug does not exist
    if (!product?.slug) return;

    // API mutation can be enabled if backend syncing is needed
    // postWishlist(product._id);

    setWishlistedProducts((prev = []) => {
      // Check if product already exists in wishlist
      const exists = prev.some((item: any) => item.slug === product.slug);

      // Remove if exists, otherwise add product
      return exists
        ? prev.filter((item: any) => item.slug !== product.slug)
        : [...prev, product];
    });
  };

  /**
   * Handle adding related products to cart
   */
  const handleRelatedProductAddToCart = (productId: string) => {
    // Temporary implementation
    alert(`Added product ${productId} to cart!`);
  };

  /**
   * Toggle wishlist state for related products
   */
  const handleRelatedProductWishlist = (productId: string) => {
    setWishlistedProducts((prev: any) =>
      prev.includes(productId)
        ? prev.filter((id: any) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#6F6F6F]">
          {/* Home Link */}
          <Link href="/" className="transition-colors hover:text-[#2E7D32]">
            Home
          </Link>

          <span>/</span>

          {/* Category Navigation Button */}
          <button
            onClick={() => handleCategoryClick(product?.category?._id)}
            className="cursor-pointer transition-colors hover:text-[#2E7D32]"
          >
            {product?.category?.name}
          </button>

          <span>/</span>

          {/* Current Product Name */}
          <span className="font-medium text-[#111827]">{product?.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery
              images={product?.images}
              alt={product?.name}
              productName={product?.name}
            />
          </div>

          {/* Product Information */}
          <div>
            <ProductInfo
              product={product}
              name={product?.name}
              price={product?.price}
              originalPrice={product?.salePrice}
              inStock={product?.inStock}
              rating={product?.rating || 0}
              reviewCount={product?.reviews?.length}
              sku={product?.sku}
              description={product?.description.split("\n")[0]}
              category={product?.category}
              tags={product?.tags}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlistedProducts?.some(
                (item: any) => item?.slug === product?.slug,
              )}
              maxQuantity={product?.stockQuantity}
            />
          </div>
        </div>

        {/* Product Tabs Section */}
        <div className="mb-16">
          <ProductTabs
            // Determines if user has purchased the product
            isPaid={product?.isPurchased}
            // Full product description
            description={product?.description}
            // Product features section
            features={product?.isFeatures}
            // Product reviews identifier
            reviews={product?._id}
            // Additional product information table
            additionalInfo={
              product?.additionalInfo && (
                <div className="text-base text-[#6F6F6F]">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.additionalInfo).map(
                        ([key, value], index, array: any[]) => (
                          <tr
                            key={key}
                            className={
                              index < array.length - 1
                                ? "border-b border-[#E5E7EB]"
                                : ""
                            }
                          >
                            {/* Property Name */}
                            <td className="w-1/3 py-3 pr-4 font-medium text-[#111827] capitalize">
                              {key}
                            </td>

                            {/* Property Value */}
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
          // wishlistedProducts={wishlistedProducts}
        />
      </div>
    </div>
  );
}
