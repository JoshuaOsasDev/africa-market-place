"use client";
import { useVendorOrders } from "@/lib/hooks/vendorDashboard/useVendor";
import Loader from "@/components/common/loader";
import NoOrder from "@/components/pageComponents/vendor/order/noOrder";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ProductHeading from "@/components/pageComponents/vendor/product/productHeading";
import SearchAndFilterProduct from "@/components/pageComponents/vendor/product/searchAndFilterProduct";
import OrderItemsTable from "@/components/pageComponents/vendor/order/orderItemsTable";
import CreateShop from "@/components/pageComponents/vendor/order/createShop";
import { useSearchParams } from "next/navigation";

const OrderPage = () => {
  const show = useAppSelector((state) => state.showFormReducer.show);
  const type = useAppSelector((state) => state.showFormReducer.type);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const params = { page: page, limit: 10 };
  const { isLoading, vendorOrders, vendorOrdersError } =
    useVendorOrders(params);

  if (isLoading) return <Loader />;

  // console.log("Vendor Orders:", vendorOrders);

  //For Order not defined
  if (!isLoading && vendorOrders?.data?.length === 0)
    return (
      <NoOrder
        type="Order"
        show={true}
        showFormNoOrder={show && type === "Order"}
        productForm={<CreateShop type="Order" />}
      />
    );

  //For Shop not defined
  // if (!isLoading && !vendorOrders?.data?.shop)
  //   return (
  //     <NoOrder
  //       show={true}
  //       type="Shop"
  //       showFormNoOrder={show && type === "Shop"}
  //       productForm={<CreateShop type="Shop" />}
  //     />
  //   );

  return (
    <>
      {show && type === "Order" ? (
        <>
          <ProductHeading type="Order" showid={true} name="Orders" id="" />
          <CreateShop type="order" />
        </>
      ) : (
        <>
          <ProductHeading type="Order" showid={true} name="Orders" id="" />
          <SearchAndFilterProduct />
          <OrderItemsTable
            orders={vendorOrders?.data}
            totalPages={vendorOrders?.total}
          />
        </>
      )}
    </>
  );
};

export default OrderPage;
