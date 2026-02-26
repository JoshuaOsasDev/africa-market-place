// components/pageComponents/user/categories/categorySideBar.tsx
"use client";

import { useCategory } from "@/lib/hooks/useCategory";
import { useAppSelector } from "@/redux/store";
import { CategoriesData, Category } from "@/types/categories";
import { useEffect } from "react";

export default function CategorySideBar() {
  const categories = useAppSelector((state) => state.categories);
  const categoriesData = categories?.categories as CategoriesData;
  const { selectedCategory, setSelectedCategory } = useCategory();

  // Set first category as active on mount
  // useEffect(() => {
  //   if (categoriesData?.category?.[0] && !selectedCategory) {
  //     setSelectedCategory(categoriesData.category[0]);
  //   }
  // }, [categoriesData, selectedCategory, setSelectedCategory]);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <aside className="col-span-3 p-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-500">Categories</h2>
      <nav className="space-y-2">
        {categoriesData?.category.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category)}
            className={`w-full rounded-lg px-4 py-3 text-left transition-all duration-200 ${
              selectedCategory?._id === category._id
                ? "bg-[#2E7D32] font-semibold text-white shadow-lg"
                : "bg-gray-300 text-gray-700 hover:bg-[#2E7D32] hover:text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
