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
];

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
];

export type BrokerId = keyof typeof BROKERS;

export type AccountStatus = keyof typeof ACCOUNT_STATUS;

export const BROKERS = {
  "209": "유안타증권",
  "218": "현대증권",
  "230": "미래에셋증권",
  "238": "대우증권",
  "240": "삼성증권",
  "243": "한국투자증권",
  "247": "우리투자증권",
  "261": "교보증권",
  "262": "하이투자증권",
  "263": "HMC투자증권",
  "264": "키움증권",
  "265": "이베스트투자증권",
  "266": "SK증권",
  "267": "대신증권",
  "268": "아이엠투자증권",
  "269": "한화투자증권",
  "270": "하나대투자증권",
  "279": "동부증권",
  "280": "유진투자증권",
  "288": "카카오페이증권",
  "287": "메리츠종합금융증권",
  "290": "부국증권",
  "291": "신영증권",
  "292": "LIG투자증권",
  "271": "토스증권",
} as const;

export const ACCOUNT_STATUS = {
  9999: "관리자확인필요",
  1: "입금대기",
  2: "운용중",
  3: "투자중지",
  4: "해지",
} as const;

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
