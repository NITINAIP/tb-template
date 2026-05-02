"use client";

import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";

import { loginRequest, msalConfig } from "@/msalConfig";
import { ComponentProps } from "@/utils/types";

import MsalHandler from "./MsalHandler";
const pca = new PublicClientApplication(msalConfig);
export const AuthProvider = ({ children }: ComponentProps) => {
  return (
    <MsalProvider instance={pca}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={loginRequest}
      >
        <MsalHandler>{children}</MsalHandler>
      </MsalAuthenticationTemplate>
    </MsalProvider>
  );
};
