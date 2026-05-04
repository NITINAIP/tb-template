/**
 * @jest-environment jsdom
 */
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../rootReducer";
import {
  loadFromSessionStorage,
  saveToSessionStorage,
} from "../sessionStorage";
import { store } from "../store";

jest.mock("../sessionStorage", () => ({
  loadFromSessionStorage: jest.fn(),
  saveToSessionStorage: jest.fn(),
}));

describe("Redux store with sessionStorage persistence", () => {
  let loadFromSessionStorageMock: jest.Mock,
    saveToSessionStorageMock: jest.Mock;
  loadFromSessionStorageMock = loadFromSessionStorage as unknown as jest.Mock;
  saveToSessionStorageMock = saveToSessionStorage as unknown as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with preloadedState from sessionStorage", () => {
    loadFromSessionStorageMock.mockReturnValue({
      auth: { accessToken: "tester" },
      listData: { roleList: ["role1"] },
    });

    const customStore = configureStore({
      reducer: rootReducer,
      preloadedState: loadFromSessionStorage(),
    });

    expect(customStore.getState().auth.accessToken).toBe("tester");
  });

  it("saves only auth and listData slices to sessionStorage on change", () => {
    loadFromSessionStorageMock.mockReturnValue(undefined);

    store.dispatch({
      type: "auth/setUserData",
      payload: { username: "newUser" },
    });
    store.dispatch({
      type: "listData/setRoleListData",
      payload: ["admin"],
    });

    expect(saveToSessionStorageMock).toHaveBeenCalledWith(
      expect.objectContaining({
        auth: expect.any(Object),
      }),
    );
    // It should not include unrelated slices like `navbar` or `endorsement`
    const savedState = saveToSessionStorageMock.mock.calls[0][0];
    expect(savedState).not.toHaveProperty("navbar");
    expect(savedState).not.toHaveProperty("endorsement");
  });
});
