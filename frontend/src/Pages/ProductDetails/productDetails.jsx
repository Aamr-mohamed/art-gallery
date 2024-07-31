import React, { useEffect, useState } from "react";
import { customToast } from "../../Utils/toasts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/navbar";
import Featured from "../../Components/Featured/featured";
import Footer from "../../Components/Footer/footer";
import { useCart } from "../../Components/Cart/CartContext";

export default function ProductDetails() {
  const { productId } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [product, setProduct] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "customer") {
      customToast("error", "You are not authorized to access this page");
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }

    async function getProduct() {
      try {
        const response = await axios.get(`${apiUrl}/products/${productId}`);
        setProduct(response.data.product);
      } catch (error) {
        customToast("error", error.message);
      }
    }

    getProduct();
  }, [apiUrl, navigate, productId]);

  const handleAddToCart = async () => {
    if (!product.id || !product.price || !product.name) {
      customToast("error", "Product information is incomplete");
      return;
    }

    const cartItem = {
      product_id: product.id,
      quantity: 1,
      name: product.name,
      price: product.price,
      image: product.image,
    };

    const user = JSON.parse(localStorage.getItem("user"));

    if (isLoggedIn && user && user.id) {
      console.log("User is logged in. Adding item to server cart:", cartItem);
      console.log("User is logged in. User ID:", user.id); // Log user ID

      try {
        await axios.post(
          `${apiUrl}/cart`,
          {
            ...cartItem,
            user_id: user.id, // Pass the user ID to the server
          },
          {
            withCredentials: true,
          }
        );
        customToast("success", "Item added to cart");
      } catch (error) {
        console.error("Failed to add item to server cart:", error);
        customToast("error", "Failed to add item to cart");
      }
    } else {
      console.log(
        "User is not logged in or user data is missing. Adding item to local storage cart:",
        cartItem
      );
      addToCart(cartItem);
      customToast("success", "Item added to cart");
    }
  };




  return (
    <div>
      <div className="flex flex-col w-full bg-white">
        <div className="w-full h-16 bg-gray-100">
          <Navbar />
        </div>
        <div className="w-full mb-20">
          <div className="bg-white">
            <div className="pt-6">
              <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                  <img
                    src={`http://localhost:8000/storage/${product.image}`}
                    alt="Model wearing plain white basic tee."
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      {product.name}
                    </h1>
                  </div>
                  <div>
                    <h3 className="sr-only">Description</h3>
                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">
                      Category
                    </h3>
                    <p className="text-base text-gray-900">
                      {product.category}
                    </p>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Details
                    </h2>
                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">
                        The 6-Pack includes two black, two white, and two
                        heather gray Basic Tees. Sign up for our subscription
                        service and be the first to get new, exciting colors,
                        like our upcoming &quot;Charcoal Gray&quot; limited
                        release.
                      </p>
                    </div>
                    <h2 className="text-sm font-medium tracking-tight text-gray-900 mt-8">
                      Price:{" "}
                      <p className="text-sm text-gray-600">{product.price}$</p>
                    </h2>
                    <h2 className="text-sm font-medium tracking-tight text-gray-900 mt-8">
                      In Stock: {product.stock}
                    </h2>
                    <button
                      onClick={handleAddToCart}
                      type="button"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <Featured />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
