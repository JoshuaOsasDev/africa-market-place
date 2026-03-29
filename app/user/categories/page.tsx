// import CategoryComp from "@/components/pageComponents/user/categories/categoryComp";
// import CategorySideBar from "@/components/pageComponents/user/categories/categorySideBar";

// function page() {
//   return (
//     <div className="grid min-h-screen grid-cols-[20rem_1fr]">
//       <aside className="h-full">
//         <CategorySideBar />
//       </aside>
//       <div className="">
//         <CategoryComp />
//       </div>
//     </div>
//   );
// }

// export default page;

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CategoryComp from "@/components/pageComponents/user/categories/categoryComp";
import CategorySideBar from "@/components/pageComponents/user/categories/categorySideBar";
import { useCategory } from "@/lib/hooks/useCategory";
import { useAppSelector } from "@/redux/store";
import { CategoriesData } from "@/types/categories";

function Page() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const { setSelectedCategory } = useCategory();
  const categories = useAppSelector((state) => state.categories);
  const categoriesData = categories?.categories as CategoriesData;

  // Set category from URL parameter
  useEffect(() => {
    if (categoryId && categoriesData?.category) {
      const category = categoriesData.category.find(
        (cat) => cat._id === categoryId,
      );
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [categoryId, categoriesData, setSelectedCategory]);

  return (
    <div className="grid min-h-screen md:grid-cols-[20rem_1fr]">
      <aside className="h-full">
        <CategorySideBar />
      </aside>
      <div className="">
        <CategoryComp />
      </div>
    </div>
  );
}

export default Page;
