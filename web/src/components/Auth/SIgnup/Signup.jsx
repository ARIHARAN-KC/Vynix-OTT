import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { authService } from "../../../services/authService";
import { useSignupMutation } from "./slice";
import { useAuth } from "../../../contexts/AuthContext";

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
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const [signup] = useSignupMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const result = await signup({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      const loginResponse = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (loginResponse.token && loginResponse.user) {
        login(loginResponse.user);
        localStorage.setItem("token", loginResponse.token);
        navigate("/");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const errorMsg =
        err?.data?.message ||
        err?.message ||
        "Signup failed. Please try again.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleSignup = () => {
    setGoogleLoading(true);
    const API_URL =
      import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
    window.location.href = `${API_URL}/account/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B17] via-[#1A0B2E] to-[#2D0B45] flex items-center justify-center p-4 font-['Inter']">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          {/* <img src={vynixLogo} alt="Vynix" className="h-20 mx-auto" /> */}
          <h1 className="text-3xl font-bold text-white mt-4">Join Vynix</h1>
          <p className="text-white/60 mt-2">
            Create your account and start your anime adventure
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Google Signup */}
        <div className="mb-6">
          <button
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="w-full p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center space-x-2">
              {googleLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <FaGoogle className="text-xl text-white" />
              )}
              <span className="text-white/80 text-sm font-medium group-hover:text-white">
                {googleLoading ? "Connecting..." : "Sign up with Google"}
              </span>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white/40">
              Or sign up with email
            </span>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] outline-none"
              placeholder="Choose a username"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
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
                className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] outline-none"
                placeholder="Create a password (min. 8 characters)"
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

          {/* Confirm Password */}
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
                className="w-full px-4 py-3 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] outline-none"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={16} />
                ) : (
                  <FaEye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              required
              className="w-4 h-4 mt-1 rounded bg-white/5 border-white/10 text-[#7b2ff7] focus:ring-[#7b2ff7]"
            />
            <span className="text-sm text-white/60">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-[#7b2ff7] hover:text-[#ff4ec0]"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-[#7b2ff7] hover:text-[#ff4ec0]"
              >
                Privacy Policy
              </Link>
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-2xl font-semibold text-white hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center mt-6">
          <p className="text-white/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#7b2ff7] hover:text-[#ff4ec0] font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
