import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IAccount, ISettings, IUser } from "@/lib/models";
import { Modal } from "@/components/common";
import { getAccountAll, getSettingAll } from "@/lib/apis/account";
import { getUserList } from "@/lib/apis/user";
import { convertDate, USER_TABLE_HEADER } from "@/lib/utils";
import { Loading } from "@/components/atom";

const UserPage = () => {
  const navigate = useNavigate();
  const [visibleModal, setVisibleModal] = useState(false);
  const [page, setPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");

  const { data: settingData } = useQuery(["setting"], () => getSettingAll(), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  const { data: accountData } = useQuery(["accounts"], () => getAccountAll(), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });

  const {
    status,
    data: userData,
    isFetching,
    isPreviousData,
  } = useQuery(["users", { page, isSearch }], () => getUserList({ page, query }), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
    enabled: !!accountData && !!settingData,
    select: (users) => users.filter((user: IUser) => user.uuid),
  });

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim().length) {
      setPage(1);
      setIsSearch((prev) => !prev);
    } else {
      alert("검색어를 입력해주세요.");
    }
  };

  const handleSearchReset = () => {
    if (!query) {
      return;
    }
    setPage(1);
    setIsSearch((prev) => !prev);
    setQuery("");
  };

  const isPush = (id: number) => {
    if (!settingData) {
      return;
    }
    const [data] = settingData.filter((setting: ISettings) => setting.id === id) as ISettings[];
    return data && data.allow_invest_push ? "O" : "X";
  };

  const isActive = (id: number) => {
    if (!settingData) {
      return;
    }
    const [data] = settingData.filter((setting: ISettings) => setting.id === id) as ISettings[];
    return data && data.is_active ? "활성화" : "비활성화";
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <div>서버에 문제가 있는 것 같아요.</div>;
  }

  return (
    <>
      <section className="flex h-[40px] items-center justify-between">
        <button onClick={() => setVisibleModal(true)}>사용자 생성</button>
        <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
          <h1>개발 중인 기능이에요 🥲</h1>
        </Modal>
        <form onSubmit={handleSearch} className="flex h-full items-center gap-5">
          <input
            className="h-full w-80 rounded-xl border border-stone-300 px-2"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="검색어를 입력해주세요"
          />
          <button type="submit">검색</button>
          <button type="button" onClick={handleSearchReset}>
            초기화
          </button>
        </form>

        <article className="flex gap-4">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 1}>
            이전
          </button>
          <span>{page} 페이지</span>
          <button
            onClick={() => setPage((prev) => (userData?.length ? prev + 1 : prev))}
            disabled={isPreviousData || !userData?.length}
          >
            다음
          </button>
        </article>
      </section>

      <section className="mt-5 flex flex-nowrap overflow-x-scroll">
        {status === "success" && !isFetching && (
          <table className="table">
            <thead>
              <tr>
                {USER_TABLE_HEADER.map((header, idx) => (
                  <th className="table-header" key={idx}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {userData.map((item: IUser) => (
                <tr key={item.uuid}>
                  <td
                    className="table-body cursor-pointer underline"
                    onClick={() => navigate(`/user/${item.uuid}`, { state: { userId: item.id } })}
                  >
                    {item.name}
                  </td>
                  <td className="table-body">
                    {accountData?.filter((value: IAccount) => value.user_id === item.id).length}
                  </td>
                  <td className="table-body">{item.email}</td>
                  <td className="table-body">
                    {item.gender_origin === 1 || item.gender_origin === 3 ? "남자" : "여자"}
                  </td>
                  <td className="table-body">{convertDate(item.birth_date)}</td>
                  <td className="table-body">{item.phone_number}</td>
                  <td className="table-body">{convertDate(item.last_login)}</td>
                  <td className="table-body">{isPush(item.id)}</td>
                  <td className="table-body">{isActive(item.id)}</td>
                  <td className="table-body">{convertDate(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default UserPage;
