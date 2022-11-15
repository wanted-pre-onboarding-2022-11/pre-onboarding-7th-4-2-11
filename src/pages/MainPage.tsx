import { fetchDataAPI } from "../App";
import React, { useEffect } from "react";

const MainPage = () => {
  useEffect(() => {
    fetchDataAPI.getUserList().then((data) => console.log(data));
    fetchDataAPI.getAccountList().then((data) => console.log(data));
  }, []);

  return (
    <div className="min-h-screen">
      <p>Main</p>
      <p>newface@dco.com</p>
    </div>
  );
};

export default MainPage;
