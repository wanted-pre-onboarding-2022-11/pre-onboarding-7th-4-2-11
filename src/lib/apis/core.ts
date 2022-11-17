import { getAccessToken } from "@/lib/utils/localStorage";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = "https://api.oscar0421.com";

export const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return { ...config, headers: { Authorization: `Bearer ${getAccessToken()}` } };
  },
  (error: AxiosError) => error.message,
);

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error as unknown as AxiosError;

    if (response) {
      throw { data: response.data, status: response.status, statusText: response.statusText };
    }

    throw error;
  },
);
