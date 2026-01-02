"use client";
import { store } from "@/redux2/store/store";
import React from "react";
import { Provider } from "react-redux";

interface layoutProp {
  children: React.ReactNode;
}

function ReduxProvider({ children }: layoutProp) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
