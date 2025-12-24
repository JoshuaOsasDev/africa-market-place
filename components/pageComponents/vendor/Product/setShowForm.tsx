"use client";

import { useAppSelector } from "@/redux/store/store";
import ProductTableReactTable from "./productTableReactTable";
import ProductHeading from "./productHeading";
import ProductGeneralInfo from "./ProductGeneralInfo";
import SearchAndFilterProduct from "./searchAndFilterProduct";

export default function SetShowForm() {
  const showForm = useAppSelector((state) => state.showFormReducer.showForm);
  return (
    <>
      {showForm ? (
        <>
          <ProductHeading />
          <ProductGeneralInfo />
        </>
      ) : (
        <>
          <ProductHeading />
          <SearchAndFilterProduct />
          <ProductTableReactTable ITEMS_PER_PAGE={5} />
        </>
      )}
    </>
  );
}
