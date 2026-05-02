import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    openLoader: (state) => {
      state.open = true;
    },
    closeLoader: (state) => {
      state.open = false;
    }
  }
});

export const { openLoader, closeLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
