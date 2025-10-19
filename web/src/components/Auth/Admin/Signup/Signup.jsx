import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAdminSignupMutation } from "C:/ZenTech/projects/Vynix-ZenTech/web/src/components/Auth/Admin/Signup/slice.js"; 

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [adminSignup] = useAdminSignupMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Call the RTK Query mutation instead of authService
      const response = await adminSignup({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        role: "admin",
      }).unwrap();

      if (response?.user) {
        localStorage.setItem("admin", JSON.stringify(response.user));
        navigate("/Admindashboard");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error?.data?.message || "Admin registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B17] via-[#1A0B2E] to-[#2D0B45] flex items-center justify-center p-4 font-['Inter']">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mt-4">Admin Registration</h1>
          <p className="text-white/60 mt-2">
            Create admin account for Vynix management
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Admin Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] transition-all duration-300 outline-none"
              placeholder="Choose admin username"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Admin Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] transition-all duration-300 outline-none"
              placeholder="Enter admin email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] transition-all duration-300 outline-none"
                placeholder="Create admin password (min. 8 characters)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] transition-all duration-300 outline-none"
                placeholder="Confirm admin password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-300"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={16} />
                ) : (
                  <FaEye size={16} />
                )}
              </button>
            </div>
          </div>

          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <p className="text-blue-400 text-sm text-center">
              <strong>Admin Account:</strong> This registration will create an
              administrator account with full system access.
            </p>
          </div>

          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              required
              className="w-4 h-4 mt-1 rounded bg-white/5 border-white/10 text-[#7b2ff7] focus:ring-[#7b2ff7] focus:ring-offset-[#0B0B17]"
            />
            <span className="text-sm text-white/60">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-[#7b2ff7] hover:text-[#ff4ec0] transition-colors duration-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-[#7b2ff7] hover:text-[#ff4ec0] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-2xl font-semibold text-white hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating Admin Account...</span>
              </div>
            ) : (
              "Create Admin Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-white/60">
            Already have an admin account?{" "}
            <Link
              to="/admin/login"
              className="text-[#7b2ff7] hover:text-[#ff4ec0] font-medium transition-colors duration-300"
            >
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
