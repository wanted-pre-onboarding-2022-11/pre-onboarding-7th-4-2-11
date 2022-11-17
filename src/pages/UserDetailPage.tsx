import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IAccount, ISettings } from "@/lib/models";
import { getAccountAll, getSettingAll } from "@/lib/apis/account";
import { getUserInfo } from "@/lib/apis/user";
import { ACCOUNT_TABLE_HEADER, convertDate, convertMonetaryUnit } from "@/lib/utils";
import { ACCOUNT_STATUS, BROKERS } from "@/lib/data";

const UserDetailPage = () => {
  const { state } = useLocation();

  const { data: accountData } = useQuery(["accounts"], () => getAccountAll(), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  const { data: settingData } = useQuery(["setting"], () => getSettingAll(), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  const { status, data } = useQuery(["userInfo"], () => getUserInfo(state.userId), {
    refetchOnWindowFocus: false,
    select: (data) => data[0],
    enabled: !!accountData && !!settingData,
  });

  const isPush = (id: number) => {
    if (!settingData) {
      return;
    }
    const [data] = settingData.filter((setting: ISettings) => setting.id === id);
    return data && data.allow_invest_push ? "활성화" : "비활성화";
  };

  const isActive = (id: number) => {
    if (!settingData) {
      return;
    }
    const [data] = settingData.filter((setting: ISettings) => setting.id === id);
    return data && data.is_active ? "활성화" : "비활성화";
  };

  return (
    <>
      {status === "loading" && <span>Loading...</span>}
      {status === "error" && <span>Error!</span>}
      {status === "success" && (
        <>
          <section className="grid grid-cols-3">
            <div className="grid grid-cols-[120px_auto]">
              <span className="table-header">이름</span>
              <span className="table-body">{data.name}</span>
            </div>

            <div className="grid grid-cols-[120px_auto]">
              <span className="table-header">보유 계좌 수</span>
              <span className="table-body">
                {accountData?.filter((value: IAccount) => value.user_id === data.id).length}
              </span>
            </div>

            <div className="grid grid-cols-[120px_auto]">
              <span className="table-header">이메일 주소</span>
              <span className="table-body">{data.email}</span>
            </div>

            <div className="grid grid-cols-[120px_auto]">
              <span className="table-header">성별</span>
              <span className="table-body">
                {data.gender_origin === 1 || data.gender_origin === 3 ? "남자" : "여자"}
              </span>
            </div>

            <div className="grid grid-cols-[120px_auto]">
              <span className="table-header">생년월일</span>
              <span className="table-body">{convertDate(data.birth_date)}</span>
            </div>

            <div className="grid grid-cols-[120px_auto]">
              <span className="table-header">휴대폰 번호</span>
              <span className="table-body">{data.phone_number}</span>
            </div>

            <div className="grid grid-cols-[120px_auto]">
              <span className="table-header">최근 로그인</span>
              <span className="table-body">{convertDate(data.last_login)}</span>
            </div>

            <div className="grid grid-cols-[120px_auto]">
              <span className="table-header">혜택 수신 동의</span>
              <span className="table-body">{isPush(data.id)}</span>
            </div>

            <div className="grid grid-cols-[120px_auto]">
              <span className="table-header">활성화 여부</span>
              <span className="table-body">{isActive(data.id)}</span>
            </div>

            <div className="grid grid-cols-[120px_auto]">
              <span className="table-header">가입일</span>
              <span className="table-body">{convertDate(data.created_at)}</span>
            </div>
          </section>

          <section className="mt-5 flex flex-nowrap overflow-x-scroll">
            <table className="table">
              <thead>
                <tr>
                  {ACCOUNT_TABLE_HEADER.map((header, idx) => (
                    <th className="table-header" key={idx}>
                      <span>{header}</span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {accountData
                  ?.filter((value: IAccount) => value.user_id === data.id)
                  .map((item: IAccount) => (
                    <tr key={item.uuid}>
                      <td className="table-body">{data.name}</td>
                      <td className="table-body">{BROKERS[item.broker_id]}</td>
                      <td className="table-body">{item.number}</td>
                      <td className="table-body">{ACCOUNT_STATUS[item.status]}</td>
                      <td className="table-body">{item.name}</td>
                      <td className="table-body text-end">{convertMonetaryUnit(item.assets)}</td>
                      <td className="table-body text-end">{convertMonetaryUnit(item.payments)}</td>
                      <td className="table-body">{item.is_active ? "활성화" : "비활성화"}</td>
                      <td className="table-body">{convertDate(item.created_at)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </>
  );
};

export default UserDetailPage;
