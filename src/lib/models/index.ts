import * as data from "../data";

export type IGenderOrigin = 1 | 2 | 3 | 4;

export type IAccountStatus = keyof typeof data.ACCOUNT_STATUS;

export type IBrokerId = keyof typeof data.BROKERS | keyof typeof data.BROKER_FORMAT;

export type IUser = {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: IGenderOrigin;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: string;
  updated_at: string;
};

export type IAccount = {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: IBrokerId;
  status: IAccountStatus;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export interface ISettings {
  allow_invest_push: boolean;
  allow_marketing_push: boolean;
  created_at: string;
  id: number;
  is_active: boolean;
  is_staff: boolean;
  updated_at: string;
  uuid: string;
}
