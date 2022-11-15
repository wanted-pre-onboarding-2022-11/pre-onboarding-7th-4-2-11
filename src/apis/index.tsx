import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { saveFetchData, getAccessToken } from "../utils/localStorage";
import { ILoginFormData } from "../types";

interface IFetchDataApi {
  instance: AxiosInstance;
  tryLogin(loginFormData: ILoginFormData): Promise<void>;
  getAccountList(): Promise<[]>;
  getUserList(): Promise<[]>;
}

export class FetchDataAPI implements IFetchDataApi {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({ timeout: 2000 });
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return { ...config, headers: { Authorization: `Bearer ${getAccessToken()}` } };
      },
      (error: AxiosError) => error.message,
    );
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const { response } = error as unknown as AxiosError;

        if (response) {
          throw { data: response.data, status: response.status, statusText: response.statusText };
        }

        throw error;
      },
    );
  }

  async tryLogin(loginFormData: ILoginFormData): Promise<void> {
    const res = await this.instance.post("/api/login", loginFormData);
    saveFetchData(res.data.accessToken, res.data.user);
  }

  async getAccountList() {
    const res = await this.instance.get("/api/accounts");
    return res.data;
  }

  async getUserList() {
    const res = await this.instance.get("/api/users");
    return res.data;
  }
}
