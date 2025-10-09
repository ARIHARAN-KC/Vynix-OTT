import React from "react";
import { FaPlay, FaTrash, FaStar, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Import placeholder images (same as Home.js and New.js for consistency)
import naruto from "../../assets/posters/naruto.png";
import narutoShippuden from "../../assets/posters/naruto-shippuden.png";
import jujutsuKaisen from "../../assets/posters/jujutsu-kaisen.png";

// Sample watchlist data (replace with API call in production)
const watchlist = [
  {
    id: 1,
    title: "Naruto",
    img: naruto,
    rating: 4.8,
    year: 2002,
    genre: "Action, Adventure",
    progress: 75, // Percentage watched (placeholder for FR-WH-2)
  },
  {
    id: 2,
    title: "Naruto Shippuden",
    img: narutoShippuden,
    rating: 4.9,
    year: 2007,
    genre: "Action, Drama",
    progress: 30,
  },
  {
    id: 7,
    title: "Jujutsu Kaisen",
    img: jujutsuKaisen,
    rating: 4.6,
    year: 2020,
    genre: "Supernatural",
    progress: 0,
  },
];

// Reusable WatchlistCard component (adapted from MovieCard in Home.js and New.js)
const WatchlistCard = ({ anime, onRemove }) => (
  <div className="group relative cursor-pointer">
    <div
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:scale-105 p-3"
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-900/50 h-80">
        <img
          src={anime.img}
          alt={anime.title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
        />
        {/* Progress Bar */}
        {anime.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7]"
              style={{ width: `${anime.progress}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <div className="px-2.5 py-1.5 bg-black/80 backdrop-blur-sm rounded-full flex items-center space-x-1.5 border border-white/10">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="text-white text-xs font-bold">{anime.rating}</span>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-white mb-2 text-lg">{anime.title}</h3>
          <div className="flex items-center space-x-2 text-xs text-gray-300 mb-3">
            <span>{anime.year}</span>
            <span>•</span>
            <span className="text-[#ff4ec0]">{anime.genre}</span>
          </div>
          <div className="flex space-x-2">
            <Link
              to={`/anime/${anime.id}`}
              className="flex-1 py-2.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaPlay className="text-xs" />
              <span>{anime.progress > 0 ? "Resume" : "Play"}</span>
            </Link>
            <button
              onClick={() => onRemove(anime.id)}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20"
              aria-label={`Remove ${anime.title} from watchlist`}
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MyList = () => {
  // Placeholder for removing anime from watchlist (replace with API call)
  const handleRemoveFromWatchlist = (id) => {
    console.log(`Removing anime with id ${id} from watchlist`);
    // In production, call DELETE /api/v1/watchlist
  };

  return (
    <div className="bg-gradient-to-br from-[#0B0B17] via-[#1a1a2e] to-[#16213e] text-white min-h-screen font-['Inter']">
      {/* Animated Background Elements (mirroring Home.js, Genres.js, New.js) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#ff4ec0]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#7b2ff7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
              My List
            </h1>
            <p className="text-gray-400 text-lg max-w-lg">
              Your curated watchlist of favorite anime
            </p>
          </div>
          <Link
            to="/browse"
            className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            <span>Browse More</span>
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Watchlist Grid or Empty State */}
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchlist.map((anime) => (
              <WatchlistCard
                key={anime.id}
                anime={anime}
                onRemove={handleRemoveFromWatchlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Your Watchlist is Empty
            </h2>
            <p className="text-gray-400 mb-6">
              Add some anime to your list to start watching!
            </p>
            <Link
              to="/browse"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300"
            >
              <span>Explore Anime</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        )}

        {/* Mobile Browse More Button */}
        {watchlist.length > 0 && (
          <div className="flex lg:hidden justify-center mt-8">
            <Link
              to="/browse"
              className="flex items-center space-x-2 px-8 py-3 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <span>Browse More</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;