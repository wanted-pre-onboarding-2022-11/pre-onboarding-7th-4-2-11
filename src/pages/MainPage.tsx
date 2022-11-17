import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getAccountList } from "../apis";
import { deleteFetchData } from "../utils/localStorage";
import { AccountPaginationProps } from "@/lib/types";
import { AccountTable, AccountTablePagination } from "@/components/domain/Account";
import { Loading } from "@/components/atom";

const MainPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page: number | null = Number(searchParams.get("page"));
  const search: string | null = searchParams.get("search") || "";
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>(search);

  const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    searchParams.set("search", searchQuery);
    setSearchParams(searchParams);
  };

  const handleGetAccountList = async () => {
    try {
      const res = await getAccountList(page, search);

      return res;
    } catch (error: unknown) {
      const { status } = error as { status: number };

      if (status === 401) {
        deleteFetchData();
        navigate("/login");
      }

      return { totalCount: 0, accountList: [] };
    }
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    navigate(
      `?current=account&page=${selectedItem.selected + 1}${search ? "&search=" + search : ""}`,
    );
  };

  const handleDetail = (id: number): void => {
    navigate(`/detail?target=${id}`, { state: page });
  };

  const { data, isLoading, isError, refetch } = useQuery<AccountPaginationProps>(
    ["accountList", { page, search }],
    handleGetAccountList,
  );

  useEffect(() => {
    if (location.state === "delete") refetch();
  }, [location]);

  useEffect(() => {
    if (page <= 0) navigate(`?current=account&page=1`);
  }, [page]);

  if (isError) return <Navigate to={"/login"} replace />;

  return (
    <div className="min-h-screen p-5">
      <input onChange={handleSearchValue} value={searchQuery} />
      <button onClick={handleSearchSubmit}>검색</button>
      <ContentContainer className="shadow-lg min-h-screen p-5 w-full ">
        {data && !isLoading ? (
          <>
            <AccountTable accountList={data.accountList} handleDetail={handleDetail} />
            <AccountTablePagination
              totalCount={Number(data.totalCount)}
              page={page}
              handlePageClick={handlePageClick}
            />
          </>
        ) : (
          <Loading>불러오는 중</Loading>
        )}
      </ContentContainer>
    </div>
  );
};

const ContentContainer = styled.div`
  > div:first-child {
    width: calc(100vw - 440px);
    overflow-x: scroll;
    white-space: nowrap;
  }
`;

export default MainPage;
