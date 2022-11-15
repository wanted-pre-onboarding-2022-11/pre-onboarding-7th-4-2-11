import React from "react";

interface SidebarMenuProps {
  name: string;
  isSelected: boolean;
  callback: () => void;
}

const SidebarMenu = ({ name, isSelected, callback }: SidebarMenuProps) => {
  return (
    <div
      className={`${
        isSelected ? "bg-sky-800 text-stone-100" : "inherit text-black"
      } p-5 cursor-pointer mb-4 hover:bg-sky-800 hover:text-stone-100 rounded-md`}
      onClick={callback}
    >
      {name}
    </div>
  );
};

export default SidebarMenu;
