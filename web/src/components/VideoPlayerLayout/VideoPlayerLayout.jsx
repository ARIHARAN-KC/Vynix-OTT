// src/components/VideoPlayerLayout/VideoPlayerLayout.jsx
import React, { useState } from "react";
import { FaTimes, FaPlay, FaThumbsUp, FaThumbsDown, FaShare, FaDownload, FaPaperclip } from "react-icons/fa";
import Navbar from "../Navbar/Navbar"; // Import your Navbar
import testvideo from "../../assets/videos/attackOnTitian.mp4"

const VideoPlayerLayout = ({ 
  videoId, 
  onClose, 
  title = "Video Player",
  description = "",
  playlist = [],
  thumbnail = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Default thumbnail or YouTube thumbnail
  const defaultThumbnail = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0B0B17] via-[#1a1a2e] to-[#16213e] min-h-screen z-50 overflow-y-auto">
      {/* Use your existing Navbar */}
      <Navbar />
      
      {/* Close button in top right corner */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white hover:text-[#ff4ec0] transition-colors bg-black/50 rounded-full p-2"
      >
        <FaTimes size={24} />
      </button>

      {/* Rest of your existing content */}
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8 mt-16">
        {/* Your existing video content */}
        {/* Left Column - Video and Description */}
        <div className="flex-1">
          {/* YouTube Style Video Playing Screen */}
          <div className="relative w-full rounded-xl overflow-hidden bg-black mb-4">
            {/* Aspect Ratio Container */}
            <div className="relative" style={{ width: '100%', height: '0', paddingBottom: '56.25%' }}>
              {!isPlaying ? (
                // Thumbnail with Play Button
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black"
                  onClick={handlePlay}
                >
                  {/* Thumbnail Image */}
                  <img 
                    src={defaultThumbnail} 
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button className="bg-red-600 hover:bg-red-700 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
                      <FaPlay className="text-white text-2xl ml-1" />
                    </button>
                  </div>
                </div>
              ) : (
                // Video Player
                <video
                  className="absolute inset-0 w-full h-full"
                  src={testvideo}
                  title="Video Player"
                  controls
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>

          {/* Video Title */}
          <h1 className="text-xl font-semibold text-white mt-4 mb-2">
            {title}
          </h1>

          {/* Video Stats */}
          <div className="flex items-center text-gray-400 text-sm mb-4">
            <span>11M views</span>
            <span className="mx-2">•</span>
            <span>10 months ago</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 border-b border-gray-700 pb-4 mb-4">
            {/* Like/Dislike */}
            <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
              <button className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-gray-700">
                <FaThumbsUp className="text-lg" />
                <span>39K</span>
              </button>
              <div className="h-6 w-px bg-gray-600"></div>
              <button className="px-4 py-2 text-white hover:bg-gray-700">
                <FaThumbsDown className="text-lg" />
              </button>
            </div>

            {/* Share */}
            <button className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-gray-800 rounded-full">
              <FaShare className="text-lg" />
              <span>Share</span>
            </button>

            {/* Download */}
            <button className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-gray-800 rounded-full">
              <FaDownload className="text-lg" />
              <span>Download</span>
            </button>

            {/* Clip */}
            <button className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-gray-800 rounded-full">
              <FaPaperclip className="text-lg" />
              <span>Clip</span>
            </button>
          </div>

          {/* Video Description */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">About this video</h2>
            <p className="text-gray-300 leading-relaxed">
              {description || "Watch this amazing content in stunning quality. Enjoy the best streaming experience with Vynix."}
            </p>
            
            {/* Additional Info */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
              <span>4K Ultra HD</span>
              <span>•</span>
              <span>16+</span>
              <span>•</span>
              <span>Action, Adventure</span>
            </div>
          </div>
        </div>

        {/* Right Column - Playlist */}
        <div className="lg:w-80">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Playlist</h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {playlist.length > 0 ? (
                playlist.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      item.videoId === videoId 
                        ? 'bg-gradient-to-r from-[#ff4ec0]/20 to-[#7b2ff7]/20 border border-[#ff4ec0]/30' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-white/60 flex items-center justify-center">
                      {item.videoId === videoId && (
                        <div className="w-2 h-2 bg-[#ff4ec0] rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {item.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Episode {index + 1}
                      </p>
                    </div>
                    <div className="text-gray-400 text-xs">
                      24:00
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No playlist available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerLayout;