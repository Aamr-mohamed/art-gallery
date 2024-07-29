import React from 'react';
import { useNavigate } from "react-router-dom";

export default function ItemCard({ products }) {
	const navigate = useNavigate();
	return (
		<div className="mt-6 grid gap-x-6 gap-y-10 xl:gap-x-8" onClick={() => navigate(`/productdetails/${products.id}`)}>
			<div className="group relative">
				<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
					{!products.image || products.image == null ?
						<img src="/missing.png" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
						:
						<img src={`http://localhost:8000/storage/${products.image}`} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
					}
				</div>
				<div className="mt-4 flex justify-between">
					<div>
						<h3 className="text-sm text-gray-700">
							<span aria-hidden="true" className="absolute inset-0"></span>
							{products.name}
						</h3>
						<p className="text-sm font-medium text-gray-900">${products.price}</p>
					</div>
					<p className="text-sm font-medium text-gray-900">{products.category}</p>
				</div>
			</div>

		</div>
	);
}
