import React from "react";
import { getUserName } from "../../../utils/localStorage";
import { convertTitle } from "../../../utils/converData";

interface HeaderProps {
  current: string | null;
  title: string | null;
}

const Header = ({ current, title }: HeaderProps) => {
  return (
    <div className="p-5 text-2xl border-b flex justify-between sticky top-0 bg-white z-50">
      <h1 className="">{title ? convertTitle(title) : convertTitle(current)}</h1>
      <p>{`${getUserName()} 님`}</p>
    </div>
  );
};

export default Header;
