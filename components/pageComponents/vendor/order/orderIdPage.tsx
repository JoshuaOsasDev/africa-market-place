"use client";
import { useVendorOrderSlug } from "@/lib/hooks/vendorDashboard/useVendor";
import ProductDetailsButton from "@/components/pageComponents/vendor/product/productDetailsButton";
import ProductLinkNav from "@/components/pageComponents/vendor/product/productLinkNav";
import OrderManagementUI from "./orderDetails";
import Loader from "@/components/common/loader";
export default function OrderIdPage(ordersId: { ordersId: string }) {
  const { data: order, isLoading } = useVendorOrderSlug(ordersId.ordersId);

  // console.log(order, "order details");
  if (isLoading) return <Loader />;
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
