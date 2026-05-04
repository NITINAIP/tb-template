import { AxiosInstance } from "axios";

import { openDialog } from "@/redux/slices/dialogSlice";
import { closeLoader, openLoader } from "@/redux/slices/loaderSlice";
import { store } from "@/redux/store";

import { axiosServerInstance } from "../axios";
import { nextApi } from "../nextApi";

jest.mock("@/redux/store", () => ({
  store: {
    dispatch: jest.fn(),
  },
}));

jest.mock("../axios", () => ({
  axiosServerInstance: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedAxios = axiosServerInstance as jest.Mocked<AxiosInstance>;

describe("apiService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET method", () => {
    it("should make a GET request and return data", async () => {
      const mockResponse = { data: { message: "success" } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const url = "test-endpoint";
      const result = await nextApi.get({ url });

      expect(store.dispatch).toHaveBeenCalledWith(openLoader());
      expect(axiosServerInstance.get).toHaveBeenCalledWith(url, {
        params: {},
        headers: { "Content-Type": "application/json" },
      });
      expect(store.dispatch).toHaveBeenCalledWith(closeLoader());
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Network Error");
      mockedAxios.get.mockRejectedValue(mockError);

      const url = "test-endpoint";

      await expect(nextApi.get({ url })).rejects.toThrow("Network Error");

      expect(store.dispatch).toHaveBeenCalledWith(openLoader());
      expect(store.dispatch).toHaveBeenCalledWith(
        openDialog({ status: "error", content: "Network Error" }),
      );
      expect(store.dispatch).toHaveBeenCalledWith(closeLoader());
    });
  });

  describe("POST method", () => {
    it("should make a POST request and return data", async () => {
      const mockResponse = { data: { success: true } };
      mockedAxios.post.mockResolvedValue(mockResponse);

      const url = "submit-data";
      const data = { key: "value" };
      const result = await nextApi.post({ url, data });

      expect(store.dispatch).toHaveBeenCalledWith(openLoader());
      expect(axiosServerInstance.post).toHaveBeenCalledWith(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      expect(store.dispatch).toHaveBeenCalledWith(closeLoader());
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Request Failed");
      mockedAxios.post.mockRejectedValue(mockError);

      const url = "submit-data";
      const data = { key: "value" };

      await expect(nextApi.post({ url, data })).rejects.toThrow(
        "Request Failed",
      );

      expect(store.dispatch).toHaveBeenCalledWith(openLoader());
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "dialog/openDialog",
          payload: expect.objectContaining({
            status: "error",
            content: "Request Failed",
          }),
        }),
      );
      expect(store.dispatch).toHaveBeenCalledWith(closeLoader());
    });
  });

  describe("PUT method", () => {
    it("should make a PUT request and return data", async () => {
      const mockResponse = { data: { success: true } };
      mockedAxios.put.mockResolvedValue(mockResponse);

      const url = "submit-data";
      const data = { key: "value" };
      const result = await nextApi.put({ url, data });

      expect(store.dispatch).toHaveBeenCalledWith(openLoader());
      expect(axiosServerInstance.put).toHaveBeenCalledWith(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      expect(store.dispatch).toHaveBeenCalledWith(closeLoader());
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Request Failed");
      mockedAxios.put.mockRejectedValue(mockError);

      const url = "submit-data";
      const data = { key: "value" };

      await expect(nextApi.put({ url, data })).rejects.toThrow(
        "Request Failed",
      );

      expect(store.dispatch).toHaveBeenCalledWith(openLoader());
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "dialog/openDialog",
          payload: expect.objectContaining({
            status: "error",
            content: "Request Failed",
          }),
        }),
      );
      expect(store.dispatch).toHaveBeenCalledWith(closeLoader());
    });
  });

  describe("DELETE method", () => {
    it("should make a DELETE request and return data", async () => {
      const mockResponse = { data: { success: true } };
      mockedAxios.delete.mockResolvedValue(mockResponse);

      const url = "submit-data";
      const data = { key: "value" };
      const result = await nextApi.delete({ url, data });

      expect(store.dispatch).toHaveBeenCalledWith(openLoader());
      expect(axiosServerInstance.delete).toHaveBeenCalledWith(url, {
        data,
        headers: { "Content-Type": "application/json" },
      });
      expect(store.dispatch).toHaveBeenCalledWith(closeLoader());
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle errors", async () => {
      const mockError = new Error("Request Failed");
      mockedAxios.delete.mockRejectedValue(mockError);

      const url = "submit-data";
      const data = { key: "value" };

      await expect(nextApi.delete({ url, data })).rejects.toThrow(
        "Request Failed",
      );

      expect(store.dispatch).toHaveBeenCalledWith(openLoader());
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "dialog/openDialog",
          payload: expect.objectContaining({
            status: "error",
            content: "Request Failed",
          }),
        }),
      );
      expect(store.dispatch).toHaveBeenCalledWith(closeLoader());
    });
  });
});
