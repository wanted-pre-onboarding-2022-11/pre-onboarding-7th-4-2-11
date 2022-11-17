import { IAccount } from "@/lib/models";
import React, { useState } from "react";

interface DetailTableItem {
  title: string;
  value: string;
  target: string;
  id: number;
  handleDataChange(id: number, value: Partial<IAccount>): void;
  children?: JSX.Element;
}

const DetailTableItem = ({
  title,
  value,
  target,
  id,
  handleDataChange,
  children,
}: DetailTableItem) => {
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false);
  const [modifyData, setModifyData] = useState<string | number | boolean>(value);

  const handleCheckData = () => {
    if (modifyData !== value && isModifyMode) handleDataChange(id, { [target]: modifyData });
    setIsModifyMode((prev) => !prev);
  };

  return (
    <div className="flex border relative rounded-md">
      <span className="p-6 border-r basis-1/3">{title}</span>
      {isModifyMode ? (
        children ? (
          React.cloneElement(children, { setModifyData, value })
        ) : (
          ""
        )
      ) : (
        <span className="p-6 basis-2/3">{value}</span>
      )}
      {title === "계좌개설일" ||
      title === "최근활동일" ||
      title === "uuid" ||
      title === "고객명" ? (
        <></>
      ) : (
        <button
          className="absolute top-0.5 right-1 text-sm hover:bg-sky-800 hover:text-stone-100 rounded-md p-0.5"
          onClick={handleCheckData}
        >
          {isModifyMode ? "확인" : "수정"}
        </button>
      )}
    </div>
  );
};

export default DetailTableItem;
