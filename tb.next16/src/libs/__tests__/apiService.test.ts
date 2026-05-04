import apiService, { apiServicesInterceptors } from "../apiService";
import { axiosInstance } from "../axios";
import { getAccessToken } from "../session";

jest.mock("../axios", () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
  };
  return {
    axiosInstance: mockAxiosInstance,
  };
});

jest.mock("../session", () => ({
  getAccessToken: jest.fn(),
}));

describe("apiService", () => {
  const mockedAxiosInstance = axiosInstance as jest.Mocked<
    typeof axiosInstance
  >;
  const mockedGetAccessToken = getAccessToken as jest.MockedFunction<
    typeof getAccessToken
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("apiServicesInterceptors", () => {
    it("should add Authorization header if token exists", async () => {
      mockedGetAccessToken.mockResolvedValue("test-token");
      const config = { headers: {} } as any;
      const result = await apiServicesInterceptors(config);
      expect(result.headers.Authorization).toBe("Bearer test-token");
    });

    it("should not add Authorization header if token does not exist", async () => {
      mockedGetAccessToken.mockResolvedValue(null);
      const config = { headers: {} } as any;
      const result = await apiServicesInterceptors(config);
      expect(result.headers.Authorization).toBeUndefined();
    });

    it("should return the original config if no token", async () => {
      mockedGetAccessToken.mockResolvedValue(null);
      const config = { headers: { "X-Custom": "value" }, url: "/test" } as any;
      const result = await apiServicesInterceptors(config);
      expect(result).toEqual(config);
    });
  });

  describe("GET method", () => {
    it("should make a GET request with correct URL and headers", async () => {
      const mockResponse = { data: { data: "test data" } };
      mockedAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiService.get({ url: "/test" });

      expect(mockedAxiosInstance.get).toHaveBeenCalledWith("/test", {
        params: undefined,
        headers: { "Content-Type": "application/json" },
        config: undefined,
      });
      expect(result).toEqual("test data");
    });

    it("should include token in Authorization header if provided", async () => {
      const mockResponse = { data: { data: "test data" } };
      mockedAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiService.get({
        url: "/test",
        token: "specific-token",
      });

      expect(mockedAxiosInstance.get).toHaveBeenCalledWith("/test", {
        params: undefined,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer specific-token",
        },
        config: undefined,
      });
      expect(result).toEqual("test data");
    });

    it("should include custom headers and params", async () => {
      const mockResponse = { data: { data: "test data" } };
      mockedAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiService.get({
        url: "/test",
        params: { id: 123 },
        headers: { "X-Custom-Header": "custom" },
      });

      expect(mockedAxiosInstance.get).toHaveBeenCalledWith("/test", {
        params: { id: 123 },
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": "custom",
        },
        config: undefined,
      });
      expect(result).toEqual("test data");
    });

    it("should handle API errors", async () => {
      const mockError = new Error("Network Error");
      mockedAxiosInstance.get.mockRejectedValue(mockError);

      await expect(apiService.get({ url: "/error" })).rejects.toThrow(
        "Network Error",
      );
    });
  });

  describe("POST method", () => {
    const postData = { name: "test" };

    it("should make a POST request with correct URL, data and headers", async () => {
      const mockResponse = { data: { data: "created data" } };
      mockedAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await apiService.post({ url: "/test", data: postData });

      expect(mockedAxiosInstance.post).toHaveBeenCalledWith("/test", postData, {
        headers: { "Content-Type": "application/json" },
        config: undefined,
      });
      expect(result).toEqual("created data");
    });

    it("should include token in Authorization header for POST", async () => {
      const mockResponse = { data: { data: "created data" } };
      mockedAxiosInstance.post.mockResolvedValue(mockResponse);

      await apiService.post({
        url: "/test",
        data: postData,
        token: "post-token",
      });

      expect(mockedAxiosInstance.post).toHaveBeenCalledWith("/test", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer post-token",
        },
        config: undefined,
      });
    });

    it("should handle POST API errors", async () => {
      const mockError = new Error("Validation Error");
      mockedAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        apiService.post({ url: "/error", data: postData }),
      ).rejects.toThrow("Validation Error");
    });
  });

  describe("PUT method", () => {
    const putData = { id: 1, name: "updated" };

    it("should make a PUT request with correct URL, data and headers", async () => {
      const mockResponse = { data: { data: "updated data" } };
      mockedAxiosInstance.put.mockResolvedValue(mockResponse);

      const result = await apiService.put({ url: "/test/1", data: putData });

      expect(mockedAxiosInstance.put).toHaveBeenCalledWith("/test/1", putData, {
        headers: { "Content-Type": "application/json" },
        config: undefined,
      });
      expect(result).toEqual("updated data");
    });

    it("should include token in Authorization header for PUT", async () => {
      const mockResponse = { data: { data: "updated data" } };
      mockedAxiosInstance.put.mockResolvedValue(mockResponse);

      await apiService.put({
        url: "/test/1",
        data: putData,
        token: "put-token",
      });

      expect(mockedAxiosInstance.put).toHaveBeenCalledWith("/test/1", putData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer put-token",
        },
        config: undefined,
      });
    });

    it("should handle PUT API errors", async () => {
      const mockError = new Error("Update Error");
      mockedAxiosInstance.put.mockRejectedValue(mockError);

      await expect(
        apiService.put({ url: "/error/1", data: putData }),
      ).rejects.toThrow("Update Error");
    });
  });

  describe("DELETE method", () => {
    const deleteData = { id: 1 };

    it("should make a DELETE request with correct URL, data and headers", async () => {
      const mockResponse = { data: { data: "deleted data" } };
      mockedAxiosInstance.delete.mockResolvedValue(mockResponse);

      const result = await apiService.delete({
        url: "/test/1",
        data: deleteData,
      });

      expect(mockedAxiosInstance.delete).toHaveBeenCalledWith("/test/1", {
        data: deleteData,
        headers: { "Content-Type": "application/json" },
        config: undefined,
      });
      expect(result).toEqual("deleted data");
    });

    it("should include token in Authorization header for DELETE", async () => {
      const mockResponse = { data: { data: "deleted data" } };
      mockedAxiosInstance.delete.mockResolvedValue(mockResponse);

      await apiService.delete({
        url: "/test/1",
        data: deleteData,
        token: "delete-token",
      });

      expect(mockedAxiosInstance.delete).toHaveBeenCalledWith("/test/1", {
        data: deleteData,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer delete-token",
        },
        config: undefined,
      });
    });

    it("should handle DELETE API errors", async () => {
      const mockError = new Error("Delete Error");
      mockedAxiosInstance.delete.mockRejectedValue(mockError);

      await expect(
        apiService.delete({ url: "/error/1", data: deleteData }),
      ).rejects.toThrow("Delete Error");
    });
  });
});
