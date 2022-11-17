import React from "react";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAccountDetail, patchAccountData, deleteAccountData } from "../apis";
import { AccountList, PatchAccountData } from "../types";
import styled from "styled-components";
import DetailTable from "../components/Detail/DetailTable";

const DetailPage = () => {
  const [searchParams] = useSearchParams();
  const target: string | null = searchParams.get("target");
  const navigate = useNavigate();
  const location = useLocation();

  if (target === null) return <div>Error</div>;

  const { data, isLoading, isError, refetch } = useQuery<AccountList>(
    ["accountDetail", target],
    () => getAccountDetail(target),
  );

  const handleDataChange = (id: number, value: PatchAccountData): void => {
    patchAccountData(id, { ...value, updated_at: new Date().toString() });
    refetch();
  };

  const handleDataDelete = () => {
    deleteAccountData(target);
    refetch();
    navigate(`/?current=account&page=${location.state}`, { state: "delete" });
  };

  if (isError) return <Navigate to={"/login"} replace />;

  return (
    <div className="min-h-screen p-5">
      <div className="shadow-lg min-h-screen p-5 w-full ">
        <div className="mb-10 flex justify-end">
          <button
            className="hover:bg-sky-800 hover:text-stone-100 rounded-md p-0.5"
            onClick={handleDataDelete}
          >
            삭제
          </button>
        </div>
        {data && !isLoading ? (
          <DetailTable data={data} handleDataChange={handleDataChange} />
        ) : (
          <Loading>불러오는 중</Loading>
        )}
      </div>
    </div>
  );
};

const Loading = styled.div`
  font-size: 36px;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DetailPage;
