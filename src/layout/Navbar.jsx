// src/layout/Navbar.jsx
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, Sun, Moon } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    Swal.fire({
      icon: "success",
      title: "Logged Out!",
      text: "See you soon!",
      timer: 1500,
    });
    navigate("/");
    setMobileMenu(false); // মোবাইলে লগআউট করলে মেনু বন্ধ
  };

  // মোবাইলে কোনো লিঙ্কে ক্লিক করলে মেনু বন্ধ করবে
  const handleMobileLinkClick = () => {
    setMobileMenu(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wider" onClick={handleMobileLinkClick}>
            CleanCity
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-cyan-200 transition">Home</Link>

            {user ? (
              <>
                <Link to="/all-issues" className="hover:text-cyan-200 transition">All Issues</Link>
                <Link to="/add-issue" className="hover:text-cyan-200 transition">Add Issue</Link>
                <Link to="/my-issues" className="hover:text-cyan-200 transition">My Issues</Link>
                <Link to="/my-contribution" className="hover:text-cyan-200 transition">My Contribution</Link>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-white/20 transition"
                  title={darkMode ? "Light Mode" : "Dark Mode"}
                >
                  {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                </button>

                {/* Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 hover:text-cyan-200 transition">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                      <User size={18} />
                    </div>
                    <span className="hidden lg:block">
                      {user.displayName || user.email?.split("@")[0]}
                    </span>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-gray-800 hover:bg-red-50 flex items-center gap-3 transition"
                    >
                      <LogOut size={18} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-cyan-200 transition">Login</Link>
                <Link to="/register" className="hover:text-cyan-200 transition">Register</Link>

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-white/20 transition"
                >
                  {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Dark Mode in Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-white/20"
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <button onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden pb-4 border-t border-white/20 mt-3 pt-4">
            {user ? (
              <>
                <Link to="/" onClick={handleMobileLinkClick} className="block py-2 hover:text-cyan-200">Home</Link>
                <Link to="/all-issues" onClick={handleMobileLinkClick} className="block py-2 hover:text-cyan-200">All Issues</Link>
                <Link to="/add-issue" onClick={handleMobileLinkClick} className="block py-2 hover:text-cyan-200">Add Issue</Link>
                <Link to="/my-issues" onClick={handleMobileLinkClick} className="block py-2 hover:text-cyan-200">My Issues</Link>
                <Link to="/my-contribution" onClick={handleMobileLinkClick} className="block py-2 hover:text-cyan-200">My Contribution</Link>
                <button onClick={handleLogout} className="block py-2 text-red-300 hover:text-red-200 w-full text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" onClick={handleMobileLinkClick} className="block py-2 hover:text-cyan-200">Home</Link>
                <Link to="/login" onClick={handleMobileLinkClick} className="block py-2 hover:text-cyan-200">Login</Link>
                <Link to="/register" onClick={handleMobileLinkClick} className="block py-2 hover:text-cyan-200">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}