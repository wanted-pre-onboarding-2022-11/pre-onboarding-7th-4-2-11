import { convertTitle } from "@/lib/utils/account";
import { getUserName } from "@/lib/utils/localStorage";
import React from "react";

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
