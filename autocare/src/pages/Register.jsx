import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Register User
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/users/register", formData);

      toast.success(response.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
  console.log("========== REGISTER ERROR ==========");
  console.log(error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);

    toast.error(error.response.data.message);
  } else if (error.request) {
    console.log("No response received from backend");

    toast.error("Cannot connect to backend server");
  } else {
    console.log("Error:", error.message);

    toast.error(error.message);
  }
} finally {
  setLoading(false);
}
  };

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl p-8">

        <form onSubmit={handleSubmit}>

          <h1 className="text-4xl font-bold text-center text-white">
            Create Account
          </h1>

          <p className="text-center text-gray-400 mt-2 mb-8">
            Join AutoCare Pro Today
          </p>

          {/* Name */}

          <div className="relative mb-5">
            <FaUser className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 p-4 rounded-lg bg-slate-800 text-white outline-none"
            />
          </div>

          {/* Email */}

          <div className="relative mb-5">
            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 p-4 rounded-lg bg-slate-800 text-white outline-none"
            />
          </div>

          {/* Phone */}

          <div className="relative mb-5">
            <FaPhone className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-12 p-4 rounded-lg bg-slate-800 text-white outline-none"
            />
          </div>

          {/* Password */}

          <div className="relative mb-6">
            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 p-4 rounded-lg bg-slate-800 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-lg text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>

        </form>

      </div>
    </section>
  );
}

export default Register;