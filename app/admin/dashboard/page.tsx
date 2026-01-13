"use client";

import Loader from "@/components/common/loader";
import ProductsAndRegionalPerformance from "@/components/pageComponents/admin/dashboardProductsAndRegionalPerformance";
import DashboardSalesPage from "@/components/pageComponents/admin/dashboardSalesPage";
import DashboardSummary from "@/components/pageComponents/vendorComp/dashboard/dashboardSumarry";
import { useAdminDashboardAnalytics } from "@/lib/hooks/adminDashboardApi/useAdmin";

export default function AdminPage() {
  const { isLoading, adminDashboardAnalytics, adminDashboardAnalyticsError } =
    useAdminDashboardAnalytics();

  console.log(adminDashboardAnalytics, "admin ana");
  if (isLoading) return <Loader />;
  return (
    <div>
      <DashboardSummary />
      <DashboardSalesPage />
      <ProductsAndRegionalPerformance />
    </div>
  );
}
