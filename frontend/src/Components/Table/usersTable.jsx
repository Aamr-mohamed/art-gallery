import React from "react";
import { useNavigate } from "react-router-dom";

const UserTable = ({ data, onDelete }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  return (
    <table className="table-auto w-full text-left bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Phone</th>
          <th className="px-4 py-2">Address</th>
          <th className="px-4 py-2">Role</th>
          <th className="px-4 py-2">Created At</th>
          <th className="px-4 py-2">Updated At</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) =>
          item.map((user) => (
            <tr key={user.id} className="border border-gray-200">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2">{user.address}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{formatDate(user.created_at)}</td>
              <td className="px-4 py-2">{formatDate(user.updated_at)}</td>
              <td className="px-4 py-2 flex items-center space-x-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => navigate(`/adminpanel/edit/${user.id}`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          )),
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
