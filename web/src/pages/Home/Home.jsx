import React, { useState, useEffect } from "react";
import { FaPlay, FaPlus, FaStar, FaArrowRight, FaChevronLeft, FaChevronRight, FaPause } from "react-icons/fa";


import naruto from "../../assets/posters/naruto.png";
import narutoShippuden from "../../assets/posters/naruto-shippuden.png";
import boruto from "../../assets/posters/boruto.png";
import onePiece from "../../assets/posters/one-piece.png";
import attackOnTitan from "../../assets/posters/attack-on-titan.png";
import demonSlayer from "../../assets/posters/demon-slayer.png";
import jujutsuKaisen from "../../assets/posters/jujutsu-kaisen.png";
import myHeroAcademia from "../../assets/posters/my-hero-academia.png";

// Slider imgs (desktop)
import naruto_shippuden_desktop from "../../assets/Desktop-posters/naruto_shippuden.png";
import naruto_desktop from "../../assets/Desktop-posters/naruto_desktop.png";
import jujutsu_Kaisen_desktop from "../../assets/Desktop-posters/jujutsu_kaisen_desktop.png";
import attack_on_titan_desktop from "../../assets/Desktop-posters/attackOn_Titan_desktop.png";
import demon_slayer_desktop from "../../assets/Desktop-posters/demon_slayer_desktop.png";
import one_piece_desktop from "../../assets/Desktop-posters/one_piece_desktop.png";

