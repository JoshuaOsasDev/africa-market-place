import DashboardCharts from "@/components/pageComponents/vendor/dashboard/DashboardCharts";
import DashboardFilter from "@/components/pageComponents/vendor/dashboard/dashboardFilter";
import DashboardSalesAndProduct from "@/components/pageComponents/vendor/dashboard/dashboardSalesAndProduct";
import DashboardSummary from "@/components/pageComponents/vendor/dashboard/dashboardSumarry";

const dashboardPage = () => {
  return (
    <div>
      <DashboardFilter />
      <DashboardSummary />
      <DashboardCharts />
      <DashboardSalesAndProduct />
    </div>
  );
};

export default dashboardPage;
