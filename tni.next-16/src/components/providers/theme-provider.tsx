"use client";
import { ThemeProvider } from "@mui/material";

import { theme } from "@/styled/theme";
import { ComponentProps } from "@/utils/types";
export const PrimaryTheme = ({ children }: ComponentProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
