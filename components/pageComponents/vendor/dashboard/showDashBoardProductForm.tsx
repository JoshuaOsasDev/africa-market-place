"use client";
import DashboardCharts from "@/components/pageComponents/vendor/dashboard/DashboardCharts";
import DashboardFilter from "@/components/pageComponents/vendor/dashboard/dashboardFilter";
import DashboardSalesAndProduct from "@/components/pageComponents/vendor/dashboard/dashboardSalesAndProduct";
import DashboardSummary from "@/components/pageComponents/vendor/dashboard/dashboardSumarry";
import ProductGeneralInfo from "@/components/pageComponents/vendor/product/ProductGeneralInfo";
import { useAppSelector } from "@/redux/store";

export default function ShowDashBoardProductForm() {
  const showForm = useAppSelector((state) => state.showFormReducer.showForm);
  return (
    <>
      {showForm ? (
        <ProductGeneralInfo />
      ) : (
        <>
          <DashboardFilter />
          <DashboardSummary />
          <DashboardCharts />
          <DashboardSalesAndProduct />
        </>
      )}
    </>
  );
}
