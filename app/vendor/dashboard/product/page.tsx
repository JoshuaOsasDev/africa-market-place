"use client";
import Loader from "@/components/common/loader";
import SetShowForm from "@/components/pageComponents/vendor/product/setShowForm";
import { useVendorProducts } from "@/lib/hooks/vendorDashboard/useVendor";

const ProductPage = () => {
  const { isLoading, vendorProducts, vendorProductsError } =
    useVendorProducts();

  console.log(vendorProducts);
  if (isLoading) {
    return <Loader />;
  }

  if (vendorProductsError) {
    return <div className="m-auto text-red-400">Error loading products</div>;
  }
  return (
    <div>
      <SetShowForm />
    </div>
  );
};

export default ProductPage;
