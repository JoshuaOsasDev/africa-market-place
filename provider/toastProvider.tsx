"use client";
import Loader from "@/components/common/loader";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { Toaster } from "react-hot-toast";

function ToastProvider({ children }: { children: React.ReactNode }) {
  //const loading = useAppSelector((state) => state.user?.loading);
  const { loading } = useAppSelector((state) => state.user);
  return (
    <>
      <Toaster position={"top-center"} />
      {loading && <Loader />}
      {children}
    </>
  );
}

export default ToastProvider;
