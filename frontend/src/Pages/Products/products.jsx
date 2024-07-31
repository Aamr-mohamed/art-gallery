import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { customToast } from "../../Utils/toasts";
import { FaSearch } from "react-icons/fa";
import Navbar from "../../Components/Navbar/navbar";
import ItemCard from '../../Components/ItemCard/item';
import Footer from '../../Components/Footer/footer';

export default function Products() {
	const navigate = useNavigate();
	const apiUrl = process.env.REACT_APP_API_URL;
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState([]);
	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
	console.log(searchTerm);
	console.log(filteredProducts);
	console.log(products);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user || user.role !== "customer") {
			customToast("error", "You are not authorized to access this page");
			navigate("/login");
		}
		async function getProducts() {
			const response = await axios.get(`${apiUrl}/products`);
			setProducts(response.data.products);
		}
		getProducts();
	}, []);
	return (
		<div className="flex flex-col w-full bg-white">
			<div className="w-full h-16 bg-gray-100">
				<Navbar />
			</div>
			<div className="w-full mb-20 min-h-screen">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>
						<div className="mt-4 flex items-center gap-x-4">
							<div className="relative">
								<form onSubmit={(e) => {
									e.preventDefault();
									setSearchTerm(e.target.search.value);

								}}>
									<input
										type="text"
										name="search"
										className="w-full h-10 pl-3 pr-10 text-sm rounded-lg border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
										placeholder="Search"
									/>
									<button className="absolute inset-y-0 right-0 flex items-center pr-2" type="submit">
										<FaSearch className="h-5 w-5 text-gray-400" />
									</button>
								</form>
							</div>
						</div>

					</div>
					<div
						id="products"
						class="grid lg:grid-cols-4 lg:gap-5 md:grid-col-2 md:grid-gap-5 sm:grid-cols-1 sm:grid-gap-5 mt-7">
						{filteredProducts.map((product) => (
							<ItemCard products={product} />
						))}
					</div>

				</div>


			</div>
			<Footer />
		</div>
	);
}
