import React, { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import axios from 'axios';
import Dropdown from './dropDown';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
	const apiUrl = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logout = () => {
		localStorage.removeItem('user');
		setIsLoggedIn(false);
		navigate('/login');
	}


	useEffect(() => {
		// async function getAllProducts() {
		// 	const response = await axios.get(`${apiUrl}/products`);
		// 	const allProducts = response.data.products;
		// 	console.log(allProducts);
		// 	setProducts(allProducts);
		// }

		if (user) {
			setIsLoggedIn(true);
		}
		// getAllProducts();
	}, []);
	return (
		<div className="h-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 relative">
			{/* MOBILE */}
			<div className="h-full flex items-center justify-between md:hidden">
				<a href="/">
					<div className="text-2xl tracking-wide">Musea</div>
				</a>
			</div>
			{/* BIGGER SCREENS */}
			<div className="hidden md:flex items-center justify-between gap-8 h-full">
				{/* LEFT */}
				<div className="w-1/3 xl:w-1/2 flex items-center gap-12">
					<a href="/" className="flex items-center gap-3">
						<div className="text-2xl tracking-wide">Musea</div>
					</a>
					<div className="hidden xl:flex gap-4">
						<a href="/">Homepage</a>
						<a href="/products">Products</a>
						<a href="/">Cart</a>
						<a href="/">Checkout</a>
					</div>
				</div>
				<div className="w-2/3 xl:w-1/2 flex items-center justify-end gap-14">
					{/*
					<div className="relative flex items-center w-[70%] h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
						<div className="grid place-items-center h-full w-12 text-gray-300">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>

						<input
							className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
							type="text"
							id="search"
							placeholder="Search something.." />
					</div>
*/}
					<Dropdown logout={logout} isLoggedIn={isLoggedIn} userName={isLoggedIn ? user.name : ''} />
				</div>
			</div>
		</div>
	);
};

