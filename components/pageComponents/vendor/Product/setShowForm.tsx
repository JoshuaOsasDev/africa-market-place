"use client";

import { useAppSelector } from "@/redux2/store/store";
import ProductHeading from "./productHeading";
import ProductGeneralInfo from "./ProductGeneralInfo";
import SearchAndFilterProduct from "./searchAndFilterProduct";
import ProductTableReactTable from "./ProductTable";

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
