"use client";
import { combineReducers } from "@reduxjs/toolkit";

import dialogReducer from "./slices/dialogSlice";
import loaderReducer from "./slices/loaderSlice";
import navbarReducer from "./slices/navbarSlice";
import userAuthReducer from "./slices/userAuthSlice";

const rootReducer = combineReducers({
  dialog: dialogReducer,
  loader: loaderReducer,
  navbar: navbarReducer,
  auth: userAuthReducer,
});

export default rootReducer;
