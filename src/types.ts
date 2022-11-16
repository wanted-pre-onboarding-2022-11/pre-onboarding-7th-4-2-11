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
  user_id: number;
  uuid: string;
}

export interface AccountProps {
  totalCount: number;
  accountList: AccountList[];
}
