import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { customToast } from "../../Utils/toasts";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "customer") {
      customToast("error", "You are not authorized to access this page");
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">Home</h1>
      <a href="/login" className="">
        Login
      </a>
      <a href="/register">Register</a>
    </div>
  );
}
