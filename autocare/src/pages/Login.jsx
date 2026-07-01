import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending Login Request...");

      const response = await API.post("/users/login", formData);

      console.log("Login Response:", response.data);

      // Save JWT Token
      localStorage.setItem("token", response.data.token);

      // Save User Details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      console.log("Token Saved:", localStorage.getItem("token"));
      console.log("User Saved:", localStorage.getItem("user"));

      toast.success("Login Successful");

      // Navigate Immediately
      navigate("/", { replace: true });

    } catch (error) {
      console.log("========== LOGIN ERROR ==========");
      console.log(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        toast.error(error.response.data.message);
      } else if (error.request) {
        console.log("No response received from server");
        toast.error("Cannot connect to backend server");
      } else {
        console.log(error.message);
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
            Welcome Back
          </h1>

          <p className="text-center text-gray-400 mt-2 mb-8">
            Login to AutoCare Pro
          </p>

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
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>

        </form>

      </div>
    </section>
  );
}

export default Login;