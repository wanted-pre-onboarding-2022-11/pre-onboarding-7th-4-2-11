import accountStatus from "./accountStatus.json";

export const convertAccountStatus = (status: number) => {
  const result = Object.entries(accountStatus).filter((e) => e[1] === status);
  if (result.length === 0) return "ERROR STATUS";
  return result[0][0];
};
