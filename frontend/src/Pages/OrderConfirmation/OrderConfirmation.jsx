import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/orders/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId, apiUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
      <h2 className="text-xl font-semibold mb-4">
        Order Number: {orderDetails.order_number}
      </h2>
      <h2 className="text-xl font-semibold mb-4">
        Order Status: {orderDetails.order_status}
      </h2>

      <div className="border rounded-lg p-6 mb-4">
        <h3 className="text-lg font-semibold mb-4">User Details</h3>
        <p>Name: {orderDetails.user.name}</p>
        <p>Email: {orderDetails.user.email}</p>
        <p>Phone: {orderDetails.user.phone}</p>
        <p>Address: {orderDetails.user.address}</p>
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Order Items</h3>
        <div className="space-y-4">
          {orderDetails.items.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={
                    item.product.image
                      ? `http://localhost:8000/storage/${item.product.image}`
                      : "/default-image.jpg"
                  }
                  alt={item.product.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.product_quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold">
                ${item.product_subtotal}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>${orderDetails.order_total}</p>
        </div>
      </div>

      <Link
        to="/"
        className="mt-4 inline-block p-2 bg-gray-800 text-white rounded"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;

