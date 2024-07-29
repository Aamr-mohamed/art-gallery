import React from "react";

const OrdersTable = ({ data, onStatusUpdate }) => {
  return (
    <table className="table-auto w-full text-left bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2">Order Number</th>
          <th className="px-4 py-2">Customer Name</th>
          <th className="px-4 py-2">Total Amount</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr key={order.id} className="border border-gray-200">
            <td className="px-4 py-2">{order.order_number}</td>
            <td className="px-4 py-2">{order.user.name}</td>
            <td className="px-4 py-2">{order.order_total}</td>
            <td className="px-4 py-2">{order.order_status}</td>
            <td className="px-4 py-2 flex items-center space-x-2">
              <select
                value={order.order_status}
                onChange={(e) => onStatusUpdate(order.id, e.target.value)}
                className="p-2 border border-gray-400"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
