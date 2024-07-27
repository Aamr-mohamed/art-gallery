import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/sidebar";
import UsersTable from "../../Components/Table/usersTable";
import axios from "axios";
import { customToast } from "../../Utils/toasts";

export default function AdminPanel() {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/user/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      customToast("success", "User deleted successfully");
    } catch (error) {
      customToast("error", error.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      customToast("error", "You are not authorized to access this page");
      navigate("/login");
    }
    async function getUsers() {
      try {
        const response = await axios.get(`${backendUrl}/users`, {
          params: {
            _limit: 5,
          },
        });
        setUsers(response.data.users.slice(0, 5));
      } catch (error) {
        customToast("error", error.message);
      }
    }
    getUsers();
  }, []);

  return (
    <div className="w-full flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 p-5">
        <h1 className="text-3xl font-bold text-center my-5">Admin Panel</h1>
        <h2 className="text-3xl font-bold my-5">Customers</h2>
        <UsersTable data={[users]} onDelete={onDelete} />

        <h2 className="text-3xl font-bold my-5">Orders</h2>
      </div>
    </div>
  );
}
