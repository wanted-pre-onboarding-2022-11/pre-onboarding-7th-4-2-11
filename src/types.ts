export interface ILoginFormData {
  email: string;
  password: string;
}

export interface handleLogin {
  handleLogin: (values: ILoginFormData) => void;
}

export interface AccountList {
  assets: string;
  broker_id: string;
  created_at: string;
  id: number;
  is_active: boolean;
  name: string;
  number: string;
  payments: string;
  status: number;
  updated_at: string;
  user_id: number | number;
  uuid: string;
}

export interface AccountProps {
  totalCount: number;
  accountList: AccountList[];
}

export interface UserList {
  address: string;
  age: number;
  birth_date: string;
  created_at: string;
  detail_address: string;
  email: string;
  gender_origin: number;
  id: number;
  last_login: string;
  name: string;
  phone_number: string;
  photo: string;
  updated_at: string;
  uuid: string;
}

export interface PatchAccountData {
  assets?: string;
  broker_id?: string;
  created_at?: string;
  id?: number;
  is_active?: boolean;
  name?: string;
  number?: string;
  payments?: string;
  status?: number;
  updated_at?: string;
  user_id?: number;
  uuid?: string;
}
