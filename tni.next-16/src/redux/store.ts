"use client";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import { loadFromSessionStorage, saveToSessionStorage } from "./sessionStorage";

const preloadedState = loadFromSessionStorage();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
store.subscribe(() => {
  const { auth } = store.getState();
  saveToSessionStorage({ auth });
});
