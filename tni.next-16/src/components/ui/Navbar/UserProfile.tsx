"use client";

import { useMsal } from "@azure/msal-react";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { nextApi } from "@/libs/nextApi";
import { clearUserInfoStore } from "@/redux/slices/userAuthSlice";
import { RootState } from "@/utils/types";

import {
  UserDetailContainer,
  UserName,
  UserPosition,
  UserProfileContainer,
} from "./Navbar.style";

const UserProfile = () => {
  const { instance, accounts } = useMsal();
  const dispatch = useDispatch();
  const { userDetail } = useSelector((s: RootState) => s.auth.userInfo);
  const logoutAction = async () => {
    dispatch(clearUserInfoStore());
    instance.logoutRedirect();
  };
  const handleLogout = async () => {
    logoutAction();
  };

  return (
    <UserProfileContainer>
      <UserDetailContainer>
        {/* <UserProfileIcon /> */}
        <div>
          <UserName>{accounts[0]?.name ?? ""}</UserName>
          <UserPosition>N/A</UserPosition>
        </div>
      </UserDetailContainer>
      <IconButton
        sx={{ height: "2.4rem", width: "2.4rem", alignSelf: "center" }}
        aria-label="Logout"
        data-testid="icon-logout"
        onClick={handleLogout}
      >
        <LogoutIcon />
      </IconButton>
    </UserProfileContainer>
  );
};

export default UserProfile;
