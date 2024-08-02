import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/sidebar";
import UsersTable from "../../Components/Table/usersTable";
import axios from "axios";
import { customToast } from "../../Utils/toasts";
import NavBar from "./navBar";
import OrdersTable from "../../Components/Table/OrdersTable";
import ProductsTable from "../../Components/Table/productsTable";

export default function AdminPanel() {
	const backendUrl = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [orders, setOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		image: "",
		category: "",
	});
	const [showModal, setShowModal] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [editProductId, setEditProductId] = useState(null);
	const [previewImage, setPreviewImage] = useState("");

	const onDelete = async (id) => {
		try {
			const response = await axios.delete(`${backendUrl}/user/${id}`);
			setUsers(users.filter((user) => user.id !== id));
			customToast("success", "User deleted successfully");
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

	const handleDelete = async (id) => {
		try {
			await axios.delete(`${backendUrl}/products/${id}`);
			setProducts(products.filter(product => product.id !== id));
			customToast("success", "Product deleted successfully");
		} catch (error) {
			customToast("error", error.message);
		}
	};


	const handleOpenModal = (product = null) => {
		if (product) {
			setEditMode(true);
			setEditProductId(product.id);
			setNewProduct({
				name: product.name,
				description: product.description,
				price: product.price,
				stock: product.stock,
				image: product.image,
				category: product.category,
			});
			setPreviewImage(`http://localhost:8000/storage/${product.image}`);
		} else {
			setEditMode(false);
			setNewProduct({
				name: "",
				description: "",
				price: "",
				stock: "",
				image: "",
				category: "",
			});
			setPreviewImage('');
		}
		setShowModal(true);
	};
	console.log(products);
	console.log(orders);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user || user.role !== "admin") {
			customToast("error", "You are not authorized to access this page");
			navigate("/login");
		}
		async function getUsers() {
			try {
				const response = await axios.get(`${backendUrl}/users`);
				setUsers(response.data.users.slice(0, 5));
			} catch (error) {
				customToast("error", error.message);
			}
		}
		async function fetchOrders() {
			try {
				const response = await axios.get(`${backendUrl}/orders`);
				console.log(response.data);
				setOrders(response.data.slice(0, 5));
			} catch (error) {
				customToast("error", error.message);
			}
		}

		const fetchProducts = async () => {
			try {
				const response = await axios.get(`${backendUrl}/products`);
				setProducts(response.data.products.slice(0, 5));
			} catch (error) {
				customToast("error", error.message);
			}
		};
		getUsers();
		fetchProducts();
		fetchOrders();
	}, []);

	return (
		<div className="w-full flex flex-col">
			<div className="w-full flex flex-row">
				<div className="w-1/6">
					<Sidebar />
				</div>
				<div className="w-5/6">
					<NavBar />
					<div className="bg-[#f1f5f9] px-5">
						<h1 className="text-3xl font-bold text-center my-5">Admin Panel</h1>
						<h2 className="text-3xl font-bold my-5">Customers</h2>
						<UsersTable data={[users]} onDelete={onDelete} />

						<h2 className="text-3xl font-bold my-5">Orders</h2>
						<OrdersTable
							data={orders}
							onStatusUpdate={handleStatusUpdate}
						/>

						<h2 className="text-3xl font-bold my-5">Products</h2>
						<ProductsTable
							data={products}
							onDelete={handleDelete}
							onEdit={(product) => handleOpenModal(product)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
