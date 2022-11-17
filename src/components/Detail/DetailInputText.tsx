import React, { useState } from "react";

interface DetailInput {
  value?: string;
  setModifyData?(value: string): void;
}

const DetailInputText = ({ setModifyData, value }: DetailInput) => {
  const [currenData, setCurrnetData] = useState<string>(value || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setCurrnetData(event.target.value);
      if (setModifyData) setModifyData(event.target.value);
    }
  };

  return (
    <div className="w-100 flex items-center">
      <input
        className="pl-6"
        value={value ? currenData.replace(/,/g, "").replace(/ 원/g, "") : currenData}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default DetailInputText;
