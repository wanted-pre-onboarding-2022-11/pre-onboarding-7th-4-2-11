import React from "react";
import styled from "styled-components";
import { IAccount } from "@/lib/models";
import { convertDataFunction } from "@/utils/converData";
import TableItem from "./TableItem";
import InputText from "./InputText";
import SelectBroker from "./SelectBroker";
import SelectStatus from "./SelectStatus";
import SelectActive from "./SelectActive";

interface DetailTable {
  data: IAccount;
  handleDataChange(id: number, value: Partial<IAccount>): void;
}

const DetailTable = ({ data, handleDataChange }: DetailTable) => {
  return (
    <div>
      <Container>
        <TableItem
          title="계좌명"
          value={data.name}
          id={data.id}
          target={"name"}
          handleDataChange={handleDataChange}
          children={<InputText />}
        />
        <TableItem
          title="계좌번호"
          value={data.number}
          id={data.id}
          target={"number"}
          handleDataChange={handleDataChange}
          children={<InputText />}
        />
        <TableItem
          title="증권사"
          value={convertDataFunction.convertAccountBroker(data.broker_id)}
          id={data.id}
          target={"broker_id"}
          handleDataChange={handleDataChange}
          children={<SelectBroker defaultValue={data.broker_id} />}
        />
        <TableItem
          title="고객명"
          value={String(data.user_id)}
          id={data.id}
          target={"user_id"}
          handleDataChange={handleDataChange}
        />
        <TableItem
          title="계좌상태"
          value={convertDataFunction.convertAccountStatus(data.status)}
          id={data.id}
          target={"status"}
          handleDataChange={handleDataChange}
          children={<SelectStatus defaultValue={data.status} />}
        />
        <TableItem
          title="계좌활성화여부"
          value={data.is_active ? "활성" : "비활성"}
          id={data.id}
          target={"is_active"}
          handleDataChange={handleDataChange}
          children={<SelectActive defaultValue={data.is_active ? "활성" : "비활성"} />}
        />
        <TableItem
          title="평가금액"
          value={`${convertDataFunction.convertAccountAssets(data.assets)} 원`}
          id={data.id}
          target={"assets"}
          handleDataChange={handleDataChange}
          children={<InputText />}
        />
        <TableItem
          title="입금금액"
          value={`${convertDataFunction.convertAccountAssets(data.payments)} 원`}
          id={data.id}
          target={"payments"}
          handleDataChange={handleDataChange}
          children={<InputText />}
        />
        <TableItem
          title="계좌개설일"
          value={convertDataFunction.convertCreatedDate(data.created_at)}
          id={data.id}
          target={"created_at"}
          handleDataChange={handleDataChange}
        />
        <TableItem
          title="최근활동일"
          value={convertDataFunction.convertCreatedDate(data.updated_at)}
          id={data.id}
          target={"updated_at"}
          handleDataChange={handleDataChange}
        />
        <TableItem
          title="uuid"
          value={data.uuid}
          id={data.id}
          target={"uuid"}
          handleDataChange={handleDataChange}
        />
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export default DetailTable;
