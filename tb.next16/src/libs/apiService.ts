import { InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";
import { getAccessToken } from "./session";

interface ApiRequestParams {
  url: string;
  token?: string | null;
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  config?: AxiosRequestConfig;
}

export const apiServicesInterceptors = async (
  config: InternalAxiosRequestConfig<any>,
) => {
  // console.log(`[${config?.method}]`, config?.baseURL, config.url); // Commented out for production readiness
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosInstance.interceptors.request.use(apiServicesInterceptors);

export interface ApiResponse<T> {
  data: T;
}

const createHeaders = (
  token: string | null | undefined,
  customHeaders?: Record<string, string>,
) => ({
  "Content-Type": "application/json",
  ...customHeaders,
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const apiService = {
  get: async <T>({
    url,
    token,
    params,
    headers,
    config,
  }: ApiRequestParams): Promise<T> => {
    try {
      const response = await axiosInstance.get<ApiResponse<T>>(url, {
        params,
        headers: createHeaders(token, headers),
        ...config,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  post: async <T>({
    url,
    data,
    token,
    headers,
    config,
  }: ApiRequestParams): Promise<T> => {
    try {
      const response = await axiosInstance.post<ApiResponse<T>>(url, data, {
        headers: createHeaders(token, headers),
        ...config,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  put: async <T>({
    url,
    data,
    token,
    headers,
    config,
  }: ApiRequestParams): Promise<T> => {
    try {
      const response = await axiosInstance.put<ApiResponse<T>>(url, data, {
        headers: createHeaders(token, headers),
        ...config,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async <T>({
    url,
    data,
    token,
    headers,
    config,
  }: ApiRequestParams): Promise<T> => {
    try {
      const response = await axiosInstance.delete<ApiResponse<T>>(url, {
        data,
        headers: createHeaders(token, headers),
        ...config,
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
