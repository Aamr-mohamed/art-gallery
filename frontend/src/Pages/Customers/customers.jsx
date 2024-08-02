import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersTable from "../../Components/Table/usersTable";
import Sidebar from "../../Components/Sidebar/sidebar";
import { customToast } from "../../Utils/toasts";

export default function Customers() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [customers, setCustomers] = useState([]);

  async function onDelete(id) {
    try {
      const response = await axios.delete(`${apiUrl}/user/${id}`);
      customToast("User deleted successfully", "success");
    } catch (error) {
      customToast(error.response.data.message, "error");
    }
  }
  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        const users = response.data.users;
        setCustomers(users);
      } catch (error) {
        customToast(error.response.data.message, "error");
      }
    }
    getAllUsers();
  }, []);

  return (
    <div className="w-full flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 p-5">
        <h1 className="text-3xl font-bold text-center my-5">Admin Panel</h1>
        <h1 className="text-3xl font-bold my-5">Customers</h1>
        <UsersTable data={[customers]} onDelete={onDelete} />
      </div>
    </div>
  );
}
