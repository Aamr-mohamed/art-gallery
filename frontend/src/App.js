import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import AdminPanel from "./Pages/AdminPanel/adminpanel";
import Edit from "./Pages/EditUser/edit";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";
import Customers from "./Pages/Customers/customers";
import Products from './Pages/AdminPanel/products';
import Orders from "./Pages/AdminPanel/Orders";
import ProductsPage from "./Pages/Products/products";
import ProductDetails from "./Pages/ProductDetails/productDetails";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart";
import Checkout from "./Pages/Checkout/Checkout";
import OrderConfirmationPage from "./Pages/OrderConfirmation/OrderConfirmation";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/adminpanel" element={<AdminPanel />} />
				<Route path="/adminpanel/edit/:id" element={<Edit />} />
				<Route path="/adminpanel/customers" element={<Customers />} />
				<Route path="/adminpanel/products" element={<Products />} />
				<Route path="/adminpanel/orders" element={<Orders />} />
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/productdetails/:productId" element={<ProductDetails />} />
				<Route path="/cart" element={<ShoppingCart />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
