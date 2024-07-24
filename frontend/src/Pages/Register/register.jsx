import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { customToast } from "../../Utils/toasts";
import { Form, Formik } from "formik";

export default function Register() {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .required("required")
      .min(3, "name must be at least 3 characters"),
    email: yup.string().email("invalid email").required("required"),
    password: yup
      .string()
      .required("required")
      .min(6, "password must be at least 6 characters"),
    address: yup
      .string()
      .required("required")
      .min(10, "address must be at least 10 characters"),
    phone: yup
      .string()
      .required("required")
      .min(10, "phone must be at least 10 characters"),
  });
  const initialValuesSignUp = {
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  };

  const submitForm = async (values) => {
    try {
      const formData = new FormData();
      for (const value in values) {
        console.log(value);
        console.log(values[value]);
        formData.append(value, values[value]);
      }
      const res = await axios.post(`${backendUrl}/register`, formData);

      console.log(res);

      toast.success("Registered successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => navigate("/login"),
      });
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (typeof errorData === "object") {
          const messages = Object.values(errorData).flat().join(", ");
          toast.error(`Error: ${messages}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error("An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } else {
        customToast("error", error.message);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValuesSignUp}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          console.log(values);
          submitForm(values);
        }}
      >
        {(props) => (
          <Form className="flex flex-col">
            <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
              <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Name
                    </label>
                    <input
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                      name="name"
                      type="text"
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="Enter Your Name"
                    />
                  </div>

                  {props.errors.name && (
                    <p id="feedback" className="text-red-500">
                      {props.errors.name}
                    </p>
                  )}

                  <div>
                    <label className="text-gray-800 text-sm block">
                      Phone number
                    </label>
                    <input
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.phone}
                      name="phone"
                      type="text"
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="0123 456 7890"
                    />
                  </div>
                  {props.errors.phone && (
                    <p id="feedback" className="text-red-500">
                      {props.errors.phone}
                    </p>
                  )}

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Address
                    </label>
                    <input
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.address}
                      name="address"
                      type="text"
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="Enter Your Address"
                    />
                  </div>
                  {props.errors.address && (
                    <div id="feedback" className="text-red-500">
                      {props.errors.address}
                    </div>
                  )}

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Email
                    </label>
                    <input
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      name="email"
                      type="email"
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="Enter email"
                    />
                  </div>
                  {props.errors.email && (
                    <p id="feedback" className="text-red-500">
                      {props.errors.email}
                    </p>
                  )}

                  <div>
                    <label class="text-gray-800 text-sm mb-2 block">
                      Password
                    </label>
                    <input
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password}
                      name="password"
                      type="password"
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="Enter password"
                    />
                  </div>
                  {props.errors.password && (
                    <p id="feedback" className="text-red-500">
                      {props.errors.password}
                    </p>
                  )}
                </div>

                <div class="!mt-12">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Create an account
                  </button>
                </div>
                <p className="text-gray-800 text-sm mt-6 text-center">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
