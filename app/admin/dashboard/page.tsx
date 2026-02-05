"use client";

import Loader from "@/components/common/loader";
import ProductsAndRegionalPerformance from "@/components/pageComponents/admin/dashboardProductsAndRegionalPerformance";
import DashboardSalesPage from "@/components/pageComponents/admin/dashboardSalesPage";
import DashboardSummary from "@/components/pageComponents/vendorComp/dashboard/dashboardSumarry";
import { useAdminDashboardAnalytics } from "@/lib/hooks/adminDashboardApi/useAdmin";
import { useAppSelector } from "@/redux/store";

export default function AdminPage() {
  const { isLoading, adminDashboardAnalytics, adminDashboardAnalyticsError } =
    useAdminDashboardAnalytics();

  const categories = useAppSelector((state) => state.categories);

  // console.log(adminDashboardAnalytics, categories, "admin");
  if (isLoading) return <Loader />;
  return (
    <div>
      <DashboardSummary dashboardData={adminDashboardAnalytics} />
      <DashboardSalesPage />
      <ProductsAndRegionalPerformance />
    </div>
  );
}
