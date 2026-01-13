"use client";
import Loader from "@/components/common/loader";
import DashboardCharts from "@/components/pageComponents/vendorComp/dashboard/DashboardCharts";
import DashboardFilter from "@/components/pageComponents/vendorComp/dashboard/dashboardFilter";
import DashboardSalesAndProduct from "@/components/pageComponents/vendorComp/dashboard/dashboardSalesAndProduct";
import DashboardSummary from "@/components/pageComponents/vendorComp/dashboard/dashboardSumarry";
import { useVendorDashboardAnalytics } from "@/lib/hooks/vendorDashboard/useVendor";
import { Suspense } from "react";

const DashboardPage = () => {
  const { isLoading, dashboardVendorAnalytics, error } =
    useVendorDashboardAnalytics();

  console.log(dashboardVendorAnalytics, "dashboardAnalytics");
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <DashboardFilter />
      <DashboardSummary />
      <DashboardCharts />
      <DashboardSalesAndProduct />
    </div>
  );
};

export default DashboardPage;
