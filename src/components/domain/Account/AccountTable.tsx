import React from "react";
import styled from "styled-components";
import { IAccount } from "@/lib/models";
import * as accountUtils from "@/lib/utils/account";

interface AccountTableProps {
  accountList: IAccount[];
  handleDetail(id: number): void;
}

const AccountTable = ({ accountList, handleDetail }: AccountTableProps) => {
  return (
    <TableContainer>
      <table>
        <thead>
          <tr>
            <th>고객명</th>
            <th>증권사</th>
            <th>계좌번호</th>
            <th>계좌상태</th>
            <th>계좌명</th>
            <th>평가금액</th>
            <th>입금금액</th>
            <th>계좌활성화여부</th>
            <th>계좌개설일</th>
          </tr>
        </thead>
        <tbody>
          {accountList.map((e) => (
            <tr key={e.uuid}>
              <td>{accountUtils.convertAccountUserName(String(e.user_id))}</td>
              <td>{accountUtils.convertAccountBroker(e.broker_id)}</td>
              <td onClick={() => handleDetail(e.id)}>
                {accountUtils.convertAccountNumber(e.number)}
              </td>
              <td>{accountUtils.convertAccountStatus(e.status)}</td>
              <td>{e.name}</td>
              <td>{accountUtils.convertAccountAssets(e.assets)} 원</td>
              <td>{accountUtils.convertAccountAssets(e.payments)} 원</td>
              <td>{e.is_active ? "활성" : "비활성"}</td>
              <td>{accountUtils.convertCreatedDate(e.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  > table {
    display: inline-table;
    margin-bottom: 30px;

    & > thead {
      font-size: 18px;
      border-bottom: 1px solid #000;

      & > tr > th {
        text-align: left;
        padding: 15px;
      }
    }

    & > tbody {
      font-size: 16px;

      & > tr {
        border-bottom: 1px solid #000;
      }

      & > tr > td {
        padding: 15px;

        &:nth-child(3) {
          cursor: pointer;
          color: royalblue;

          &:hover {
            color: #000;
          }
        }
      }
    }
  }
`;

export default AccountTable;
