import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    isOpened: true,
  },
  reducers: {
    openNavbar: (state) => {
      state.isOpened = true;
    },
    closeNavbar: (state) => {
      state.isOpened = false;
    },
  },
});

export const { openNavbar, closeNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
