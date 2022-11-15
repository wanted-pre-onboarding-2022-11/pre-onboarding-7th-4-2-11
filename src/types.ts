export interface ILoginFormData {
  email: string;
  password: string;
}

export interface handleLogin {
  handleLogin: (values: ILoginFormData) => void;
}
