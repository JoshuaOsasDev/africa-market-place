"use client";


import ProductHeading from "./productHeading";
import ProductGeneralInfo from "./ProductGeneralInfo";
import SearchAndFilterProduct from "./searchAndFilterProduct";
import ProductTableReactTable from "./ProductTable";
import { useAppSelector } from "@/redux/store";
import { useState } from "react";

export default function SetShowForm() {
  const [showForm, setshowForm] = useState(true)
/*   const showForm = useAppSelector((state) => state.showFormReducer.showForm); */
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
