import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../Components/Navbar/dropDown';

export default function NavBar() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logout = () => {
		localStorage.removeItem('user');
		setIsLoggedIn(false);
		navigate('/login');
	}

	useEffect(() => {
		if (user) {
			setIsLoggedIn(true);
		}
	}, []);
	return (
		<nav class="bg-[#ffffff]">
			<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div class="relative flex h-16 items-center justify-between">
					<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<a href="/" class="text-2xl font-medium text-black">Admin Panel
						</a>
					</div>
					<div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<div class="relative ml-3">
							<div>
								<Dropdown logout={logout} isLoggedIn={isLoggedIn} userName={isLoggedIn ? user.name : ''} />
							</div>

						</div>
					</div>
				</div>
			</div>
		</nav >
	)
}
