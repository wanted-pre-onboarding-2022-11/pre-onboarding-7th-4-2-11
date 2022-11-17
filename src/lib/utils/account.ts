import { accountStatusData, BROKERS } from "@/lib/data";

export const convertAccountStatus = (status: number): string => {
  const result = Object.entries(accountStatusData).filter((e) => e[1] === status);
  if (result.length === 0) return "ERROR STATUS";
  return result[0][0];
};

export const convertCreatedDate = (date: string): string => {
  const newDate = new Date(date);
  return newDate.toLocaleString();
};

export const convertAccountBroker = (broker: string): string => {
  const brokersName: { [index: string]: string } = BROKERS;
  return brokersName[broker];
};

export const convertAccountNumber = (number: string): string => {
  return number.replace(/(?<=.{2})(?=.{3})./gi, "*");
};

export const convertAccountUserName = (name: string): string => {
  const targetLength: number = name.length;
  if (targetLength <= 2) return name.replace(/(?<=.{1})./gi, "*");
  else return name.replace(/(?<=.{1})(?=.{2})./gi, "*");
};

export const convertAccountAssets = (assets: string): string => {
  return Math.floor(Number(assets)).toLocaleString();
};

export const convertTitle = (title: string | null): string => {
  let newTitle = "";

  switch (title) {
    case "account":
      newTitle = "계좌목록";
      break;
    case "detail":
      newTitle = "계좌상세";
      break;
    default:
      newTitle = "";
  }

  return newTitle;
};
