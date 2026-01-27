"use client";
import SetShowForm from "@/components/pageComponents/vendor/product/setShowForm";
import { useAllCategories } from "@/lib/hooks/adminDashboardApi/useAdmin";
import { setCategories } from "@/redux/slices/categories";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";

const ProductPage = () => {
  // const dispatch = useAppDispatch();
  // const { allCategories } = useAllCategories();
  // console.log(allCategories, "all cat");

  // useEffect(() => {
  //   if (allCategories) {
  //     dispatch(setCategories(allCategories));
  //   }
  // }, [allCategories, dispatch]);

  return (
    <div>
      <SetShowForm />
    </div>
  );
};

export default ProductPage;
