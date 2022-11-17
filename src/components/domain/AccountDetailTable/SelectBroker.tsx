import React from "react";
import { BROKERS } from "@/lib/data";

interface SelectBrokerProps {
  defaultValue: string;
  setModifyData?(value: string): void;
}

const SelectBroker = ({ defaultValue, setModifyData }: SelectBrokerProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (setModifyData) setModifyData(e.target.value);
  };

  const brokers = Object.entries(BROKERS).reduce((acc, cur) => {
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

export default SelectBroker;
