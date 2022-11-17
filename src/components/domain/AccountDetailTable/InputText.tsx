import React, { useState } from "react";

interface InputTextProps {
  value?: string;
  setModifyData?(value: string): void;
}

const InputText = ({ setModifyData, value }: InputTextProps) => {
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

export default InputText;
