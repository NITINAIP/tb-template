import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID_FOR_WACC ?? "",
    authority: process.env.NEXT_PUBLIC_AUTHORITY_FOR_WACC,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI_FOR_WACC,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    // `${process.env.NEXT_PUBLIC_RESOURCE_ID}/.default`
    `${process.env.NEXT_PUBLIC_RESOURCE_ID}/tni.dataservice.Write`,
    `${process.env.NEXT_PUBLIC_RESOURCE_ID}/tni.dataservice.Read`,
  ],
};
