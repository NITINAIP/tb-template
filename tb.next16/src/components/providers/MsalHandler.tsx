"use client";

import { useMsal } from "@azure/msal-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState, useTransition } from "react";
import { useDispatch } from "react-redux";

import { loginRequest } from "@/msalConfig";

const MsalHandler = ({ children }: { children: ReactNode }) => {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const pathName = usePathname();
  const [, startTransition] = useTransition();
  const dispatch = useDispatch();
  const router = useRouter();
  const executeMsal = async () => {
    try {
      const signedInUser = accounts[0];

      const msalRequest = {
        ...loginRequest,
        account: signedInUser,
      };

      const response = await instance.ssoSilent(msalRequest);
      fetchUserInfo(response.accessToken);
    } catch (error) {
      console.error("Error:", error);
      await instance.acquireTokenRedirect({
        ...loginRequest,
      });
    }
  };

  const fetchUserInfo = (accessToken: string) => {
    // startTransition(async () => {
    //   await setToken(accessToken);
    //   const result = await validateUserAccess();
    //   if (result) {
    //     dispatch(setAt(accessToken));
    //     setAccessToken(accessToken);
    //     if (pathName === "/") {
    //       router.push("/provinces");
    //     }
    //   }
    // });
  };

  useEffect(() => {
    if (accounts.length > 0) {
      executeMsal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);
  if (!accessToken) return null;
  return children;
};

export default MsalHandler;
