// Browse.jsx
import React from "react";
import { FaPlay, FaPlus, FaStar, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import naruto from "../../assets/posters/naruto.png";
import narutoShippuden from "../../assets/posters/naruto-shippuden.png";
import boruto from "../../assets/posters/boruto.png";
import onePiece from "../../assets/posters/one-piece.png";
import attackOnTitan from "../../assets/posters/attack-on-titan.png";
import demonSlayer from "../../assets/posters/demon-slayer.png";
import jujutsuKaisen from "../../assets/posters/jujutsu-kaisen.png";
import myHeroAcademia from "../../assets/posters/my-hero-academia.png";

const movies = [
  { id: 1, title: "Naruto", img: naruto, rating: 4.8, year: 2002, genre: "Action, Adventure", isNew: false, videoId: "JYV-Hxg4a0Y" },
  { id: 2, title: "Naruto Shippuden", img: narutoShippuden, rating: 4.9, year: 2007, genre: "Action, Drama", isNew: true, videoId: "G9R7Wyb-YQk" },
  { id: 3, title: "Jujutsu Kaisen", img: jujutsuKaisen, rating: 4.2, year: 2017, genre: "Action, Sequel", isNew: true, videoId: "fw2jTLMbQRk" },
  { id: 4, title: "Attack on Titan", img: attackOnTitan, rating: 4.9, year: 2013, genre: "Dark Fantasy", isNew: false, videoId: "MGRm4IzK1SQ" },
  { id: 5, title: "Demon Slayer", img: demonSlayer, rating: 4.7, year: 2019, genre: "Fantasy, Action", isNew: false, videoId: "VQGCKyvzIM4" },
  { id: 6, title: "One Piece", img: onePiece, rating: 4.8, year: 1999, genre: "Adventure, Comedy", isNew: false, videoId: "S8_YwFLCh4U" },
  { id: 7, title: "Jujutsu Kaisen S2", img: jujutsuKaisen, rating: 4.6, year: 2023, genre: "Supernatural", isNew: true, videoId: "zsSWfYx9xZ8" },
  { id: 8, title: "My Hero Academia", img: myHeroAcademia, rating: 4.5, year: 2016, genre: "Superhero", isNew: false, videoId: "EPVkcwyLQQ8" },
  { id: 9, title: "Boruto", img: boruto, rating: 4.0, year: 2017, genre: "Action, Sci-Fi", isNew: false, videoId: "tK8Bu6P4CM0" },
  { id: 10, title: "Chainsaw Man", img: jujutsuKaisen, rating: 4.7, year: 2022, genre: "Horror, Action", isNew: true, videoId: "eyonP1yMZ6w" },
];

const MovieCard = ({ movie, size = "medium", onPlay }) => (
  <div className="group relative cursor-pointer">
    <div
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:scale-105 ${
        size === "large" ? "p-3" : "p-2"
      }`}
    >
      <div 
        className={`relative overflow-hidden rounded-xl bg-gray-900/50 ${size === "large" ? "h-80" : "h-64"}`}
        onClick={() => onPlay(movie)}
        role="button"
      >
        <img
          src={movie.img}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <div className="px-2.5 py-1.5 bg-black/80 backdrop-blur-sm rounded-full flex items-center space-x-1.5 border border-white/10">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="text-white text-xs font-bold">{movie.rating}</span>
        </div>
        {movie.isNew && (
          <div className="px-2.5 py-1.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-full text-xs font-bold text-white">
            NEW
          </div>
        )}
      </div>

      <div className="absolute inset-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
          <h3 className={`font-bold text-white mb-2 ${size === "large" ? "text-lg" : "text-base"}`}>
            {movie.title}
          </h3>
          <div className="flex items-center space-x-2 text-xs text-gray-300 mb-3">
            <span>{movie.year}</span>
            <span>•</span>
            <span className="text-[#ff4ec0]">{movie.genre}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlay(movie);
              }}
              className="flex-1 py-2.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaPlay className="text-xs" />
              <span>Play</span>
            </button>
            <button 
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <FaPlus className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Browse = () => {
  const navigate = useNavigate();

const handlePlay = (movie) => {
  navigate(`/watch/${encodeURIComponent(movie.videoPath)}`);
};

  return (
    <div className="bg-gradient-to-br from-[#0B0B17] via-[#1a1a2e] to-[#16213e] text-white min-h-screen font-['Inter'] pt-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#ff4ec0]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#7b2ff7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Browse All Anime</h1>
            <p className="text-gray-400 max-w-2xl">
              Discover your next favorite series from our ever-growing library of anime.
            </p>
          </div>
          <Link
            to="/my-list"
            className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            <span>My List</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <button className="px-5 py-2.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] text-white rounded-full text-sm font-semibold">
            All
          </button>
          <button className="px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            Action
          </button>
          <button className="px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            Adventure
          </button>
          <button className="px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            New Releases
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              size="large" 
              onPlay={handlePlay} 
            />
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button className="px-8 py-3.5 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10 flex items-center space-x-2">
            <span>Load More</span>
            <FaPlay className="text-xs rotate-90" />
          </button>
        </div>

        {/* Mobile My List Button */}
        <div className="flex lg:hidden justify-center mt-8">
          <Link
            to="/my-list"
            className="flex items-center space-x-2 px-8 py-3 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            <span>My List</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Browse;