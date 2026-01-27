"use client";
import DashboardCharts from "@/components/pageComponents/vendor/dashboard/DashboardCharts";
import DashboardFilter from "@/components/pageComponents/vendor/dashboard/dashboardFilter";
import DashboardSalesAndProduct from "@/components/pageComponents/vendor/dashboard/dashboardSalesAndProduct";
import DashboardSummary from "@/components/pageComponents/vendor/dashboard/dashboardSumarry";
import ProductGeneralInfo from "@/components/pageComponents/vendor/product/ProductGeneralInfo";
import { useAppSelector } from "@/redux/store";

export default function ShowDashBoardProductForm() {
  const show = useAppSelector((state) => state.showFormReducer.show);
  const type = useAppSelector((state) => state.showFormReducer.type);
  return (
    <>
      {show && type === "dashboardShow" ? (
        <ProductGeneralInfo type={"dashboardShow"} />
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
