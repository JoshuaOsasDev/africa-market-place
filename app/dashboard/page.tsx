import DashboardCharts from "@/components/pageComponents/dashboard/DashboardCharts";
import DashboardFilter from "@/components/pageComponents/dashboard/dashboardFilter";
import DashboardSalesAndProduct from "@/components/pageComponents/dashboard/dashboardSalesAndProduct";
import DashboardSumarry from "@/components/pageComponents/dashboard/dashboardSumarry";

const dashboardPage = () => {
  return (
    <div>
      <DashboardFilter />
      <DashboardSumarry />
      <DashboardCharts />
      <DashboardSalesAndProduct />
    </div>
  );
};

export default dashboardPage;
