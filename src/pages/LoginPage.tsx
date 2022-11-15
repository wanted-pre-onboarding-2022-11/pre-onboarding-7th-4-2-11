import LoginForm from "../components/LoginForm";
import React from "react";
import { fetchDataAPI } from "../App";
import { useNavigate } from "react-router-dom";
import { ILoginFormData } from "../types";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (loginFormData: ILoginFormData) => {
    try {
      await fetchDataAPI.tryLogin(loginFormData);
      navigate("/?current=account");
    } catch (error) {
      alert("Check Your Email Or Password");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
