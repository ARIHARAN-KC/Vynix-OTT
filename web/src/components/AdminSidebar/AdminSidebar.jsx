import React, { useState } from "react";
import { FaChevronDown, FaChevronRight, FaVideo, FaFilm, FaList, FaPlayCircle, FaCog, FaHome } from "react-icons/fa";

const AdminSidebar = () => {
  const [openSections, setOpenSections] = useState({
    anime: true,
    seasons: false,
    episodes: false,
    movies: false,
    playlists: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const MenuSection = ({ title, icon, isOpen, onToggle, children, gradient }) => (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-300 group hover:bg-white/5 ${
          isOpen ? 'bg-white/10' : ''
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} text-white transform group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <span className="font-semibold text-white group-hover:text-[#ff4ec0] transition-colors duration-300">
            {title}
          </span>
        </div>
        {isOpen ? (
          <FaChevronDown className="text-gray-400 text-sm transform group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <FaChevronRight className="text-gray-400 text-sm transform group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>
      
      <div className={`ml-4 mt-2 space-y-1 transition-all duration-300 ${
        isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
      }`}>
        {children}
      </div>
    </div>
  );

  const MenuItem = ({ href, children, icon }) => (
    <a
      href={href}
      className="flex items-center space-x-3 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 group"
    >
      <div className="w-2 h-2 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">{children}</span>
    </a>
  );

  return (
    <aside className="w-64 bg-gradient-to-b from-[#0B0B17] to-[#1a1a2e] border-r border-white/10 p-6 flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="flex-1">
        {/* Dashboard Link */}
        <a
          href="/admin"
          className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-[#ff4ec0]/20 to-[#7b2ff7]/20 border border-[#ff4ec0]/30 text-white mb-6 group hover:shadow-lg hover:shadow-[#ff4ec0]/10 transition-all duration-300"
        >
          <FaHome className="text-[#ff4ec0] group-hover:scale-110 transition-transform duration-300" />
          <span className="font-semibold">Dashboard</span>
        </a>

        {/* Menu Sections */}
        <MenuSection
          title="Anime"
          icon={<FaVideo className="text-sm" />}
          isOpen={openSections.anime}
          onToggle={() => toggleSection('anime')}
          gradient="from-[#ff4ec0] to-[#7b2ff7]"
        >
          <MenuItem href="/anime/list" icon="📋">List All</MenuItem>
          <MenuItem href="/anime/add" icon="➕">Add New</MenuItem>
        </MenuSection>

        <MenuSection
          title="Seasons"
          icon={<FaList className="text-sm" />}
          isOpen={openSections.seasons}
          onToggle={() => toggleSection('seasons')}
          gradient="from-[#7b2ff7] to-[#9932CC]"
        >
          <MenuItem href="/season/list" icon="📋">List All</MenuItem>
          <MenuItem href="/season/add" icon="➕">Add New</MenuItem>
        </MenuSection>

        <MenuSection
          title="Episodes"
          icon={<FaPlayCircle className="text-sm" />}
          isOpen={openSections.episodes}
          onToggle={() => toggleSection('episodes')}
          gradient="from-[#9932CC] to-[#ff4ec0]"
        >
          <MenuItem href="/episode/list" icon="📋">List All</MenuItem>
          <MenuItem href="/episode/add" icon="➕">Add New</MenuItem>
        </MenuSection>

        <MenuSection
          title="Movies"
          icon={<FaFilm className="text-sm" />}
          isOpen={openSections.movies}
          onToggle={() => toggleSection('movies')}
          gradient="from-[#00ff88] to-[#00ccff]"
        >
          <MenuItem href="/movie/list" icon="📋">List All</MenuItem>
          <MenuItem href="/movie/add" icon="➕">Add New</MenuItem>
        </MenuSection>

        <MenuSection
          title="Playlists"
          icon={<FaList className="text-sm" />}
          isOpen={openSections.playlists}
          onToggle={() => toggleSection('playlists')}
          gradient="from-[#ffb74d] to-[#ff4ec0]"
        >
          <MenuItem href="/playlists/list" icon="📋">List All</MenuItem>
          <MenuItem href="/playlists/add" icon="➕">Add New</MenuItem>
        </MenuSection>
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-white/10">
        <a
          href="/settings"
          className="flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 group"
        >
          <FaCog className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-sm">Settings</span>
        </a>
        
        {/* Animated background elements */}
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-[#ff4ec0]/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-8 right-4 w-16 h-16 bg-[#7b2ff7]/5 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
    </aside>
  );
};

export default AdminSidebar;