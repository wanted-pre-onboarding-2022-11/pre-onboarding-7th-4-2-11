import { tryLogin } from "@/lib/apis/auth";
import { LoginForm } from "@/components/domain/Auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (loginFormData: { email: string; password: string }) => {
    try {
      await tryLogin(loginFormData);
      navigate("/?current=account&page=1");
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
