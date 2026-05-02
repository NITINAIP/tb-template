import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/utils/types";
export type User = {
  accessToken: string;
  userInfo: {
    menuPermission?: { [key: string]: boolean };
    userDetail: {
      roles: string[];
      titleName: string;
      firstName: string;
      lastName: string;
      fullName: string;
    };
  };
};
const initialState: User = {
  accessToken: "",
  userInfo: {
    userDetail: {
      roles: [],
      titleName: "",
      firstName: "",
      lastName: "",
      fullName: ""
    }
  }
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfoStore: (state) => {
      Object.assign(state, initialState);
    }
  }
});
export const selectIsAuthen = (stage: RootState) => !!stage.userauth.accessToken;
export const { setUserInfo, clearUserInfoStore, setAccessToken } =
  userSlice.actions;
export default userSlice.reducer;
