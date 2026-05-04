"use client";

import { styled } from "@mui/material";

export const Title = styled("div")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "600",
  lineHeight: 1.43,
  fontStyle: "normal",
  color: theme.palette.secondary.main
}));
export const SubTitle = styled("div")(({ theme }) => ({
  fontSize: "16",
  fontWeight: "400",
  lineHeight: 1.5,
  fontStyle: "normal",
  color: theme.palette.secondary.main
}));
