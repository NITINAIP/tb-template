"use client";

import { Box, styled } from "@mui/material";
import React, { ReactNode } from "react";

interface WhiteCardProps {
  children: ReactNode;
  gap?: string;
  maxWidth?: string | number;
  width?: string | number;
}

interface StyledProps {
  gap?: string;
  maxWidth?: string | number;
  width?: string | number;
}

const CardContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !["gap", "maxWidth", "width"].includes(prop as string)
})<StyledProps>(({ theme, gap, maxWidth, width }) => ({
  backgroundColor: theme.palette.custom.white,
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  flexDirection: "column",
  padding: "20px",
  borderRadius: "8px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  border: `1px solid ${theme.palette.divider}`,
  gap: gap || "20px",
  maxWidth: maxWidth,
  width: width || "auto",

  [theme.breakpoints.down("md")]: {
    padding: "10px",
    width: "100%"
  }
}));

const WhiteCard = ({ children, gap, maxWidth, width }: WhiteCardProps) => {
  return (
    <CardContainer gap={gap} maxWidth={maxWidth} width={width}>
      {children}
    </CardContainer>
  );
};

export default WhiteCard;
