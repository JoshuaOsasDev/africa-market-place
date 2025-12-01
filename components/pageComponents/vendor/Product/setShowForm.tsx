"use client";
import ProductHeading from "./productHeading";
import ProductTable from "./productTable";
import SearchAndFilterProduct from "./searchAndFilterProduct";
import ProductGeneralInfo from "./ProductGeneralInfo";
import { useAppSelector } from "@/redux/store/store";

export default function SetShowForm() {
  const showForm = useAppSelector((state) => state.showFormReducer.showForm);
  return (
    <>
      {/* {!showForm && (
        <>
          <ProductHeading />
          <SearchAndFilterProduct />
        </>
      )}

      {showForm && <ProductTable />} */}

      {showForm ? (
        <>
          <ProductHeading />
          <ProductGeneralInfo />
        </>
      ) : (
        <>
          <ProductHeading />
          <SearchAndFilterProduct />
          <ProductTable ITEMS_PER_PAGE={5} />
        </>
      )}
    </>
  );
}
