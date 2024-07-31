import React, { useEffect, useState } from 'react';
import axois from 'axios';
import ItemCard from '../ItemCard/item';

export default function Featured() {
	const apiUrl = process.env.REACT_APP_API_URL;
	const [products, setProducts] = useState([]);

	useEffect(() => {
		async function fetchProducts() {
			const response = await axois.get(`${apiUrl}/products`);
			setProducts(response.data.products.slice(0, 4));
		}
		fetchProducts();
	}, []);
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-4xl font-bold tracking-tight text-gray-900 text-center">Featured Products</h2>

				<div
					id="products"
					class="grid lg:grid-cols-4 lg:gap-5 md:grid-col-2 md:grid-gap-5 sm:grid-cols-1 sm:grid-gap-5 mt-7">
					{products.length > 0 &&
						products.map((product, index) => (
							<ItemCard key={index} products={product} />
						))}
				</div>
			</div>
		</div>
	);
}
