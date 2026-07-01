import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCarSide, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navLink = (path) =>
    `transition duration-300 font-medium ${
      location.pathname === path
        ? "text-blue-400"
        : "text-gray-300 hover:text-blue-400"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold text-white"
        >
          <FaCarSide className="text-blue-500 text-3xl" />
          <span>
            AutoCare <span className="text-blue-500">Pro</span>
          </span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8">

          <Link to="/" className={navLink("/")}>
            Home
          </Link>

          <Link
            to="/services"
            className={navLink("/services")}
          >
            Services
          </Link>

          {user && (
            <Link
              to="/my-bookings"
              className={navLink("/my-bookings")}
            >
              My Bookings
            </Link>
          )}

          {user?.isAdmin && (
            <Link
              to="/admin"
              className={navLink("/admin")}
            >
              Admin
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {user ? (
            <>
              <div className="flex items-center gap-2 text-blue-400 font-medium">
                <FaUserCircle className="text-2xl" />
                <span>{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg font-medium"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-blue-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;