import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import { FaPlay, FaPlus, FaStar, FaArrowRight, FaVideo, FaFilm, FaList } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    animes: 0,
    movies: 0,
    playlists: 0,
  });

  // Simulated DB call
  useEffect(() => {
    // Mocking your getDB() function
    const db = {
      animes: [{}, {}, {}],
      movies: [{}, {}, {}, {}],
      playlists: [{}],
    };
    setStats({
      animes: db.animes.length,
      movies: db.movies.length,
      playlists: db.playlists.length,
    });
  }, []);

  const StatCard = ({ title, count, icon, viewLink, addLink, gradient }) => (
    <div className="group relative cursor-pointer">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:scale-105 p-6 h-full">
        {/* Animated background elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-[#ff4ec0]/10 to-[#7b2ff7]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
        
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-white">{title}</h2>
              <div className="p-3 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-xl text-white">
                {icon}
              </div>
            </div>
            
            <p className="text-5xl font-black mt-2 bg-gradient-to-r from-[#ff4ec0] via-[#7b2ff7] to-[#9932CC] bg-clip-text text-transparent">
              {count}
            </p>
            
            <p className="text-gray-400 mt-2 text-sm">
              Total entries in database
            </p>
          </div>
          
          <div className="mt-6 flex gap-3">
            <a
              href={viewLink}
              className="flex-1 py-3 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105"
            >
              <FaPlay className="text-xs" />
              <span>View All</span>
            </a>
            <a
              href={addLink}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20 group-hover:scale-105"
            >
              <FaPlus className="text-xs" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-[#0B0B17] via-[#1a1a2e] to-[#16213e] text-white min-h-screen font-['Inter']">
      <div className="flex min-h-screen pt-16 lg:pt-20"> {/* Add padding for fixed navbar */}
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Dashboard */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your content and track statistics</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <StatCard
              title="Total Animes"
              count={stats.animes}
              icon={<FaVideo className="text-lg" />}
              viewLink="/anime/list"
              addLink="/anime/add"
              gradient="from-[#ff4ec0] to-[#7b2ff7]"
            />
            
            <StatCard
              title="Total Movies"
              count={stats.movies}
              icon={<FaFilm className="text-lg" />}
              viewLink="/movie/list"
              addLink="/movie/add"
              gradient="from-[#7b2ff7] to-[#9932CC]"
            />
            
            <StatCard
              title="Playlists"
              count={stats.playlists}
              icon={<FaList className="text-lg" />}
              viewLink="/playlists/list"
              addLink="/playlists/add"
              gradient="from-[#9932CC] to-[#ff4ec0]"
            />
          </div>

          {/* Quick Actions Section */}
          <section className="bg-gradient-to-r from-[#ff4ec0]/5 to-[#7b2ff7]/5 rounded-3xl p-8 backdrop-blur-md border border-white/10">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-white mb-2">Quick Actions</h2>
              <p className="text-gray-400">Manage your content efficiently</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Add New Anime",
                  description: "Upload new anime series",
                  link: "/anime/add",
                  icon: "🎬",
                  color: "from-[#ff4ec0] to-[#7b2ff7]"
                },
                {
                  title: "Manage Movies",
                  description: "Edit movie catalog",
                  link: "/movie/list",
                  icon: "🎭",
                  color: "from-[#7b2ff7] to-[#9932CC]"
                },
                {
                  title: "Create Playlist",
                  description: "Curate content collections",
                  link: "/playlists/add",
                  icon: "📋",
                  color: "from-[#9932CC] to-[#ff4ec0]"
                },
                {
                  title: "View Analytics",
                  description: "Track performance metrics",
                  link: "/analytics",
                  icon: "📊",
                  color: "from-[#00ff88] to-[#00ccff]"
                }
              ].map((action, index) => (
                <a
                  key={index}
                  href={action.link}
                  className="group block p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-2xl">{action.icon}</span>
                  </div>
                  <h3 className="font-black text-lg mb-2 text-white">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="mt-12">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2">Recent Activity</h2>
              <p className="text-gray-400">Latest updates and changes</p>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="space-y-4">
                {[
                  { action: "Added new anime", item: "Demon Slayer Season 4", time: "2 hours ago" },
                  { action: "Updated movie", item: "One Piece Film: Red", time: "5 hours ago" },
                  { action: "Created playlist", item: "Summer 2024 Collection", time: "1 day ago" },
                  { action: "Modified anime", item: "Jujutsu Kaisen Episode 24", time: "2 days ago" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-full"></div>
                      <div>
                        <p className="text-white font-semibold">
                          {activity.action} <span className="text-[#ff4ec0]">{activity.item}</span>
                        </p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                    </div>
                    <FaArrowRight className="text-gray-400 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;