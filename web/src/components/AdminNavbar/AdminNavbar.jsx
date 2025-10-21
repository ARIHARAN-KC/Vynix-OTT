import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaCog, FaUserCircle } from "react-icons/fa";
import vynixLogo from "../../assets/logo/vynix.png";
import { useAuth } from "../../contexts/AuthContext";

const AdminNavbar = () => {
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

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setIsUserMenuOpen(false);
  };

  // Get user display name with fallbacks
  const getUserDisplayName = () => {
    if (user?.userName) return user.userName;
    if (user?.email) return user.email.split('@')[0]; // Show username part of email
    return "Admin";
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
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/admin">
              <img src={vynixLogo} alt="Vynix" className="h-14 lg:h-16 w-auto" />
            </Link>
            {/* Admin Badge */}
            <span className="ml-4 px-3 py-1 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-full text-xs font-bold text-white">
              ADMIN
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Auth Buttons / User Menu */}
            {user ? (
              <div className="flex items-center space-x-2 lg:space-x-3 user-menu">
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
                              <FaUserCircle className="text-white text-sm" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">
                              {getUserDisplayName()}
                            </p>
                            <p className="text-white/60 text-xs truncate">
                              {user.email || "No email"}
                            </p>
                            <div className="mt-1">
                              <span className="px-2 py-0.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-full text-xs font-bold text-white">
                                Administrator
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          to="/admin"
                          className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 rounded-lg transition-all duration-300 group"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaUserCircle className="text-white/60 group-hover:text-white text-sm" />
                          <span>Dashboard</span>
                        </Link>
                        
                        <Link
                          to="/admin/settings"
                          className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 rounded-lg transition-all duration-300 group"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaCog className="text-white/60 group-hover:text-white text-sm" />
                          <span>Admin Settings</span>
                        </Link>

                        {/* Back to Site */}
                        <Link
                          to="/"
                          className="flex items-center space-x-3 w-full px-3 py-2.5 text-sm text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-300 group mt-2"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <span>← Back to Site</span>
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
              {/* Admin Mobile Links */}
              <Link
                to="/admin"
                className="font-medium py-3 text-base text-white/80 hover:text-white transition-all duration-300 border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/settings"
                className="font-medium py-3 text-base text-white/80 hover:text-white transition-all duration-300 border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                Admin Settings
              </Link>
              <Link
                to="/"
                className="font-medium py-3 text-base text-blue-400 hover:text-blue-300 transition-all duration-300 border-b border-white/5"
                onClick={() => setIsOpen(false)}
              >
                ← Back to Site
              </Link>

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
                        <FaUserCircle className="text-white text-sm" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-white/60 text-xs truncate">
                        {user.email || "No email"}
                      </p>
                      <div className="mt-1">
                        <span className="px-2 py-0.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-full text-xs font-bold text-white">
                          Administrator
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
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

export default AdminNavbar;