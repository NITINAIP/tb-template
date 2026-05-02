"use client";

import theme from "@/lib/theme";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

export const ClientRootLayout = ({ children }: any) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isClient) setIsClient(true);
  }, []);
  if (!isClient) return null;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
