import { CategoryContext } from "@/components/pageComponents/user/categories/categoryContext";
import { useContext } from "react";

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}
