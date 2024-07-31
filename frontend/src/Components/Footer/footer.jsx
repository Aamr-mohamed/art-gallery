import React from 'react';
export default function Footer() {
	return (
		<footer className="relative bg-blueGray-200 pt-8 pb-6">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap text-left lg:text-left">
					<div className="w-full lg:w-6/12 px-4">
						<h4 className="text-3xl fonat-semibold text-blueGray-700">Let's keep in touch!</h4>
						<h5 className="text-lg mt-0 mb-2 text-blueGray-600">
							Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit. Gravida massa volutpat aenean odio erat nullam fringilla
						</h5>
					</div>
					<div className="w-full lg:w-6/12 px-4">
						<div className="flex flex-wrap items-top mb-6">
							<div className="w-full lg:w-4/12 px-4 ml-auto">
								<span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
								<ul className="list-unstyled">
									<li>
										<a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">About Us</a>
									</li>
									<li>
										<a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Blog</a>
									</li>
									<li>
										<a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Github</a>
									</li>
									<li>
										<a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Free Products</a>
									</li>
								</ul>
							</div>
							<div className="w-full lg:w-4/12 px-4">
								<span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
								<ul className="list-unstyled">
									<li>
										<a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">MIT License</a>
									</li>
									<li>
										<a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Terms &amp; Conditions</a>
									</li>
									<li>
										<a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Privacy Policy</a>
									</li>
									<li>
										<a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="">Contact Us</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
