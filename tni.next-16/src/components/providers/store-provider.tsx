"use client";

import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { ComponentProps } from "@/utils/types";

export const StoreProvider = ({ children }: ComponentProps) => {
  return <Provider store={store}>{children}</Provider>;
};
