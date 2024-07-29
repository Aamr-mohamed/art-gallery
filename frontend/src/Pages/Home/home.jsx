import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Featured from "../../Components/Featured/featured";
import Footer from "../../Components/Footer/footer";
import Navbar from "../../Components/Navbar/navbar";
import NewsLetter from "../../Components/NewsLetter/newsletter";
import ImgSlider from "../../Components/Slider/imgSlider";
import Stats from "../../Components/Stats/stats";
import Testimonial from "../../Components/Testimonial/testimonial";
import { customToast } from "../../Utils/toasts";

export default function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user || user.role !== "customer") {
			customToast("error", "You are not authorized to access this page");
			navigate("/login");
		}
	}, []);
	return (
		<div className="flex flex-col w-full h-screen bg-white">
			<div className="w-full h-16 bg-gray-100">
				<Navbar />
			</div>
			<div className="w-full h-[85%]">
				<ImgSlider />
				<Stats />
				<Featured />
				<Testimonial />
				<NewsLetter />
				<Footer />
			</div>

		</div>
	);
}
