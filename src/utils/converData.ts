import accountStatus from "./accountStatus.json";

export const convertDataFunction = {
  convertAccountStatus: (status: number): string => {
    const result = Object.entries(accountStatus).filter((e) => e[1] === status);
    if (result.length === 0) return "ERROR STATUS";
    return result[0][0];
  },
  convertCreatedDate: (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString();
  },
};
