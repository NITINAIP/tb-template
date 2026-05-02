/**
 * @jest-environment jsdom
 */
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../rootReducer";
import { loadFromSessionStorage } from "../sessionStorage";

jest.mock("../sessionStorage", () => ({
  loadFromSessionStorage: jest.fn(),
  saveToSessionStorage: jest.fn(),
}));

describe("Redux store with sessionStorage persistence", () => {
  let loadFromSessionStorageMock: jest.Mock;

  loadFromSessionStorageMock = loadFromSessionStorage as unknown as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with preloadedState from sessionStorage", () => {
    loadFromSessionStorageMock.mockReturnValue({
      auth: { userData: { username: "tester" } },
    });

    const store = configureStore({
      reducer: rootReducer,
      preloadedState: loadFromSessionStorage(),
    });

    expect(store.getState().auth.userData.username).toBe("tester");
  });
});
