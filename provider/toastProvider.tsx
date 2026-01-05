"use client";
import Loader from "@/components/common/loader";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { Toaster } from "react-hot-toast";

function ToastProvider({ children }: { children: React.ReactNode }) {
    const { loading } = useAppSelector(state => state.user)
  const appState = useAppSelector(state => state)
  
  console.log("app store", appState)
 
  console.log("loading now", loading)

  
  return (
    <>
          <Toaster position={"top-center"} />
          { 
              loading &&  <Loader />
          } 
      {children}
    
    </>
  );
}

export default ToastProvider;
