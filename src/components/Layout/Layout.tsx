import { deleteFetchData } from "../../utils/localStorage";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { useSearchParams } from "react-router-dom";
import Footer from "./Footer/Footer";

interface LayoutDefaultProps {
  children?: React.ReactElement;
}

const Layout = ({ children }: LayoutDefaultProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const current: string | null = searchParams.get("current");
  const title: string | null = location.pathname.includes("detail") ? "detail" : "";

  const navigateTo = (target: string): void => {
    navigate(`${target}`);
  };

  const handleLogout = () => {
    deleteFetchData();
    navigate("/login");
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-full basis-1/4 bg-slate-200">
        <Sidebar current={current} navigateTo={navigateTo} handleLogout={handleLogout} />
      </div>
      <div className="basis-3/4 min-h-screen">
        <Header current={current} title={title} />
        {children || <Outlet />}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
