import { IUser } from "@/lib/models";
import { UserPaginationProps } from "@/lib/types";
import { instance } from "./core";

export const getUserList = async ({ page, query }: UserPaginationProps): Promise<IUser[]> => {
  const res = await instance.get("/users", { params: { _page: page, _limit: 20, q: query } });
  return res.data;
};

export const getUserInfo = async (userId: number): Promise<IUser[]> => {
  const res = await instance.get("/users", { params: { id: userId } });
  return res.data;
};
