import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { saveFetchData, getAccessToken } from "../utils/localStorage";
import { ILoginFormData, AccountProps, AccountList, UserList, PatchAccountData } from "../types";

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
  const resUserList = await instance.get("/api/users");
  const resAccountList = await instance.get(`/api/accounts?`, {
    params: {
      _page: page,
      _limit: 20,
    },
  });

  const userList = resUserList.data;
  const accountList = resAccountList.data;

  const temp = accountList.map((e: AccountList) => {
    const userName = userList.filter((el: UserList) => el.id === e.user_id);
    return { ...e, user_id: userName[0].name };
  });

  return {
    totalCount: Math.ceil(Number(resAccountList.headers["x-total-count"]) / 20),
    accountList: temp,
  };
};

export const getAccountDetail = async (id: string): Promise<AccountList> => {
  const resUserList = await instance.get("/api/users");
  const resAccountDetail = await instance.get(`/api/accounts/${id}`);

  const userList = resUserList.data;
  const accountList = [resAccountDetail.data];

  const temp = accountList.map((e: AccountList) => {
    const userName = userList.filter((el: UserList) => el.id === e.user_id);
    return { ...e, user_id: userName[0].name };
  });

  return temp[0];
};

export const patchAccountData = async (id: number, value: PatchAccountData) => {
  await instance.patch(`/api/accounts/${id}`, value);
};

export const deleteAccountData = async (id: string) => {
  await instance.delete(`/api/accounts/${id}`);
};
