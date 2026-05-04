"use client";

import { useEffect, useState } from "react";

import { ComponentProps } from "@/utils/types";

import { AuthProvider } from "./auth-provider";
import { StoreProvider } from "./store-provider";
import { PrimaryTheme } from "./theme-provider";
type TRootProvider = {
  sessionSecret: string;
};
export const RootProvider = ({
  children,
  sessionSecret,
}: ComponentProps & TRootProvider) => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isClient) setClient(true);
  }, []);
  if (!isClient) return null;
  console.log(sessionSecret);
  return (
    <StoreProvider>
      {/* <AuthProvider> */}
      <PrimaryTheme>{children}</PrimaryTheme>
      {/* </AuthProvider> */}
    </StoreProvider>
  );
};
