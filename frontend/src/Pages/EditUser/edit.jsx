import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as yup from "yup";
import { Formik, Form } from "formik";
import { customToast } from "../../Utils/toasts";
import { useNavigate } from "react-router-dom";


export default function Edit() {
	const { id } = useParams()
	const apiUrl = process.env.REACT_APP_API_URL
	const navigate = useNavigate();
	const [user, setUser] = useState(null)


	const editSchema = yup.object().shape({
		name: yup
			.string()
			.min(3, "name must be at least 3 characters"),
		email: yup.string().email("invalid email"),
		password: yup
			.string()
			.min(6, "password must be at least 6 characters"),
		address: yup
			.string()
			.min(10, "address must be at least 10 characters"),
		phone: yup
			.string()
			.min(10, "phone must be at least 10 characters"),
	});
	const initialValuesEdit = {
		name: "",
		phone: "",
		address: "",
		email: "",
		password: "",
	};


	const submitForm = async (values) => {
		try {
			const res = await axios.patch(`${apiUrl}/user/${id}`, values, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log(res);

			customToast("success", "User updated successfully");
		} catch (error) {
			if (error.response && error.response.data) {
				const errorData = error.response.data;
				if (typeof errorData === "object") {
					const messages = Object.values(errorData).flat().join(", ");
					customToast("error", `Error: ${messages}`);
				} else {
					customToast("error", "An error occurred. Please try again.");
				}
			} else {
				customToast("error", error.message);
			}
		}
	};
	useEffect(() => {
		async function getUserById(id) {
			const data = await axios.get(`${apiUrl}/user/${id}`)
			const user = data.data.user
			setUser(user)
		}
		getUserById(id)
	}, [])
	return (
		<div>
			<div className="flex items-center justify-center p-12">
				<button onClick={() => navigate(-1)} className="absolute top-3 right-3 text-white bg-[#6A64F1] hover:bg-[#6A64F1] focus:outline-none rounded-full p-2 text-sm">Go Back</button>
				<div className="mx-auto w-full max-w-[550px] bg-white">

					{user && (
						<Formik
							initialValues={user}
							validationSchema={editSchema}
							onSubmit={(values) => {
								console.log(values);
								submitForm(values);
							}}
						>
							{(props) => (
								<Form>
									<div className="mb-5">
										<label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
											Full Name
										</label>
										<input onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.name} type="text" name="name" id="name" placeholder="Enter new name"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
									</div>
									<div className="mb-5">
										<label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
											Phone Number
										</label>
										<input
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.phone}
											type="text" name="phone" id="phone" placeholder="Enter your phone number"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
									</div>


									<div className="mb-5">
										<label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">
											Address
										</label>
										<input
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.address}
											type="text" name="address" id="address" placeholder="Enter new address"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
									</div>

									<div className="mb-5">
										<label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
											Email Address
										</label>
										<input
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.email}
											type="email" name="email" id="email" placeholder="Enter new email"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
									</div>


									<div className="mb-5">
										<label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
											Password
										</label>
										<input
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.password}
											type="password" name="password" id="password" placeholder="Enter new password"
											className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
									</div>


									<div>
										<button
											className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" type="submit">
											Save Changes
										</button>
									</div>
								</Form>
							)}
						</Formik>
					)}
				</div>
			</div>
		</div>
	)
}
