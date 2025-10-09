import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaMicrosoft, FaTwitter, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import vynixLogo from "../../../assets/logo/vynix.png";


const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    
    try {
      // Replace with your actual signup logic
      console.log("Signup attempt:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const userData = {
        email: formData.email,
        username: formData.username,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    // Replace with your actual OAuth logic
    console.log(`OAuth signup with: ${provider}`);
    // For demo purposes, we'll simulate a successful signup
    const userData = {
      email: `user@${provider.toLowerCase()}.com`,
      username: `${provider}User`,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/');
  };

  const oauthProviders = [
    { name: "Google", icon: FaGoogle, color: "from-[#4285F4] to-[#34A853]" },
    { name: "Microsoft", icon: FaMicrosoft, color: "from-[#00A4EF] to-[#7FBA00]" },
    { name: "X", icon: FaTwitter, color: "from-[#000000] to-[#71767B]" },
    { name: "Meta", icon: FaFacebook, color: "from-[#1877F2] to-[#42B72A]" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B17] via-[#1A0B2E] to-[#2D0B45] flex items-center justify-center p-4 font-['Inter']">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src={vynixLogo} alt="Vynix" className="h-20 w-auto mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-white mt-4">Join Vynix</h1>
          <p className="text-white/60 mt-2">Create your account and start your anime adventure</p>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {oauthProviders.map((provider) => {
            const Icon = provider.icon;
            return (
              <button
                key={provider.name}
                onClick={() => handleOAuth(provider.name)}
                className={`p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 group`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon className={`text-xl bg-gradient-to-r ${provider.color} bg-clip-text text-transparent`} />
                  <span className="text-white/80 text-sm font-medium group-hover:text-white">
                    {provider.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white/40">Or sign up with email</span>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] transition-all duration-300 outline-none"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-white/40 focus:border-[#7b2ff7] focus:ring-1 focus:ring-[#7b2ff7] transition-all duration-300 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
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
                placeholder="Create a password"
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
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
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
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-300"
              >
                {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              required
              className="w-4 h-4 mt-1 rounded bg-white/5 border-white/10 text-[#7b2ff7] focus:ring-[#7b2ff7] focus:ring-offset-[#0B0B17]"
            />
            <span className="text-sm text-white/60">
              I agree to the{" "}
              <Link to="/terms" className="text-[#7b2ff7] hover:text-[#ff4ec0] transition-colors duration-300">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[#7b2ff7] hover:text-[#ff4ec0] transition-colors duration-300">
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
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-white/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#7b2ff7] hover:text-[#ff4ec0] font-medium transition-colors duration-300"
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