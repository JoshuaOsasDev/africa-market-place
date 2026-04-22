"use client";
import Loader from "@/components/common/loader";
import DashboardCharts from "@/components/pageComponents/vendorComp/dashboard/dashboardCharts";
import DashboardFilter from "@/components/pageComponents/vendorComp/dashboard/dashboardFilter";
import DashboardSalesAndProduct from "@/components/pageComponents/vendorComp/dashboard/dashboardSalesAndProduct";
import DashboardSummary from "@/components/pageComponents/vendorComp/dashboard/dashboardSumarry";
import { useVendorDashboardAnalytics } from "@/lib/hooks/vendorDashboard/useVendor";

const DashboardPage = () => {
  //Hook to get DashBoard analytics
  const { isLoading, dashboardVendorAnalytics, error } =
    useVendorDashboardAnalytics();

  const dashboardData = dashboardVendorAnalytics?.data;
  //console.log(dashboardVendorAnalytics, "dashboard data ");
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <DashboardFilter />
      <DashboardSummary dashboardData={dashboardData} />
      <DashboardCharts
        incomeReport={dashboardData?.incomeReport}
        monthlyEarningsByVendor={dashboardData?.monthlyEarningsByVendor}
        dailyEarning={dashboardData?.dailyEarning}
        salesReport={dashboardData?.salesReport}
      />
      <DashboardSalesAndProduct
        loadingVendorProduct={isLoading}
        vendorProduct={dashboardData?.bestSellingProducts}
      />
    </div>
  );
};

export default DashboardPage;
