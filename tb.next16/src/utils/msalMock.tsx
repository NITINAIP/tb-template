import { MsalContext } from "@azure/msal-react";
import React from "react";

export const mockAccountInfo = {
  username: "test@example.com",
  homeAccountId: "test-home-account-id",
  environment: "test",
  tenantId: "tenant",
  localAccountId: "local"
};

export const MsalProviderMock: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const msalContext = {
    instance: {
      acquireTokenSilent: jest
        .fn()
        .mockResolvedValue({ accessToken: "mock-token" }),
      loginRedirect: jest.fn(),
      loginPopup: jest.fn(),
      getAllAccounts: () => [mockAccountInfo],
      getActiveAccount: () => mockAccountInfo
    },
    accounts: [mockAccountInfo],
    inProgress: "none",
    logger: console,
    interactionStatus: "None"
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <MsalContext.Provider value={msalContext as any}>
      {children}
    </MsalContext.Provider>
  );
};
