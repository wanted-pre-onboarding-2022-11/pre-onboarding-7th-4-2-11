import React from "react";

interface SelectActiveProps {
  defaultValue: string;
  setModifyData?(value: string | number | boolean): void;
}

const isActiveList = [
  { id: 1, name: true, value: "활성" },
  { id: 2, name: false, value: "비활성" },
];

const SelectActive = ({ defaultValue, setModifyData }: SelectActiveProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (setModifyData) {
      if (e.target.value === "활성") {
        setModifyData(true);
      } else {
        setModifyData(false);
      }
    }
  };

  return (
    <select className="ml-5" onChange={handleChange} defaultValue={defaultValue}>
      {isActiveList.map((option) => (
        <option key={option.id} value={option.value} defaultValue={defaultValue}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default SelectActive;
