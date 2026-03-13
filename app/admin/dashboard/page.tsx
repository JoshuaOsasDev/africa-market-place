"use client";

import Loader from "@/components/common/loader";
import ProductsAndRegionalPerformance from "@/components/pageComponents/admin/dashboardProductsAndRegionalPerformance";
import DashboardSalesPage from "@/components/pageComponents/admin/dashboardSalesPage";
import DashboardSummary from "@/components/pageComponents/vendorComp/dashboard/dashboardSumarry";
import { useAdminDashboardAnalytics } from "@/lib/hooks/adminDashboardApi/useAdmin";

export default function AdminPage() {
  const { isLoading, adminDashboardAnalytics, adminDashboardAnalyticsError } =
    useAdminDashboardAnalytics();

  // const categories = useAppSelector((state) => state.categories);

  // console.log(adminDashboardAnalytics, categories, "admin");
  if (isLoading) return <Loader />;
  return (
    <div>
      <DashboardSummary dashboardData={adminDashboardAnalytics} />
      <DashboardSalesPage
        incomeReport={adminDashboardAnalytics?.data?.incomeReport}
        dailyEarning={adminDashboardAnalytics?.data?.dailyEarning}
        orderReport={adminDashboardAnalytics?.data?.ordersReport}
        salesReport={adminDashboardAnalytics?.data?.salesReport}
      />
      <ProductsAndRegionalPerformance
        products={adminDashboardAnalytics.data.bestSellingProducts}
      />
    </div>
  );
}
