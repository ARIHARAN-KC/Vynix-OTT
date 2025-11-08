import React from "react";
import Navbar from "../Navbar/Navbar";

const Layout = ({ children, showNavbar = false }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B17] via-[#1A0B2E] to-[#2D0B45] flex flex-col">
      {/* Navbar (only when showNavbar=true) */}
      {showNavbar && <Navbar />}

      {/* Main content area */}
      <main className="flex-1 pt-20 px-4 md:px-8">{children}</main>
    </div>
  );
};

export default Layout;
