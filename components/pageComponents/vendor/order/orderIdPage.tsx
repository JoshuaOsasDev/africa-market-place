"use client";
import { useVEndorOrderSlug } from "@/lib/hooks/vendorDashboard/useVendor";
import ProductDetailsButton from "../product/productDetailsButton";
import ProductLinkNav from "../product/productLinkNav";
import OrderDetails from "./orderDetails";
import { getvendorOrderSlug } from "@/services/apiServices/vendorDashboard";
import OrderManagementUI from "./orderDetails";
export default function OrderIdPage(ordersId: { ordersId: string }) {
  const {
    data: order,
    isLoading,
    error,
  } = useVEndorOrderSlug(ordersId.ordersId);

  // console.log(order, "order details");
  return (
    <div>
      <div className="hidden items-end justify-between md:flex">
        <div className="flex flex-col gap-2">
          <h1 className="hidden text-2xl leading-8 font-medium tracking-[0.5%] text-[#333843] md:block">
            Orders Details
          </h1>
          <ProductLinkNav name="Orders" id={ordersId.ordersId} />
        </div>
        <ProductDetailsButton />
      </div>
      <OrderManagementUI order={order?.data} />
    </div>
  );
}
