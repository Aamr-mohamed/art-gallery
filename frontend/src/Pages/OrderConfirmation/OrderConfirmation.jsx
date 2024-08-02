import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaShoppingBag } from "react-icons/fa";
import Navbar from "../../Components/Navbar/navbar";

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed</h1>
          <p className="text-gray-600">Thank you for your purchase!</p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="bg-gray-100 px-6 py-4">
            <h2 className="text-xl font-semibold">Order Details</h2>
          </div>
          <div className="px-6 py-4">
            <p className="mb-2">
              <span className="font-semibold">Order Number:</span>{" "}
              {orderDetails.order_number}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Order Status:</span>{" "}
              <span className="text-green-500">
                {orderDetails.order_status}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="bg-gray-100 px-6 py-4">
            <h3 className="text-xl font-semibold">User Details</h3>
          </div>
          <div className="px-6 py-4">
            <p className="mb-2">
              <span className="font-semibold">Name:</span>{" "}
              {orderDetails.user.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span>{" "}
              {orderDetails.user.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone:</span>{" "}
              {orderDetails.user.phone}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address:</span>{" "}
              {orderDetails.user.address}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="bg-gray-100 px-6 py-4">
            <h3 className="text-xl font-semibold">Order Items</h3>
          </div>
          <div className="px-6 py-4">
            {orderDetails.items.map((item) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between border-b py-4 last:border-b-0"
              >
                <div className="flex items-center">
                  <img
                    src={
                      item.product.image
                        ? `http://localhost:8000/storage/${item.product.image}`
                        : "/default-image.jpg"
                    }
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.product_quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">${item.product_subtotal}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">Total</p>
              <p className="text-xl font-semibold">
                ${orderDetails.order_total}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FaShoppingBag className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
