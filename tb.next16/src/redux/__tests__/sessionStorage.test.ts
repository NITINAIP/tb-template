/**
 * @jest-environment jsdom
 */

import {
  loadFromSessionStorage,
  saveToSessionStorage,
} from "../sessionStorage";

const APP_NAME_SESSION = "app_session";

describe("sessionStorage utils", () => {
  beforeEach(() => {
    const store: any = {};
    const mockStorage: any = {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, val) => {
        store[key] = val;
      }),
      removeItem: jest.fn((key) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        Object.keys(store).forEach((k) => delete store[k]);
      }),
    };

    Object.defineProperty(window, "sessionStorage", {
      value: mockStorage,
      writable: true,
    });
    jest.clearAllMocks();
  });

  describe("loadFromSessionStorage", () => {
    it("returns parsed state when data exists", () => {
      const state = { auth: { user: "test" } };
      window.sessionStorage.setItem(APP_NAME_SESSION, JSON.stringify(state));

      const result = loadFromSessionStorage();

      expect(result).toEqual(state);
      expect(window.sessionStorage.getItem).toHaveBeenCalledWith(
        APP_NAME_SESSION,
      );
    });

    it("returns undefined when no data exists", () => {
      window.sessionStorage.getItem.mockReturnValue(null);

      const result = loadFromSessionStorage();

      expect(result).toBeUndefined();
    });

    it("returns undefined when parsing fails", () => {
      window.sessionStorage.getItem.mockReturnValue("not-json");

      const result = loadFromSessionStorage();

      expect(result).toBeUndefined();
    });

    it("returns undefined in SSR (no window)", () => {
      const originalWindow = global.window;
      delete global.window;

      const result = loadFromSessionStorage();

      expect(result).toBeUndefined();

      global.window = originalWindow;
    });
  });

  describe("saveToSessionStorage", () => {
    it("saves state as JSON string", () => {
      const state = { auth: { user: "test" } };

      saveToSessionStorage(state);

      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
        APP_NAME_SESSION,
        JSON.stringify(state),
      );
    });

    it("does nothing when window is undefined", () => {
      const originalWindow = global.window;
      delete global.window;

      expect(() => saveToSessionStorage({ a: 1 })).not.toThrow();

      global.window = originalWindow;
    });

    it("handles exceptions gracefully", () => {
      window.sessionStorage.setItem.mockImplementation(() => {
        throw new Error("quota exceeded");
      });

      expect(() => saveToSessionStorage({ a: 1 })).not.toThrow();
    });
  });
});
