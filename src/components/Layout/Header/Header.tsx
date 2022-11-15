import { getUserName } from "../../../utils/localStorage";
import React from "react";

interface HeaderProps {
  current: string | null;
  title: string | null;
}

const Header = ({ current, title }: HeaderProps) => {
  return (
    <div className="p-5 text-2xl border-b flex justify-between sticky top-0 bg-white">
      <h1 className="">{title ? title : current}</h1>
      <p>{`${getUserName()} 님`}</p>
    </div>
  );
};

export default Header;
