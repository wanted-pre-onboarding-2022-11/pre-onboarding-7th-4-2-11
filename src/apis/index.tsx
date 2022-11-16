import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { saveFetchData, getAccessToken } from "../utils/localStorage";
import { ILoginFormData, AccountProps } from "../types";

export const instance: AxiosInstance = axios.create({ timeout: 2000 });

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

export const tryLogin = async (loginFormData: ILoginFormData): Promise<void> => {
  const res = await instance.post("/api/login", loginFormData);
  saveFetchData(res.data.accessToken, res.data.user);
};

export const getAccountList = async (page: number): Promise<AccountProps> => {
  // const resUsers = await instance.get("/api/users");
  // console.log(resUsers.data);

  const res = await instance.get(`/api/accounts?`, {
    params: {
      _page: page,
      _limit: 20,
    },
  });

  return {
    totalCount: Math.ceil(Number(res.headers["x-total-count"]) / 20),
    accountList: res.data,
  };
};

export const getUserList = async () => {
  const res = await instance.get("/api/users");
  return res.data;
};
