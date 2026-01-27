"use client";
import SkeletonTable from "@/components/common/skeletonTable";
import DisplayShop from "@/components/pageComponents/vendor/shop/displayShop";
import { useVendorShop } from "@/lib/hooks/vendorDashboard/useVendor";
import React from "react";

const SellerPage = () => {
  const { vendorShop, isLoading, vendorShopError } = useVendorShop();
  if (isLoading) return <SkeletonTable />;
  return <DisplayShop shop={vendorShop?.data} />;
};

export default SellerPage;
