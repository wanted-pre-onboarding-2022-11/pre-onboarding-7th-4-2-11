export const ACCOUNT_TABLE_HEADER = [
  "고객명",
  "증권사",
  "계좌번호",
  "계좌 상태",
  "계좌명",
  "평가 금액",
  "입금 금액",
  "계좌 활성화",
  "계좌 개설일",
] as const;

export const USER_TABLE_HEADER = [
  "고객명",
  "보유 계좌수",
  "이메일",
  "성별",
  "생년월일",
  "휴대폰 번호",
  "최근 로그인",
  "혜택 수신 동의",
  "활성화",
  "가입일",
] as const;

export const path = (pathname: string) => {
  if (pathname === "/") {
    return "계좌 목록";
  } else if (pathname.includes("/account")) {
    return "계좌 상세";
  } else if (pathname === "/user") {
    return "사용자 목록";
  } else if (pathname.includes("/user") && pathname.split("/").length === 3) {
    return "사용자 상세";
  } else {
    return "";
  }
};

export const convertDate = (value: string) => {
  const [month, date, year] = new Date(value).toLocaleDateString("en-US").split("/");

  return `${year}년 ${month}월 ${date}일`;
};

export const convertMonetaryUnit = (value: string) => {
  return `${Number(value).toLocaleString("ko-KR")}원`;
};
