import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useLoginMutation } from "./slice"; 
import { useAuth } from "../../../contexts/AuthContext";
import authService from "../../../services/authService";
import AdminDashboard from "../../../pages/Admin/AdminDashboard";
import Home from "../../../pages/Home/Home";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Call RTK Query Login
      const response = await login(formData).unwrap();

      // Fallback: authService login (if needed)
      const loginResponse = await authService.login(formData);

      const userData = response?.user || loginResponse?.user;

      if (response?.token && userData) {
        localStorage.setItem("token", response.token);
        authLogin(userData);

        // Role-based redirect
        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("Invalid login response.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
    window.location.href = `${API_URL}/account/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B17] via-[#1A0B2E] to-[#2D0B45] flex items-center justify-center p-4 font-['Inter']">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mt-4">Welcome Back</h1>
          <p className="text-white/60 mt-2">Sign in to continue your anime journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Google OAuth */}
        <div className="mb-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-center space-x-2">
              <FaGoogle className="text-xl text-white" />
              <span className="text-white/80 text-sm font-medium">Continue with Google</span>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white/40">Or continue with email</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-2xl font-semibold text-white hover:shadow-lg hover:shadow-[#ff4ec0]/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white/60">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#7b2ff7] hover:text-[#ff4ec0] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
