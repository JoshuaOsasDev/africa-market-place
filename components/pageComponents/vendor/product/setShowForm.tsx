"use client";

import ProductHeading from "./productHeading";
import ProductGeneralInfo from "./ProductGeneralInfo";
import SearchAndFilterProduct from "./searchAndFilterProduct";
import ProductTableReactTable from "./productTableReactTable.tsx";
import { useAppSelector } from "@/redux/store";

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
