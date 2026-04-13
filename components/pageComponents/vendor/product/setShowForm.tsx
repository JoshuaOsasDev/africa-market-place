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

export default function SetShowForm() {
  const show = useAppSelector((state) => state.showFormReducer.show);
  const type = useAppSelector((state) => state.showFormReducer.type);

  const { isLoading, vendorProducts, vendorProductsError } =
    useVendorProducts();

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
        showFormNoOrder={show && type === "product"}
        productForm={<ProductGeneralInfo type="product" />}
      />
    );

  if (vendorProductsError) {
    return <div className="m-auto text-red-400">Error loading products</div>;
  }
  return (
    <>
      {show && type === "product" ? (
        <>
          <ProductHeading showid={true} type="product" name="Product" id="" />
          <ProductGeneralInfo type="product" shop={vendorProducts?.shop.data} />
        </>
      ) : (
        <>
          <ProductHeading
            name="Product"
            id="productId"
            showid={true}
            type="product"
          />
          <SearchAndFilterProduct />
          <ProductTableReactTable
            products={vendorProducts?.products.data}
            ITEMS_PER_PAGE={5}
            isPending={isPending}
            onDelete={(slug) => deleteProduct(slug)}
          />
        </>
      )}
    </>
  );
}
