import React from "react";
import SidebarMenu from "./SidebarMenu";

interface SidebarProps {
  current: string | null;
  navigateTo(target: string): void;
  handleLogout(): void;
}

const Sidebar = ({ current, navigateTo, handleLogout }: SidebarProps) => {
  return (
    <div className="sticky top-0 left-0  p-10">
      <h1 className="text-6xl mb-16">PREFACE</h1>
      <SidebarMenu
        name="계좌목록"
        isSelected={current === "account"}
        callback={() => navigateTo(`/?current=account`)}
      />
      <SidebarMenu name="로그아웃" isSelected={current === "logout"} callback={handleLogout} />
    </div>
  );
};

export default Sidebar;
