import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../Components/Cart/CartContext";
import Navbar from "../../Components/Navbar/navbar";

const CheckoutPage = () => {
  const [productDetails, setProductDetails] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(90);
  const [total, setTotal] = useState(0);
  const [userDetails, setUserDetails] = useState({});

  const apiUrl = process.env.REACT_APP_API_URL;
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
    fetchUserDetails();
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) =>
        acc +
        (productDetails[item.product_id]?.price || 0) * (item.quantity || 0),
      0
    );
    setSubtotal(total);
    setTotal(total + shippingCharges);
  }, [productDetails, cart, shippingCharges]);

  const fetchProductDetails = async () => {
    const productIds = [...new Set(cart.map((item) => item.product_id))];
    try {
      const responses = await Promise.all(
        productIds.map((id) => axios.get(`${apiUrl}/products/${id}`))
      );
      const details = responses.reduce((acc, response) => {
        const product = response.data.product;
        acc[product.id] = product;
        return acc;
      }, {});
      setProductDetails(details);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  const fetchUserDetails = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserDetails(user || {});
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/checkout`, {
        user_id: userDetails.id,
        cart_items: cart,
        total: total,
      });
      console.log(response.data.message);
      setCart([]);
      navigate(`/order-confirmation/${response.data.order_id}`);
    } catch (error) {
      console.error("Failed to process checkout:", error);
    }
  };

  return (
    <><Navbar />
    <div className="container mx-auto p-4">
          <Link to="/cart" className="flex items-center mb-6 text-sm text-gray-600">
              <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go back to cart
          </Link>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                  <div className="bg-white shadow-md rounded-lg p-6">
                      <h2 className="text-xl font-semibold mb-4">User Details</h2>
                      <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                          <div>
                              <label
                                  htmlFor="name"
                                  className="block text-sm font-medium text-gray-700"
                              >
                                  Name
                              </label>
                              <input
                                  type="text"
                                  id="name"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  value={userDetails.name || ""}
                                  readOnly />
                          </div>
                          <div>
                              <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-700"
                              >
                                  Email
                              </label>
                              <input
                                  type="email"
                                  id="email"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  value={userDetails.email || ""}
                                  readOnly />
                          </div>
                          <div>
                              <label
                                  htmlFor="phone"
                                  className="block text-sm font-medium text-gray-700"
                              >
                                  Phone
                              </label>
                              <input
                                  type="tel"
                                  id="phone"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  value={userDetails.phone || ""}
                                  readOnly />
                          </div>
                          <div>
                              <label
                                  htmlFor="address"
                                  className="block text-sm font-medium text-gray-700"
                              >
                                  Address
                              </label>
                              <input
                                  type="text"
                                  id="address"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                  value={userDetails.address || ""}
                                  readOnly />
                          </div>
                          <button
                              type="submit"
                              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                              Proceed to payment
                          </button>
                      </form>
                  </div>
              </div>

              <div className="w-full md:w-1/2">
                  <div className="bg-white shadow-md rounded-lg p-6">
                      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                      <div className="space-y-4">
                          {cart.map((item) => (
                              <div
                                  key={item.id}
                                  className="flex items-center justify-between border-b pb-4"
                              >
                                  <div className="flex items-center">
                                      <img
                                          src={productDetails[item.product_id]?.image
                                              ? `http://localhost:8000/storage/${productDetails[item.product_id].image}`
                                              : "/default-image.jpg"}
                                          alt={productDetails[item.product_id]?.name || "Product"}
                                          className="w-20 h-20 object-cover mr-4" />
                                      <div>
                                          <p className="font-semibold">
                                              {productDetails[item.product_id]?.name || "Product"}
                                          </p>
                                          <p className="text-sm text-gray-600">
                                              Quantity: {item.quantity}
                                          </p>
                                      </div>
                                  </div>
                                  <p className="font-semibold">
                                      $
                                      {(
                                          (productDetails[item.product_id]?.price || 0) *
                                          item.quantity
                                      ).toFixed(2)}
                                  </p>
                              </div>
                          ))}
                      </div>
                      <div className="mt-6 space-y-2">
                          <div className="flex justify-between">
                              <p>Total Items</p>
                              <p>{cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                          </div>
                          <div className="flex justify-between">
                              <p>Subtotal</p>
                              <p>${subtotal.toFixed(2)}</p>
                          </div>
                          <div className="flex justify-between">
                              <p>Shipping Charges</p>
                              <p>${shippingCharges.toFixed(2)}</p>
                          </div>
                          <div className="flex justify-between font-semibold text-lg">
                              <p>Total</p>
                              <p>${total.toFixed(2)}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div></>
  );
};

export default CheckoutPage;
