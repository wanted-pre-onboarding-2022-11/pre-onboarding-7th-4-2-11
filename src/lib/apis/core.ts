import { getAccessToken } from "@/lib/utils/localStorage";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const { VITE_APP_API_END_POINT } = import.meta.env;

export const instance: AxiosInstance = axios.create({
  baseURL: VITE_APP_API_END_POINT,
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
