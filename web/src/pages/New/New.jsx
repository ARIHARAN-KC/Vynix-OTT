import React from "react";
import { FaPlay, FaPlus, FaStar, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// Import placeholder images (same as Home.js for consistency)
import narutoShippuden from "../../assets/posters/naruto-shippuden.png";
import jujutsuKaisen from "../../assets/posters/jujutsu-kaisen.png";

// Sample data for new releases (replace with API call in production)
const newReleases = [
  {
    id: 2,
    title: "Naruto Shippuden",
    img: narutoShippuden,
    rating: 4.9,
    year: 2007,
    genre: "Action, Drama",
    isNew: true,
    videoId: "G9R7Wyb-YQk"
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    img: jujutsuKaisen,
    rating: 4.2,
    year: 2017,
    genre: "Action, Sequel",
    isNew: true,
    videoId: "fw2jTLMbQRk"
  },
  {
    id: 7,
    title: "Jujutsu Kaisen Season 2",
    img: jujutsuKaisen,
    rating: 4.6,
    year: 2020,
    genre: "Supernatural",
    isNew: true,
    videoId: "zsSWfYx9xZ8"
  },
];

// Reusable MovieCard component with video playback
const MovieCard = ({ anime, size = "medium", onPlay, onAddToList }) => (
  <div className="group relative cursor-pointer">
    <div
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:scale-105 ${
        size === "large" ? "p-3" : "p-2"
      }`}
      onClick={() => onPlay(anime)}
      role="button"
    >
      <div
        className={`relative overflow-hidden rounded-xl bg-gray-900/50 ${
          size === "large" ? "h-80" : "h-64"
        }`}
      >
        <img
          src={anime.img}
          alt={anime.title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Rating & New Badge */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <div className="px-2.5 py-1.5 bg-black/80 backdrop-blur-sm rounded-full flex items-center space-x-1.5 border border-white/10">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="text-white text-xs font-bold">{anime.rating}</span>
        </div>
        {anime.isNew && (
          <div className="px-2.5 py-1.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-full text-xs font-bold text-white">
            NEW
          </div>
        )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
          <h3
            className={`font-bold text-white mb-2 ${
              size === "large" ? "text-lg" : "text-base"
            }`}
          >
            {anime.title}
          </h3>
          <div className="flex items-center space-x-2 text-xs text-gray-300 mb-3">
            <span>{anime.year}</span>
            <span>•</span>
            <span className="text-[#ff4ec0]">{anime.genre}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlay(anime);
              }}
              className="flex-1 py-2.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaPlay className="text-xs" />
              <span>Play</span>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToList(anime);
              }}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20"
            >
              <FaPlus className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const New = () => {
  const navigate = useNavigate();

  const handlePlay = (anime) => {
    navigate(`/watch/${anime.videoId}`);
  };

  const handleAddToList = (anime) => {
    console.log(`Added ${anime.title} to watchlist`);
    // Add your watchlist logic here
  };

  return (
    <div className="bg-gradient-to-br from-[#0B0B17] via-[#1a1a2e] to-[#16213e] text-white min-h-screen font-['Inter']">
      {/* Animated Background Elements (mirroring Home.js and Genres.js) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#ff4ec0]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#7b2ff7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              New Releases
            </h1>
            <p className="text-gray-400 text-lg max-w-lg">
              Discover the latest anime series and episodes
            </p>
          </div>
          <Link
            to="/browse"
            className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            <span>View All Anime</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        {/* New Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newReleases.map((anime) => (
            <MovieCard 
              key={anime.id} 
              anime={anime} 
              size="large" 
              onPlay={handlePlay}
              onAddToList={handleAddToList}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex lg:hidden justify-center mt-8">
          <Link
            to="/browse"
            className="flex items-center space-x-2 px-8 py-3 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            <span>View All Anime</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Additional Content Sections */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-400">
              Get ready for these exciting new anime releases
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Chainsaw Man Part 2",
                genre: "Action, Horror",
                status: "Coming 2024",
                description: "The highly anticipated continuation of the Chainsaw Man saga"
              },
              {
                title: "Demon Slayer: Hashira Training Arc",
                genre: "Action, Fantasy",
                status: "Coming Soon",
                description: "The next chapter in the Demon Slayer journey"
              },
              {
                title: "One Piece: Egghead Arc",
                genre: "Adventure, Comedy",
                status: "In Production",
                description: "Luffy and crew's next adventure on the futuristic island"
              }
            ].map((upcoming, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white text-lg">{upcoming.title}</h3>
                  <span className="px-3 py-1 bg-gradient-to-r from-[#ff4ec0]/20 to-[#7b2ff7]/20 text-[#ff4ec0] rounded-full text-xs font-semibold border border-[#ff4ec0]/30">
                    {upcoming.status}
                  </span>
                </div>
                <p className="text-[#ff4ec0] text-sm mb-3">{upcoming.genre}</p>
                <p className="text-gray-400 text-sm">{upcoming.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mt-20 bg-gradient-to-r from-[#ff4ec0]/5 to-[#7b2ff7]/5 rounded-3xl p-12 backdrop-blur-md border border-white/10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-400 mb-6">
              Be the first to know about new anime releases and exclusive content
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl text-white placeholder-gray-400 border border-white/10 focus:border-[#ff4ec0] focus:outline-none transition-all duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default New;