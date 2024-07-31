import React, { useEffect, useState } from "react";
import { customToast } from "../../Utils/toasts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/navbar";
import Featured from "../../Components/Featured/featured";
import Footer from "../../Components/Footer/footer";

export default function ProductDetails() {
	const { productId } = useParams();
	const apiUrl = process.env.REACT_APP_API_URL;
	const [product, setProduct] = useState({});
	const navigate = useNavigate();

	console.log(product);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user || user.role !== "customer") {
			customToast("error", "You are not authorized to access this page");
			navigate("/login");
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
	}, []);
	return (
		<div>
			<div className="flex flex-col w-full bg-white">
				<div className="w-full h-16 bg-gray-100">
					<Navbar />
				</div>
				<div className="w-full mb-20">
					<div class="bg-white">
						<div class="pt-6">
							<div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
								<div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
									<img src={`http://localhost:8000/storage/${product.image}`} alt="Model wearing plain white basic tee." class="h-full w-full object-cover object-center" />
								</div>
								<div>

									<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
										<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
									</div>
									<div>
										<h3 class="sr-only">Description</h3>

										<div class="space-y-6">
											<p class="text-base text-gray-900">{product.description}</p>
										</div>
									</div>

									<div class="mt-10">
										<h3 class="text-sm font-medium text-gray-900">Category</h3>

										<p class="text-base text-gray-900">{product.category}</p>
									</div>

									<div class="mt-10">
										<h2 class="text-sm font-medium text-gray-900">Details</h2>

										<div class="mt-4 space-y-6">
											<p class="text-sm text-gray-600">The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming &quot;Charcoal Gray&quot; limited release.</p>
										</div>

										<h2 class="text-sm font-medium tracking-tight text-gray-900 mt-8">Price: <p className="text-sm text-gray-600">{product.price}$</p></h2>
										<h2 class="text-sm font-medium tracking-tight text-gray-900 mt-8">In Stock: {product.stock}</h2>
										<button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to Cart</button>
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
