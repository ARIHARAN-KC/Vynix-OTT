import React from 'react';
import { FaPlay, FaPlus, FaStar, FaArrowRight, FaArrowLeft, FaChevronLeft, FaChevronRight, FaPause } from "react-icons/fa";
import vynixLogo from "../../assets/logo/vynix.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0B0B17] to-[#1a1a2e] border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src={vynixLogo} 
                alt="Vynix" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your ultimate destination for premium anime streaming. Watch your favorite shows in stunning 4K quality with no interruptions.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Facebook', 'Instagram', 'Discord'].map((social) => (
                <button
                  key={social}
                  className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 flex items-center justify-center group"
                >
                  <span className="text-white text-sm font-semibold group-hover:scale-110 transition-transform">
                    {social[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Popular Shows', 'New Releases', 'Trending'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-[#ff4ec0] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Categories</h4>
            <ul className="space-y-4">
              {['Action', 'Adventure', 'Fantasy', 'Drama', 'Comedy', 'Supernatural'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-400 hover:text-[#7b2ff7] transition-colors duration-300">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Get notified about new releases and exclusive content.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#ff4ec0] transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Vynix. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff4ec0]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7b2ff7]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
    </footer>
  );
};

export default Footer;