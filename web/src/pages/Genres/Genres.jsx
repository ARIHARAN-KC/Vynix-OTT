import React from "react";
import { FaArrowRight } from "react-icons/fa";

// Sample genre list (can be fetched from API in a real implementation)
const genreList = [
  { id: 1, name: "Action", description: "High-octane battles and thrilling moments" },
  { id: 2, name: "Adventure", description: "Epic journeys and exploration" },
  { id: 3, name: "Comedy", description: "Light-hearted and humorous stories" },
  { id: 4, name: "Drama", description: "Emotional and gripping narratives" },
  { id: 5, name: "Fantasy", description: "Magical worlds and mythical creatures" },
  { id: 6, name: "Horror", description: "Chilling and suspenseful tales" },
  { id: 7, name: "Mystery", description: "Intriguing puzzles and investigations" },
  { id: 8, name: "Romance", description: "Heartwarming love stories" },
  { id: 9, name: "Sci-Fi", description: "Futuristic and imaginative concepts" },
  { id: 10, name: "Slice of Life", description: "Relatable everyday experiences" },
  { id: 11, name: "Sports", description: "Competitive and inspiring athletic stories" },
  { id: 12, name: "Supernatural", description: "Mystical and otherworldly phenomena" },
  { id: 13, name: "Thriller", description: "Edge-of-your-seat suspense" },
  { id: 14, name: "Mecha", description: "Giant robots and futuristic battles" },
  { id: 15, name: "Music", description: "Rhythm and melody-driven stories" },
];

const Genres = () => {
  return (
    <div className="bg-gradient-to-br from-[#0B0B17] via-[#1a1a2e] to-[#16213e] text-white min-h-screen font-['Inter']">
      {/* Animated Background Elements (mirroring Home.js) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#ff4ec0]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#7b2ff7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">Browse by Genre</h1>
            <p className="text-gray-400 text-lg max-w-lg">Explore anime by your favorite genres</p>
          </div>
          <button className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10">
            <span>View Catalog</span>
            <FaArrowRight className="text-sm" />
          </button>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genreList.map((genre) => (
            <div
              key={genre.id}
              className="group relative cursor-pointer p-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-500 hover:border-white/20 hover:scale-105"
              role="button"
              tabIndex={0}
              aria-label={`Browse ${genre.name} genre`}
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-900/50 h-48">
                {/* Placeholder for genre-specific image or fallback gradient */}
                <div className="w-full h-full bg-gradient-to-r from-[#ff4ec0]/20 to-[#7b2ff7]/20 transition-transform duration-500 group-hover:scale-105" />
              </div>

              {/* Genre Info */}
              <div className="mt-4">
                <h3 className="text-xl font-bold text-white mb-2">{genre.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{genre.description}</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{genre.name}</h3>
                  <button className="w-full py-2.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300 flex items-center justify-center">
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex lg:hidden justify-center mt-8">
          <button className="flex items-center space-x-2 px-8 py-3 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10">
            <span>View Catalog</span>
            <FaArrowRight className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Genres;