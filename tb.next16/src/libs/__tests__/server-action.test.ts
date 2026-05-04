/**
 * @jest-environment node
 */

import { setToken } from "../server-action";
import { setAccessToken } from "../session";

jest.mock("../session", () => ({
  setAccessToken: jest.fn(),
  clearSession: jest.fn(),
}));

describe("setToken", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls setAccessToken when access_token is provided", async () => {
    const fakeToken = "fake-jwt-token";

    await setToken(fakeToken);

    expect(setAccessToken).toHaveBeenCalledWith(fakeToken);
  });
});
