'use clien'
import type { AxiosRequestHeaders } from "axios";

import { openDialog } from "@/redux/slices/dialogSlice";
import { closeLoader, openLoader } from "@/redux/slices/loaderSlice";
import { store } from "@/redux/store";

import { axiosServerInstance } from "./axios";

interface ApiRequestConfig {
  url: string;
  token?: string | null;
  headers?: any;
  config?: Record<string, any>;
}

interface GetRequest extends ApiRequestConfig {
  params?: Record<string, any>;
  withLoader?: boolean;
}

interface PostPutDeleteRequest<T = any> extends ApiRequestConfig {
  data?: T;
  withLoader?: boolean;
}
export const nextApi = {
  get: async <T = any>({
    url,
    token = null,
    params = {},
    headers = {},
    withLoader = true,
    config = {}
  }: GetRequest): Promise<T> => {
   
    if (withLoader) store.dispatch(openLoader());
    try {
      const finalHeaders: AxiosRequestHeaders = {
        ...headers,
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      };

      const response = await axiosServerInstance.get<T>(url, {
        params,
        headers: finalHeaders,
        ...config
      });
      console.log('next api res :' , response)
      return response.data;
    } catch (error: any) {
      store.dispatch(
        openDialog({
          status: "error",
          content: error.response?.data?.detail ?? error.message
        })
      );
      throw error;
    } finally {
      if (withLoader) store.dispatch(closeLoader());
    }
  },

  post: async <T = any, D = any>({
    url,
    data,
    token = null,
    headers = {},
    withLoader = true
  }: PostPutDeleteRequest<D>): Promise<T> => {
    if (withLoader) store.dispatch(openLoader());
    try {
      const finalHeaders: AxiosRequestHeaders = {
        ...headers,
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      };

      const response = await axiosServerInstance.post<any>(url, data, {
        headers: finalHeaders
      });

      const dialogMessage = response?.data?.message ?? null;

      if (dialogMessage) {
        store.dispatch(openDialog(dialogMessage));
      }

      return response.data;
    } catch (error: any) {
      store.dispatch(
        openDialog({
          status: "error",
          content: error.response?.data?.detail ?? error.message
        })
      );
      throw error;
    } finally {
      if (withLoader) store.dispatch(closeLoader());
    }
  },

  put: async <T = any, D = any>({
    url,
    data,
    token = null,
    headers = {},
    withLoader = true
  }: PostPutDeleteRequest<D>): Promise<T> => {
    if (withLoader) store.dispatch(openLoader());
    try {
      const finalHeaders: AxiosRequestHeaders = {
        ...headers,
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      };

      const response = await axiosServerInstance.put<any>(url, data, {
        headers: finalHeaders
      });

      const dialogMessage = response?.data?.message ?? null;

      if (dialogMessage) {
        store.dispatch(openDialog(dialogMessage));
      }

      return response.data;
    } catch (error: any) {
      store.dispatch(
        openDialog({
          status: "error",
          content: error.response?.data?.detail ?? error.message
        })
      );
      throw error;
    } finally {
      if (withLoader) store.dispatch(closeLoader());
    }
  },

  delete: async ({
    url,
    data,
    token = null,
    headers = {},
    withLoader = true
  }: PostPutDeleteRequest): Promise<any> => {
    if (withLoader) store.dispatch(openLoader());
    try {
      const finalHeaders = {
        "Content-Type": "application/json",
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      };

      const response = await axiosServerInstance.delete<any>(url, {
        data,
        headers: finalHeaders
      });

      const dialogMessage = response?.data?.message ?? null;

      if (dialogMessage) {
        store.dispatch(openDialog(dialogMessage));
      }

      return response.data;
    } catch (error: any) {
      store.dispatch(
        openDialog({
          status: "error",
          content: error.response?.data?.detail ?? error.message
        })
      );
      throw error;
    } finally {
      if (withLoader) store.dispatch(closeLoader());
    }
  }
};
