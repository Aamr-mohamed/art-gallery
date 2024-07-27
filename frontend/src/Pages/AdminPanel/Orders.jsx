import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/sidebar";
import axios from "axios";
import { customToast } from "../../Utils/toasts";
import OrdersTable from "../../Components/Table/OrdersTable";

const Orders = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/orders`);
      setOrders(response.data);
    } catch (error) {
      customToast("error", error.message);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`${backendUrl}/orders/${id}`, {
        order_status: newStatus,
      });
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, order_status: newStatus } : order
        )
      );
      customToast("success", "Order status updated successfully");
    } catch (error) {
      customToast("error", error.message);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.order_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-row">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6 p-5">
        <h1 className="text-3xl font-bold text-center my-5">Admin Panel</h1>
        <h2 className="text-3xl font-bold my-5">Orders</h2>

        <input
          type="text"
          placeholder="Search by order number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-5 p-2 border border-gray-400"
        />

        <OrdersTable
          data={filteredOrders}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>
    </div>
  );
};

export default Orders;
