import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

import {
  clearSession,
  getAccessToken,
  getSession,
  setAccessToken,
} from "../session";

jest.mock("iron-session", () => ({
  getIronSession: jest.fn(),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("Session Management", () => {
  let mockSession: any;

  beforeEach(() => {
    mockSession = {
      accessToken: null,
      requestId: null,
      save: jest.fn(),
      destroy: jest.fn(),
    };

    (getIronSession as jest.Mock).mockResolvedValue(mockSession);

    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    });
  });

  it("getSession should return session object", async () => {
    const session = await getSession();
    expect(session).toBe(mockSession);
  });

  it("setAccessToken should store accessToken and save session", async () => {
    await setAccessToken("mockAccessToken");

    expect(mockSession.accessToken).toBe("mockAccessToken");
    expect(mockSession.save).toHaveBeenCalled();
  });

  it("getAccessToken should return stored access token", async () => {
    mockSession.accessToken = "mockAccessToken";

    const token = await getAccessToken();
    expect(token).toBe("mockAccessToken");
  });

  it("getAccessToken should return null if no token is stored", async () => {
    mockSession.accessToken = null;

    const token = await getAccessToken();
    expect(token).toBeNull();
  });

  it("clearSession should destroy the session", async () => {
    await clearSession();

    expect(mockSession.destroy).toHaveBeenCalled();
    expect(mockSession.save).toHaveBeenCalled();
  });
});
