export const ACCESS_TOKEN_KEY = "accessToken" as const;
export const USER_DATA = "userData" as const;

export const saveFetchData = (
  accessToken: string,
  userData: { id: number; email: string },
): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(USER_DATA, JSON.stringify(userData));
};

export const getAccessToken = (): null | string => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getUserName = (): string => {
  const temp = localStorage.getItem(USER_DATA);

  if (temp === null) {
    return "ERROR";
  }

  const userData = JSON.parse(temp).email;

  return userData.split("@")[0];
};

export const deleteFetchData = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_DATA);
};
