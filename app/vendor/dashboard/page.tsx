"use client";
import { Stat } from "@/app/admin/dashboard/page";
import Loader from "@/components/common/loader";
import DashboardCharts from "@/components/pageComponents/vendorComp/dashboard/dashboardCharts";
import DashboardFilter from "@/components/pageComponents/vendorComp/dashboard/dashboardFilter";
import DashboardSalesAndProduct from "@/components/pageComponents/vendorComp/dashboard/dashboardSalesAndProduct";
import DashboardSummary from "@/components/pageComponents/vendorComp/dashboard/dashboardSumarry";
import { useVendorDashboardAnalytics } from "@/lib/hooks/vendorDashboard/useVendor";
import { ShoppingBag, ShoppingCart, User, UserRound } from "lucide-react";

const DashboardPage = () => {
  //Hook to get DashBoard analytics
  const { isLoading, dashboardVendorAnalytics, error } =
    useVendorDashboardAnalytics();

  const dashboardData = dashboardVendorAnalytics?.data;

  const analytics = dashboardData;

  console.log(analytics, "ana");
  const totalProduct = analytics?.totalProducts;

  const totalPendingOrders = analytics?.totalPendingOrders;

  const stats: Stat[] = [
    {
      icon: ShoppingBag,
      iconBg: "#DEDEFA",
      iconBorder: "#EFEFFD",
      iconColor: "#5C59E8",
      title: "Total Products",
      amount: totalProduct,
    },

    {
      icon: ShoppingCart,
      iconBg: "#FAE1CF",
      iconBorder: "#FDF1E8",
      iconColor: "#E46A11",
      title: "Total  Orders",
      amount: totalPendingOrders,
      percentage: -12,
    },
  ];

  //console.log(dashboardVendorAnalytics, "dashboard data ");
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <DashboardFilter />
      <DashboardSummary stats={stats} dashboardGrid="md:grid-cols-2" />
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
