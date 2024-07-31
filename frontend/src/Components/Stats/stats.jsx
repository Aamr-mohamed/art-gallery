import React from 'react';
import { MdDeliveryDining, MdPayment } from "react-icons/md";
import { FaLock } from "react-icons/fa6";

export default function Stats() {
	return (
		<div className="bg-white py-24 sm:py-28">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
					<div className="mx-auto flex max-w-xs flex-col gap-y-4">
						<div className="flex items-center">
							<MdPayment className="text-5xl text-green-400" />
							<dd className="text-3xl font-semibold text-gray-900 sm:text-5xl">Secure Payments</dd>
						</div>
						<dt className="text-base leading-7 text-gray-600">Secure payment options for a hassle-free shopping experience.</dt>
					</div>
					<div className="mx-auto flex max-w-xs flex-col gap-y-4">
						<div className="flex items-center">
							<MdDeliveryDining className="text-5xl text-red-400" />
							<dd className="text-3xl font-semibold text-gray-900 sm:text-5xl">Free Delivery</dd>
						</div>
						<dt className="text-base leading-7 text-gray-600">Enjoy free delivery on all orders up to $100 million delivery.</dt>
					</div>
					<div className="mx-auto flex max-w-xs flex-col gap-y-4">
						<div className="flex items-center">
							<FaLock className="text-5xl text-black" />
							<dd className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Quality Guarantee</dd>
						</div>
						<dt className="text-base leading-7 text-gray-600">We offer a quality guarantee on all our artworks</dt>
					</div>
				</dl>
			</div>
		</div>
	)
}
