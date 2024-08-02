import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/navbar";
import Footer from "../../Components/Footer/footer";
import axios from "axios";
import { useCart } from "../../Components/Cart/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShoppingCart() {
  const [productDetails, setProductDetails] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [shippingEstimate, setShippingEstimate] = useState(5);
  const [taxEstimate, setTaxEstimate] = useState(8.32);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { cart, updateQuantity, removeFromCart, setCart } = useCart();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.role === "customer") {
      fetchCartFromServer(user.id);
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(localCart);
    }
  }, [setCart]);

  useEffect(() => {
    fetchProductDetails();
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) =>
        acc +
        (productDetails[item.product_id]?.price || 0) * (item.quantity || 0),
      0
    );
    setSubtotal(total);
  }, [productDetails, cart]);

  const fetchCartFromServer = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/cart`, {
        params: { user_id: userId },
        withCredentials: true,
      });
      const cartWithIds = response.data.cart.map((item) => ({
        ...item,
        id: item.id,
      }));
      setCart(cartWithIds);
    } catch (error) {
      console.error("Failed to fetch cart from server:", error);
    }
  };

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

  const handleQuantityChange = async (cartItemId, amount) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const product = productDetails[cartItemId.product_id];
    const maxStock = product?.stock || 0;

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === cartItemId.id) {
          const newQuantity = Math.max(
            1,
            Math.min(item.quantity + amount, maxStock)
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return updatedCart;
    });

    if (user && user.role === "customer") {
      try {
        await axios.put(`${apiUrl}/cart/${cartItemId.id}`, {
          user_id: user.id,
          quantity: Math.max(
            1,
            Math.min(cartItemId.quantity + amount, maxStock)
          ),
        });
        fetchCartFromServer(user.id);
      } catch (error) {
        console.error("Failed to update quantity on server:", error);
      }
    }
  };

  const handleRemoveItem = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "customer") {
      try {
        await axios.delete(`${apiUrl}/cart/${id}`, {
          params: { user_id: user.id },
        });
        fetchCartFromServer(user.id);
      } catch (error) {
        console.error("Failed to remove item from server:", error);
      }
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="flex flex-col w-full bg-white">
      <ToastContainer />
      <div className="w-full h-16 bg-gray-100">
        <Navbar />
      </div>
      <div className="w-full mb-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 pt-24 pb-6">
            Shopping Cart
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 py-6">
                    <div className="flex items-center">
                      <img
                        src={
                          productDetails[item.product_id]?.image
                            ? `http://localhost:8000/storage/${
                                productDetails[item.product_id].image
                              }`
                            : "/default-image.jpg"
                        }
                        alt={
                          productDetails[item.product_id]?.name ||
                          "Product Image"
                        }
                        className="w-24 h-24 object-center object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="text-lg font-bold text-gray-900">
                          {productDetails[item.product_id]?.name ||
                            "Product Name"}
                        </h4>
                        <p className="text-gray-500">
                          ${productDetails[item.product_id]?.price || "0.00"}{" "}
                          USD
                        </p>
                        <div className="mt-2 flex items-center space-x-4">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item, -1)}
                              disabled={item.quantity <= 1}
                              className={`px-2 py-1 border rounded-l-md ${
                                item.quantity <= 1
                                  ? "bg-gray-200 cursor-not-allowed"
                                  : "bg-indigo-600 text-white hover:bg-indigo-700"
                              }`}
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-t border-b">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item, 1)}
                              disabled={
                                item.quantity >=
                                (productDetails[item.product_id]?.stock || 0)
                              }
                              className={`px-2 py-1 border rounded-r-md ${
                                item.quantity >=
                                (productDetails[item.product_id]?.stock || 0)
                                  ? "bg-gray-200 cursor-not-allowed"
                                  : "bg-indigo-600 text-white hover:bg-indigo-700"
                              }`}
                            >
                              +
                            </button>
                          </div>
                          {item.quantity >=
                            (productDetails[item.product_id]?.stock || 0) &&
                            productDetails[item.product_id]?.stock > 0 && (
                              <p className="text-sm text-red-500 ml-4">
                                Maximum stock reached
                              </p>
                            )}
                          {productDetails[item.product_id]?.stock === 0 && (
                            <p className="text-sm text-red-500 ml-4">
                              Out of stock
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="ml-auto">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Your cart is empty.</p>
              )}
            </div>
            <div className="lg:col-span-4">
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-sm text-gray-900">
                      ${subtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Shipping Estimate</p>
                    <p className="text-sm text-gray-900">
                      ${shippingEstimate.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Tax Estimate</p>
                    <p className="text-sm text-gray-900">
                      ${taxEstimate.toFixed(2)}
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-base font-medium text-gray-900">
                      ${(subtotal + shippingEstimate + taxEstimate).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/checkout">
                    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
