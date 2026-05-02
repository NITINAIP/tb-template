import { ReactNode } from "react";

import rootReducer from "@/redux/rootReducer";
import { store } from "@/redux/store";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type ComponentProps = { children: ReactNode };
export interface Option {
  label: string;
  value: string;
}

export type OptionCommon = Option & {
  code?: string;
  name?: string;
  id: string;
};
export interface KeyValue {
  key?: string;
  value?: string;
}

export interface PageLimit {
  page?: number;
  limit?: number;
}

export interface TableOrder {
  column?: string;
  direction?: string;
}
