"use client";
import { useVendorProductById } from "@/lib/hooks/vendorDashboard/useVendor";
import ProductLinkNav from "./productLinkNav";
import ProductDetailsButton from "./productDetailsButton";
import { ArrowLeft } from "lucide-react";
import ProductDetails from "./ProductDetails";
import Loader from "@/components/common/loader";
import { Product } from "@/types/product";

export default function ProductIdPage({ productId }: { productId: string }) {
  console.log(productId, "params");
  const { vendorProductById, isLoading, error } =
    useVendorProductById(productId);
  console.log(vendorProductById, "ProductID data");

  const product: Product = vendorProductById?.data;
  if (isLoading) return <Loader />;
  return (
    <div className="">
      <div className="hidden items-end justify-between md:flex">
        <div className="flex flex-col gap-2">
          <h1 className="hidden text-2xl leading-8 font-medium tracking-[0.5%] text-[#333843] md:block">
            Products Details
          </h1>
          <ProductLinkNav name="Product" id={productId} />
        </div>
        <ProductDetailsButton />
      </div>

      <ArrowLeft className="ml-2 md:hidden" />
      <ProductDetails product={product} />
    </div>
  );
}
