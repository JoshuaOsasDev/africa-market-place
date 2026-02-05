"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { Category, CategoriesData } from "@/types/categories";
import { useAppSelector } from "@/redux/store";

interface CategoryContextType {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const categories = useAppSelector((state) => state.categories);
  const categoriesData = categories?.categories as CategoriesData;

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  // ✅ Set first category ONCE when categories load
  useEffect(() => {
    if (!selectedCategory && categoriesData?.category?.length > 0) {
      setSelectedCategory(categoriesData.category[0]);
    }
  }, [categoriesData, selectedCategory]);

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
