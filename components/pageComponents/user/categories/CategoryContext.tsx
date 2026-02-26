"use client";

import {
  createContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Category } from "@/types/categories";
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
  const categoriesData = categories?.categories;

  const initialCategory = useMemo(
    () => categoriesData?.category?.[0] || null,
    [categoriesData],
  );
  // Initialize with null, will be set by URL param or default
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    initialCategory || null,
  );

  const hasInitialized = useRef(false);

  // Auto-select first category on mount if none is selected
  useEffect(() => {
    if (
      !hasInitialized.current &&
      !selectedCategory &&
      categoriesData?.category?.[0]
    ) {
      // setSelectedCategory(categoriesData.category[0]);
      hasInitialized.current = true;
    }
  }, [categoriesData, selectedCategory]);

  // ✅ Set first category ONCE when categories load
  // useEffect(() => {
  //   if (!selectedCategory && categoriesData?.category?.length > 0) {
  //     setSelectedCategory(categoriesData.category[0]);
  //   }
  // }, [categoriesData, selectedCategory]);

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
