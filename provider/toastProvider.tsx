"use client";
import Loader from "@/components/common/loader";
import { useAllCategories } from "@/lib/hooks/adminDashboardApi/useAdmin";
import {
  useGetCart,
  useGetUserWishlist,
} from "@/lib/hooks/userDashboard/useUser";
import { setCategories } from "@/redux/slices/categories";
import { addCart, getCart, setCart } from "@/redux/slices/product";
import { setWishlistAction } from "@/redux/slices/wishlist";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function ToastProvider({ children }: { children: React.ReactNode }) {
  //const loading = useAppSelector((state) => state.user?.loading);
  const { loading } = useAppSelector((state) => state.user);
  const user = useAppSelector((state) => state.user);
  const { userWishlist } = useGetUserWishlist();
  const { userCart } = useGetCart();
  const dispatch = useAppDispatch();

  const shouldFetch =
    user?.user?.role === "user" || user?.user?.role === "vendor";
  const { allCategories } = useAllCategories();
  useEffect(() => {
    if (allCategories?.length > 0) return;
    if (allCategories) {
      dispatch(setCategories(allCategories));
    }

    if (user?.user?.role === "user") {
      if (userWishlist) {
        dispatch(setWishlistAction(userWishlist));
      }

      if (userCart) {
        dispatch(setCart(userCart?.data?.items));
      }
    }
  }, [dispatch, allCategories, user?.user?.role, userCart, userWishlist]);
  // console.log(userCart?.data.items, "all cat");
  return (
    <>
      <Toaster position={"top-center"} />
      {loading && <Loader />}
      {children}
    </>
  );
}

export default ToastProvider;
