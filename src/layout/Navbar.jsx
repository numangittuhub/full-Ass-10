import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    Swal.fire("Logged Out!", "See you soon!", "success");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold tracking-wider">
            CleanCity
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-cyan-200 transition">Home</Link>
            {user ? (
              <>
                <Link to="/all-issues" className="hover:text-cyan-200 transition">All Issues</Link>
                <Link to="/add-issue" className="hover:text-cyan-200 transition">Add Issue</Link>
                <Link to="/my-issues" className="hover:text-cyan-200 transition">My Issues</Link>
                <Link to="/my-contribution" className="hover:text-cyan-200 transition">My Contribution</Link>

                <div className="relative group">
                  <button className="flex items-center space-x-2 hover:text-cyan-200">
                    <User size={20} />
                    <span>{user.displayName || user.email?.split("@")[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-cyan-200 transition">Login</Link>
                <Link to="/register" className="hover:text-cyan-200 transition">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden"
          >
            {mobileMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden pb-4">
            {user ? (
              <>
                <Link to="/all-issues" className="block py-2">All Issues</Link>
                <Link to="/add-issue" className="block py-2">Add Issue</Link>
                <Link to="/my-issues" className="block py-2">My Issues</Link>
                <button onClick={handleLogout} className="block py-2 text-red-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2">Login</Link>
                <Link to="/register" className="block py-2">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}