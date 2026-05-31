"use client";

import ProductHeading from "./productHeading";
import ProductGeneralInfo from "./productGeneralInfo";
import SearchAndFilterProduct from "./searchAndFilterProduct";
import ProductTableReactTable from "./productTableReactTable.tsx";
import { useAppSelector } from "@/redux/store";
import Loader from "@/components/common/loader";
import {
  useDeleteVendorProduct,
  useVendorProducts,
} from "@/lib/hooks/vendorDashboard/useVendor";
import NoOrder from "../order/noOrder";
import { useSearchParams } from "next/navigation";

export default function SetShowForm() {
  const show = useAppSelector((state) => state.showFormReducer.show);
  const type = useAppSelector((state) => state.showFormReducer.type);

  //pagination
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const params = { page: page, limit: limit };
  const { isLoading, vendorProducts, vendorProductsError } =
    useVendorProducts(params);

  const { mutate: deleteProduct, isPending } = useDeleteVendorProduct();
  console.log(vendorProducts?.products.data, "vendor products data");
  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && vendorProducts?.products.data?.length <= 0)
    return (
      <NoOrder
        show={true}
        type={"product"}
        showFormNoOrder={show && type === "Product"}
        productForm={<ProductGeneralInfo type="Product" />}
      />
    );

  if (vendorProductsError) {
    return <div className="m-auto text-red-400">Error loading products</div>;
  }
  return (
    <>
      {show && type === "product" ? (
        <>
          <ProductHeading
            showid={true}
            type="Product"
            name="Add Product"
            id=""
          />
          <ProductGeneralInfo type="product" shop={vendorProducts?.shop.data} />
        </>
      ) : (
        <>
          <ProductHeading
            name="Add Product"
            id="productId"
            showid={true}
            type="Product"
          />
          <SearchAndFilterProduct />
          <ProductTableReactTable
            products={vendorProducts?.products.data}
            totalPages={vendorProducts?.products?.total}
            isPending={isPending}
          />
        </>
      )}
    </>
  );
}
