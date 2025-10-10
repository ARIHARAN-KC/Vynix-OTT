import React from 'react';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B17] via-[#1A0B2E] to-[#2D0B45]">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;