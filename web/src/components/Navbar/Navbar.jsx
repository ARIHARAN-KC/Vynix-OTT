import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUser, FaBell, FaSignOutAlt, FaCog, FaUserCircle } from "react-icons/fa";
import vynixLogo from "../../assets/logo/vynix.png";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

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
    setIsUserMenuOpen(false);
  };

  // Get user display name with fallbacks
  const getUserDisplayName = () => {
    if (user?.userName) return user.userName;
    if (user?.email) return user.email.split('@')[0]; // Show username part of email
    return "User";
  };

  // Truncate long text
  const truncateText = (text, maxLength = 20) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-['Inter'] ${
        isScrolled
          ? "bg-[#0B0B17]/95 backdrop-blur-xl shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-8 lg:space-x-12">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img src={vynixLogo} alt="Vynix" className="h-14 lg:h-16 w-auto" />
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
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
              <FaSearch className="text-white/60 text-base" />
              <input
                type="text"
                placeholder="Search anime..."
                className="bg-transparent border-none outline-none w-32 lg:w-60 text-white placeholder-white/60 text-sm lg:text-base"
              />
            </div>

            {/* Auth Buttons / User Menu */}
            {user ? (
              <div className="flex items-center space-x-2 lg:space-x-3 user-menu">
                <button className="p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white/80 hover:text-white">
                  <FaBell size={16} />
                </button>
                
                {/* User Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white/80 hover:text-white"
                  >
                    {user.picture ? (
                      <img 
                        src={user.picture} 
                        alt="Profile" 
                        className="w-6 h-6 lg:w-7 lg:h-7 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle size={18} className="text-white/70" />
                    )}
                    <span className="hidden lg:block text-sm font-medium max-w-24 truncate">
                      {truncateText(getUserDisplayName(), 12)}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-[#0B0B17]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden">
                      {/* User Info Section */}
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          {user.picture ? (
                            <img 
                              src={user.picture} 
                              alt="Profile" 
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] flex items-center justify-center">
                              <FaUser className="text-white text-sm" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">
                              {getUserDisplayName()}
                            </p>
                            <p className="text-white/60 text-xs truncate">
                              {user.email || "No email"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 rounded-lg transition-all duration-300 group"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaUser className="text-white/60 group-hover:text-white text-sm" />
                          <span>Profile</span>
                        </Link>
                        
                        <Link
                          to="/settings"
                          className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 rounded-lg transition-all duration-300 group"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaCog className="text-white/60 group-hover:text-white text-sm" />
                          <span>Settings</span>
                        </Link>

                        {/* Logout Button */}
                        <div className="border-t border-white/10 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300 group"
                          >
                            <FaSignOutAlt className="text-red-400 group-hover:text-red-300 text-sm" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 lg:space-x-3">
                <Link
                  to="/login"
                  className="px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-medium text-white/80 hover:text-white transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-2xl font-semibold text-white hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300 text-sm lg:text-base"
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

              {/* Mobile User Info */}
              {user ? (
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                    {user.picture ? (
                      <img 
                        src={user.picture} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-white/60 text-xs truncate">
                        {user.email || "No email"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Link
                      to="/profile"
                      className="block px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 rounded-lg transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 rounded-lg transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;