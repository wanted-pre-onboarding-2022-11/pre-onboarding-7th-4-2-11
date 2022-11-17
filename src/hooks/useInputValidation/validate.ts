export type ValidationResult = {
  isPass: boolean;
  isError: boolean;
  errorMsg?: string;
};

export type ValidateFC = (name: string, value: string, payload?: any) => ValidationResult;

const ERROR = { isPass: false, isError: true };
const PASS = { isPass: true, isError: false };

const MIN_PASSWORD_LENGTH = 4;

const isEmpty = (value: string) => !value || value === "";

const validate: ValidateFC = (name: string, value: string, payload?: any): ValidationResult => {
  switch (name) {
    case "email":
      return validateEmail(value);
    case "password":
      return validatePassWord(value);
    case "checkPassword":
      return checkPassWord(value, payload);
    case "todo":
      return validateTodo(value);
    default:
      return validateEmpty(value);
  }
};

const validateEmpty = (value: string): ValidationResult => {
  if (isEmpty(value)) {
    return { ...ERROR, errorMsg: "필수 입력 정보입니다!" };
  }
  return PASS;
};

const validateEmail = (value: string): ValidationResult => {
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]/;

  if (isEmpty(value)) {
    return { ...ERROR, errorMsg: "필수 입력 정보입니다!" };
  }

  if (!value.match(regex)) {
    return {
      ...ERROR,
      errorMsg: "이메일 형식이 올바르지 않습니다!",
    };
  }

  return PASS;
};

const validatePassWord = (value: string): ValidationResult => {
  if (isEmpty(value)) {
    return { ...ERROR, errorMsg: "필수 입력 정보입니다!" };
  }

  if (value.length < MIN_PASSWORD_LENGTH) {
    return {
      ...ERROR,
      errorMsg: "비밀번호는 4자 이상이어야 합니다!",
    };
  }

  return PASS;
};

const checkPassWord = (value: string, password: string) => {
  if (isEmpty(value)) {
    return { ...ERROR, errorMsg: "필수 입력 정보입니다!" };
  }

  if (value !== password) {
    return {
      ...ERROR,
      errorMsg: "비밀번호가 일치하지 않습니다!",
    };
  }

  if (value.length < MIN_PASSWORD_LENGTH) {
    return {
      ...ERROR,
      errorMsg: "비밀번호는 4자 이상이어야 합니다!",
    };
  }

  return PASS;
};

const validateTodo = (value: string) => {
  if (value && value.length > 0) return PASS;
  return ERROR;
};

export default validate;
