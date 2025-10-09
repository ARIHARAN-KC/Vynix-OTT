import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUser, FaBell, FaSignOutAlt } from "react-icons/fa";
import vynixLogo from "../../assets/logo/vynix.png";

// Import the auth hook from your existing auth system
import { useAuth } from "../../contexts/AuthContext"; // Adjust path based on your actual auth context location

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Use your existing auth context
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "Genres", path: "/genres" },
    { name: "New", path: "/new" },
    { name: "My List", path: "/my-list" },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-['Inter'] ${
        isScrolled
          ? "bg-[#0B0B17]/95 backdrop-blur-xl shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-12">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img src={vynixLogo} alt="Vynix" className="h-16 w-auto" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-base font-medium text-white/80 hover:text-white transition-all duration-300 py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#ff4ec0] after:to-[#7b2ff7] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
              <FaSearch className="text-white/60 text-base" />
              <input
                type="text"
                placeholder="Search anime..."
                className="bg-transparent border-none outline-none w-40 lg:w-60 text-white placeholder-white/60 text-base"
              />
            </div>

            {/* Auth Buttons / User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <button className="p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white/80 hover:text-white">
                  <FaBell size={16} />
                </button>
                <div className="relative group">
                  <button className="p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white/80 hover:text-white">
                    <FaUser size={16} />
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-12 w-48 bg-[#0B0B17]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 text-sm text-gray-300 border-b border-white/10">
                        {user.email || user.username || "User"}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg transition-colors duration-300"
                      >
                        <FaSignOutAlt size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2.5 text-base font-medium text-white/80 hover:text-white transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-2xl font-semibold text-white hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white"
            >
              {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 pt-4 border-t border-white/10 bg-[#0B0B17]/95 backdrop-blur-xl">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-medium py-3 text-base text-white/80 hover:text-white transition-all duration-300 border-b border-white/5 last:border-b-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <div className="flex items-center space-x-3 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mt-4">
                <FaSearch className="text-white/60 text-base" />
                <input
                  type="text"
                  placeholder="Search anime..."
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-white/60 text-base"
                />
              </div>

              {/* Mobile Auth Buttons */}
              {!user ? (
                <div className="flex space-x-3 pt-4 border-t border-white/10">
                  <Link
                    to="/login"
                    className="flex-1 py-3 text-center font-medium text-white/80 hover:text-white transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="flex-1 py-3 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-xl text-center font-semibold text-white hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-white/10">
                  <div className="px-3 py-2 text-sm text-gray-300">
                    {user.email || user.username || "User"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 py-3 text-red-400 hover:bg-white/5 rounded-lg transition-colors duration-300"
                  >
                    <FaSignOutAlt size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;