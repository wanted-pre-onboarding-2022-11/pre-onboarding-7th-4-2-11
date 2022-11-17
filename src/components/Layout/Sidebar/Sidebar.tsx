import React from "react";
import SidebarMenu from "./SidebarMenu";
import { useLocation } from "react-router-dom";
import ROUTE_PATH from "../../../routes/routerPaths";

interface SidebarProps {
  current: string | null;
  navigateTo(target: string): void;
  handleLogout(): void;
}

interface LocationProps {
  state: {
    page: string;
  };
}

const Sidebar = ({ current, navigateTo, handleLogout }: SidebarProps) => {
  const { state } = useLocation() as LocationProps;
  const page = state?.page || "1";

  return (
    <div className="sticky top-0 left-0  p-10">
      <h1 className="text-6xl mb-16">PREFACE</h1>
      <SidebarMenu
        name="계좌목록"
        isSelected={current === "account"}
        callback={() => navigateTo(`/?current=account&page=${page}`)}
      />
      <SidebarMenu
        name="사용자"
        isSelected={current === "user"}
        callback={() => navigateTo(`${ROUTE_PATH.USER}?current=user`)}
      />
      <SidebarMenu name="로그아웃" isSelected={current === "logout"} callback={handleLogout} />
    </div>
  );
};

export default Sidebar;
