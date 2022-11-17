import React from "react";
import brokersData from "../../utils/brokers.json";

interface DetailSelectBroker {
  defaultValue: string;
  setModifyData?(value: string): void;
}

const DetailSelectBroker = ({ defaultValue, setModifyData }: DetailSelectBroker) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (setModifyData) setModifyData(e.target.value);
  };

  const brokers = Object.entries(brokersData).reduce((acc, cur) => {
    acc.push({ id: cur[0], name: cur[1] });
    return acc;
  }, [] as { [index: string]: string }[]);

  return (
    <select className="ml-5" onChange={handleChange} defaultValue={defaultValue}>
      {brokers.map((option) => (
        <option key={option.id} value={option.id} defaultValue={defaultValue}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default DetailSelectBroker;
