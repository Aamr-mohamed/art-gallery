import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./Components/Cart/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
    <CartProvider>
      <ToastContainer transition={Slide} />
      <App />
    </CartProvider>
    </BrowserRouter>
);
