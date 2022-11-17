import { saveFetchData } from "@/lib/utils/localStorage";
import { instance } from "./core";

export const tryLogin = async (loginFormData: { email: string; password: string }) => {
  const res = await instance.post("/login", loginFormData);
  saveFetchData(res.data.accessToken, res.data.user);
};
