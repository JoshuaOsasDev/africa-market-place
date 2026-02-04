"use client";
import Loader from "@/components/common/loader";
import { useAllCategories } from "@/lib/hooks/adminDashboardApi/useAdmin";
import { useGetUserWishlist } from "@/lib/hooks/userDashboard/useUser";
import { setCategories } from "@/redux/slices/categories";
import { setWishlistAction } from "@/redux/slices/wishlist";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function ToastProvider({ children }: { children: React.ReactNode }) {
  //const loading = useAppSelector((state) => state.user?.loading);
  const { loading } = useAppSelector((state) => state.user);
  const [enabled, setEnabled] = useState(false);
  const dispatch = useAppDispatch();
  const { allCategories } = useAllCategories(enabled);
  const { userWishlist } = useGetUserWishlist();

  useEffect(() => {
    if (allCategories?.length > 0) return;
    if (allCategories) {
      dispatch(setCategories(allCategories));
    }

    if (userWishlist) {
      dispatch(setWishlistAction(userWishlist));
    }
    setEnabled(true);

    return () => setEnabled(false);
  }, [dispatch, allCategories, userWishlist]);
  // console.log(allCategories, "all cat");
  return (
    <>
      <Toaster position={"top-center"} />
      {loading && <Loader />}
      {children}
    </>
  );
}

export default ToastProvider;
