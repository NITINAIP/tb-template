import https from 'node:https';

import axios, { AxiosInstance } from 'axios';

const httpsAgentOptions = { rejectUnauthorized: false };
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/`
    : "",
  httpsAgent:
    process.env.NODE_ENV === "development"
      ? new https.Agent(httpsAgentOptions)
      : undefined,
  timeout: 20000
});

const axiosServerInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/`
    : "",
  timeout: 20000
});

export { axiosInstance, axiosServerInstance };
