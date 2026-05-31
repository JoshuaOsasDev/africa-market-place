"use client";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import Loader from "@/components/common/loader";
import ProductsAndRegionalPerformance from "@/components/pageComponents/admin/dashboardProductsAndRegionalPerformance";
import DashboardSalesPage from "@/components/pageComponents/admin/dashboardSalesPage";
import DashboardSummary from "@/components/pageComponents/vendorComp/dashboard/dashboardSumarry";
import { useAdminDashboardAnalytics } from "@/lib/hooks/adminDashboardApi/useAdmin";
import {
  LucideProps,
  ShoppingBag,
  ShoppingCart,
  User,
  UserRound,
} from "lucide-react";

export type Stat = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  title: string;
  amount: number;
  percentage?: number;
};

export default function AdminPage() {
  const { isLoading, adminDashboardAnalytics, adminDashboardAnalyticsError } =
    useAdminDashboardAnalytics();

  const analytics = adminDashboardAnalytics;

  const totalProduct = analytics?.data?.totalProducts;

  const totalUser = analytics?.data?.totalUsers;

  const totalVendors = analytics?.data?.totalVendors;

  const totalPendingOrders = analytics?.data?.totalPendingOrders;

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
      icon: User,
      iconBg: "#CFE7DC",
      iconBorder: "#E7F4EE",
      iconColor: "#2E7D32",
      title: "Total Custormers",
      amount: totalUser,
    },
    {
      icon: UserRound,
      iconBg: "#FCDAD7",
      iconBorder: "#FEEDEC",
      iconColor: "#F04438",
      title: "Total Vendors",
      amount: totalVendors,
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

  // const categories = useAppSelector((state) => state.categories);

 
  if (isLoading) return <Loader />;
  return (
    <div>
      <DashboardSummary stats={stats} dashboardGrid="md:grid-cols-4" />
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
