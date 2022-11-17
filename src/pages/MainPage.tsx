import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getAccountList } from "../apis";
import { AccountProps } from "../types";
import { deleteFetchData } from "../utils/localStorage";
import Table from "../components/Table/Table";
import TablePagination from "../components/Table/TablePagination";

const MainPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page: number | null = Number(searchParams.get("page"));

  const handleGetAccountList = async () => {
    try {
      const res = await getAccountList(page);

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
    navigate(`?current=account&page=${selectedItem.selected + 1}`);
  };

  const handleDetail = (uuid: string): void => {
    navigate(`/detail?target=${uuid}`, { state: { page } });
  };

  const { data, isLoading, isError } = useQuery<AccountProps>(
    ["accountList", page],
    handleGetAccountList,
  );

  useEffect(() => {
    if (page <= 0) navigate(`?current=account&page=1`);
  }, [page]);

  if (isError) return <Navigate to={"/login"} replace />;

  return (
    <div className="min-h-screen p-5">
      <ContentContainer className="shadow-lg min-h-screen p-5 w-full ">
        {data && !isLoading ? (
          <>
            <Table accountList={data.accountList} handleDetail={handleDetail} />
            <TablePagination
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

const Loading = styled.div`
  font-size: 36px;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainPage;
