import CategoryComp from "@/components/pageComponents/user/categories/categoryComp";
import CategorySideBar from "@/components/pageComponents/user/categories/categorySideBar";
import ProductCategory from "@/components/pageComponents/user/categories/productCategory";
import React from "react";

function page() {
  return (
    <div className="grid min-h-screen grid-cols-[20rem_1fr]">
      <aside className="h-full">
        <CategorySideBar />
      </aside>
      <div className="">
        <CategoryComp />
      </div>
    </div>
  );
}

export default page;