const movies = [
  { 
    id: 1, 
    title: "Naruto", 
    img: naruto, // Poster image for popular shows
    desktopImg: naruto_desktop, // Desktop image for carousel
    rating: 4.8, 
    year: 2002, 
    genre: "Action, Adventure", 
    isNew: false 
  },
  { 
    id: 2, 
    title: "Naruto Shippuden", 
    img: narutoShippuden, // Poster image for popular shows
    desktopImg: naruto_shippuden_desktop, // Desktop image for carousel
    rating: 4.9, 
    year: 2007, 
    genre: "Action, Drama", 
    isNew: true 
  },
  { 
    id: 3, 
    title: "Jujutsu Kaisen", 
    img: jujutsuKaisen, // Poster image for popular shows
    desktopImg: jujutsu_Kaisen_desktop, // Desktop image for carousel
    rating: 4.2, 
    year: 2017, 
    genre: "Action, Sequel", 
    isNew: true 
  },
  { 
    id: 4, 
    title: "Attack on Titan", 
    img: attackOnTitan, // Poster image for popular shows
    desktopImg: attack_on_titan_desktop, // Desktop image for carousel
    rating: 4.9, 
    year: 2013, 
    genre: "Dark Fantasy", 
    isNew: false 
  },
  { 
    id: 5, 
    title: "Demon Slayer", 
    img: demonSlayer, // Poster image for popular shows
    desktopImg: demon_slayer_desktop, // Desktop image for carousel
    rating: 4.7, 
    year: 2019, 
    genre: "Fantasy, Action", 
    isNew: false 
  },
  { 
    id: 6, 
    title: "One Piece", 
    img: onePiece, // Poster image for popular shows
    desktopImg: one_piece_desktop, // Desktop image for carousel
    rating: 4.8, 
    year: 1999, 
    genre: "Adventure, Comedy", 
    isNew: false 
  },
  { 
    id: 7, 
    title: "My Hero Academia", 
    img: myHeroAcademia, // Poster image for popular shows
    desktopImg: jujutsu_Kaisen_desktop, // Fallback desktop image
    rating: 4.6, 
    year: 2020, 
    genre: "Supernatural", 
    isNew: true 
  },
  { 
    id: 8, 
    title: "Boruto", 
    img: boruto, // Poster image for popular shows
    desktopImg: naruto_shippuden_desktop, // Fallback desktop image
    rating: 4.5, 
    year: 2016, 
    genre: "Superhero", 
    isNew: false 
  },
];

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Top 6 trending shows for the hero section carousel (including One Piece)
  const trendingShows = [
    movies[0], // Naruto
    movies[1], // Naruto Shippuden
    movies[2], // Jujutsu Kaisen
    movies[3], // Attack on Titan
    movies[4], // Demon Slayer
    movies[5], // One Piece (added to carousel)
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate carousel every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentSlide((prev) => (prev + 1) % trendingShows.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [trendingShows.length, isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingShows.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trendingShows.length) % trendingShows.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const MovieCard = ({ movie, size = "medium" }) => (
    <div className="group relative cursor-pointer">
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:scale-105 ${
        size === "large" ? "p-3" : "p-2"
      }`}>
        <div className={`relative overflow-hidden rounded-xl bg-gray-900/50 ${
          size === "large" ? "h-80" : "h-64"
        }`}>
          <img
            src={movie.img} // Using poster image for movie cards
            alt={movie.title}
            className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Rating & New Badge */}
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

        {/* Hover Overlay */}
        <div className="absolute inset-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className={`font-bold text-white mb-2 ${size === "large" ? "text-lg" : "text-base"}`}>
              {movie.title}
            </h3>
            <div className="flex items-center space-x-2 text-xs text-gray-300 mb-3">
              <span>{movie.year}</span>
              <span>•</span>
              <span className="text-[#ff4ec0]">{movie.genre}</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2.5 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#ff4ec0]/25 transition-all duration-300 flex items-center justify-center space-x-2">
                <FaPlay className="text-xs" />
                <span>Play</span>
              </button>
              <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20">
                <FaPlus className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-[#0B0B17] via-[#1a1a2e] to-[#16213e] text-white min-h-screen font-['Inter']">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Image Carousel Background - Using desktop images */}
        <div className="absolute inset-0">
          {trendingShows.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={movie.desktopImg} // Using desktop image for carousel
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Enhanced dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B17] via-[#0B0B17]/90 to-[#0B0B17]/50"></div>
            </div>
          ))}
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-[#ff4ec0]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#7b2ff7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Navigation Arrows<button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-all duration-300 border border-white/20"
        >
          <FaChevronLeft className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-all duration-300 border border-white/20"
        >
          <FaChevronRight className="text-white" />
        </button> */}
        

        {/* Hero Carousel Section */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="w-full max-w-6xl mx-auto">
            {/* Carousel Content */}
            <div className="relative">
              {/* Carousel Track */}
              <div className="flex overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {trendingShows.map((movie) => (
                    <div key={movie.id} className="w-full flex-shrink-0">
                      <div className="max-w-2xl">
                        {/* Text Content */}
                        <div className="space-y-8">
                          <div className="flex items-center space-x-4">
                            <span className="px-4 py-2 bg-gradient-to-r from-[#ff4ec0]/20 to-[#7b2ff7]/20 text-[#ff4ec0] rounded-full text-sm font-semibold border border-[#ff4ec0]/30 backdrop-blur-sm inline-block">
                              Now Trending
                            </span>
                            <button
                              onClick={togglePlayPause}
                              className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center space-x-2"
                            >
                              {isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="text-xs" />}
                              <span className="text-xs">{isPlaying ? 'Pause' : 'Play'}</span>
                            </button>
                          </div>
                          
                          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                            <span className="text-white block">Discover</span>
                            <span className="bg-gradient-to-r from-[#ff4ec0] via-[#7b2ff7] to-[#9932CC] bg-clip-text text-transparent block">
                              {movie.title}
                            </span>
                          </h1>
                          
                          <p className="text-lg text-gray-200 leading-relaxed max-w-lg">
                            {movie.genre} • Rated {movie.rating}/5
                            <br />
                            Join millions of fans watching this epic series in stunning 4K quality. Experience the adventure like never before.
                          </p>
                          
                          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="group px-8 py-4 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-2xl font-bold text-white text-lg hover:shadow-xl hover:shadow-[#ff4ec0]/25 transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105">
                              <FaPlay className="group-hover:scale-110 transition-transform" />
                              <span>Watch Now</span>
                            </button>
                            
                            <button className="group px-8 py-4 bg-white/10 backdrop-blur-lg rounded-2xl font-bold text-white text-lg hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center space-x-3">
                              <FaPlus className="group-hover:scale-110 transition-transform" />
                              <span>Add to List</span>
                            </button>
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-300">
                            <div className="flex items-center space-x-2">
                              <FaStar className="text-yellow-400" />
                              <span>{movie.rating}/5 Rating</span>
                            </div>
                            <div>•</div>
                            <div>4K Ultra HD</div>
                            <div>•</div>
                            <div>16+</div>
                            <div>•</div>
                            <div className="text-[#ff4ec0]">{movie.genre.split(',')[0]}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {trendingShows.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? "bg-[#ff4ec0] w-8" 
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>*/}
              
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-[#ff4ec0] to-[#7b2ff7] rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-20">
        {/* Popular Shows Section - Using poster images */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Popular Shows</h2>
              <p className="text-gray-400">All-time fan favorites</p>
            </div>
            <button className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10">
              <span>View All</span>
              <FaArrowRight className="text-sm" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} size="large" />
            ))}
          </div>
          
          <div className="flex lg:hidden justify-center mt-8">
            <button className="flex items-center space-x-2 px-8 py-3 bg-white/5 backdrop-blur-md rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/10">
              <span>View All</span>
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </section>

        {/* New Releases */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">New Releases</h2>
              <p className="text-gray-400">Fresh episodes and series</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide">
              {movies.filter(movie => movie.isNew).map((movie) => (
                <div key={movie.id} className="flex-none w-72">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gradient-to-r from-[#ff4ec0]/5 to-[#7b2ff7]/5 rounded-3xl p-12 mb-20 backdrop-blur-md border border-white/10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Why Choose Vynix?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience anime like never before with our premium features designed for true fans
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎬",
                title: "4K Ultra HD",
                description: "Crystal clear streaming with immersive audio quality"
              },
              {
                icon: "📱",
                title: "Watch Anywhere",
                description: "Stream on all your devices with seamless sync"
              },
              {
                icon: "⚡",
                title: "No Ads",
                description: "Uninterrupted binge-watching experience"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-[#ff4ec0] to-[#7b2ff7] rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#ff4ec0]/20">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="font-black text-xl mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;