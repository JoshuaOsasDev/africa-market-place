"use client";
import Loader from "@/components/common/loader";
import { useAllCategories } from "@/lib/hooks/adminDashboardApi/useAdmin";
import { setCategories } from "@/redux/slices/categories";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function ToastProvider({ children }: { children: React.ReactNode }) {
  //const loading = useAppSelector((state) => state.user?.loading);
  const { loading } = useAppSelector((state) => state.user);
  const [enabled, setEnabled] = useState(false);
  const dispatch = useAppDispatch();
  const { allCategories } = useAllCategories(enabled);

  useEffect(() => {
    if (allCategories?.length > 0) return;
    if (allCategories) {
      dispatch(setCategories(allCategories));
    }
    setEnabled(true);

    return () => setEnabled(false);
  }, [dispatch, allCategories]);
  console.log(allCategories, "all cat");
  return (
    <>
      <Toaster position={"top-center"} />
      {loading && <Loader />}
      {children}
    </>
  );
}

export default ToastProvider;
