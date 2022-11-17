import { IAccount, ISettings, IUser } from "@/lib/models";
import { AccountPaginationProps, UserPaginationProps } from "@/lib/types";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { saveFetchData, getAccessToken } from "../utils/localStorage";

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

export const tryLogin = async (loginFormData: { email: string; password: string }) => {
  const res = await instance.post("/login", loginFormData);
  saveFetchData(res.data.accessToken, res.data.user);
};

export const getAccountList = async (
  page: number,
  search: string,
): Promise<AccountPaginationProps> => {
  const resUserList = await instance.get("/users");
  const resAccountList = await instance.get(`/accounts?`, {
    params: {
      _page: page,
      _limit: 20,
      q: search,
    },
  });

  const userList = resUserList.data;
  const accountList = resAccountList.data;

  const temp = accountList.map((e: IAccount) => {
    const userName = userList.filter((user: IUser) => user.id === e.user_id);
    return { ...e, user_id: userName[0].name };
  });

  return {
    totalCount: Math.ceil(Number(resAccountList.headers["x-total-count"]) / 20),
    accountList: temp,
  };
};

export const getAccountDetail = async (id: string): Promise<IAccount> => {
  const resUserList = await instance.get("/users");
  const resAccountDetail = await instance.get(`/accounts/${id}`);
  const userList = resUserList.data;
  const accountList = [resAccountDetail.data];
  const temp = accountList.map((e: IAccount) => {
    const userName = userList.filter((user: IUser) => user.id === e.user_id);
    return { ...e, user_id: userName[0].name };
  });

  return temp[0];
};

export const patchAccountData = async (id: number, value: Partial<IAccount>) => {
  await instance.patch(`/accounts/${id}`, value);
};

export const deleteAccountData = async (id: string) => {
  await instance.delete(`/accounts/${id}`);
};

export const getSettingAll = async (): Promise<ISettings[]> => {
  const res = await instance.get("/userSetting");
  return res.data;
};

export const getAccountAll = async (): Promise<IAccount[]> => {
  const res = await instance.get("/accounts");
  return res.data;
};

export const getUserList = async ({ page, query }: UserPaginationProps): Promise<IUser[]> => {
  const res = await instance.get("/users", { params: { _page: page, _limit: 20, q: query } });
  return res.data;
};

export const getUserInfo = async (userId: number): Promise<IUser[]> => {
  const res = await instance.get("/users", { params: { id: userId } });
  return res.data;
};
