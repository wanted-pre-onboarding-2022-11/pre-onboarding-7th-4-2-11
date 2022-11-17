import { IAccount } from "../models";

export type LoginFormProps = { page: number; query: string };

export type UserPaginationProps = { page: number; query: string };

export type AccountPaginationProps = { totalCount: number; accountList: IAccount[] };
