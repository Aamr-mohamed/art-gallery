import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";

const Dropdown = ({ isLoggedIn, logout, userName }) => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleDropdownClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative inline-block text-left z-10">
			<div>
				<button
					type="button"
					className="inline-flex justify-center items-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-neutral-300 focus:outline-none"
					onClick={handleDropdownClick}
				>
					<p className="text-black font-medium whitespace-nowrap">{isLoggedIn ? userName: "Sign In"}</p>
					<IoChevronDown className="text-black ml-2 h-5 w-5" />
				</button>
			</div>

			{isOpen && (
				<div
					className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
				>
					<div className="py-1" role="none">
						{isLoggedIn ?
							<button className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" onClick={() => logout()}>
								Sign Out
							</button> :
							<div>
								<button className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" onClick={() => navigate("/login")}>
									Sign In
								</button>
								<button className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" role="menuitem" onClick={() => navigate("/register")}>
									Sign Up
								</button>
							</div>
						}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
