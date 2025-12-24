import DashboardCharts from "@/components/pageComponents/vendorComp/dashboard/DashboardCharts";
import DashboardFilter from "@/components/pageComponents/vendorComp/dashboard/dashboardFilter";
import DashboardSalesAndProduct from "@/components/pageComponents/vendorComp/dashboard/dashboardSalesAndProduct";
import DashboardSummary from "@/components/pageComponents/vendorComp/dashboard/dashboardSumarry";
import { Suspense } from "react";

const dashboardPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <DashboardFilter />
        <DashboardSummary />
        <DashboardCharts />
        <DashboardSalesAndProduct />
      </Suspense>
    </div>
  );
};

export default dashboardPage;
