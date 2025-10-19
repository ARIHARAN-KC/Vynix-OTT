// VideoPlayer.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import your local video files
//import narutoVideo from "../../assets/videos/naruto.mp4";
//import narutoShippudenVideo from "../../assets/videos/naruto-shippuden.mp4";
import jujutsukaisenVideo from "../../assets/videos/jujutsukaisen.mp4";
import attackOnTitanVideo from "../../assets/videos/attackOnTitian.mp4";
import demonSlayerVideo from "../../assets/videos/demonslayer.mp4";
// import onePieceVideo from "../../assets/videos/one-piece.mp4";
// import myHeroAcademiaVideo from "../../assets/videos/my-hero-academia.mp4";
// import borutoVideo from "../../assets/videos/boruto.mp4";

// Map video paths to imported video files
const videoMap = {
  //"/src/assets/videos/naruto.mp4": narutoVideo,
  //"../../assets/videos/naruto-shippuden.mp4": narutoShippudenVideo,
  "../../assets/videos/jujutsukaisen.mp4": jujutsukaisenVideo,
  "../../assets/videos/attackOnTitian.mp4": attackOnTitanVideo,
  "../../assets/videos/demonslayer.mp4": demonSlayerVideo,
//   "/src/assets/videos/one-piece.mp4": onePieceVideo,
//   "/src/assets/videos/my-hero-academia.mp4": myHeroAcademiaVideo,
//   "/src/assets/videos/boruto.mp4": borutoVideo,
};

const samplePlaylist = [
  //{ videoPath: "/src/assets/videos/naruto.mp4", title: "Naruto - Episode 1" },
  //{ videoPath: "../../assets/videos/naruto-shippuden.mp4", title: "Naruto Shippuden - Episode 1" },
  { videoPath: "../../assets/videos/jujutsukaisen.mp4", title: "Jujutsu Kaisen - Episode 1" },
  { videoPath: "../../assets/videos/attackOnTitian.mp4", title: "Attack on Titan - Episode 1" },
  { videoPath: "../../assets/videos/demonslayer.mp4", title: "Demon Slayer - Episode 1" },
];

const VideoPlayer = () => {
  const { videoPath } = useParams();
  const navigate = useNavigate();

  if (!videoPath) return null;

  const currentVideo = samplePlaylist.find(item => item.videoPath === videoPath) || 
                      { title: "Anime Episode", videoPath };

  const videoSource = videoMap[videoPath];

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <VideoPlayerLayout
      videoSource={videoSource}
      onClose={handleClose}
      title={currentVideo.title}
      description="Experience this amazing anime episode in stunning 4K quality with immersive audio. Join the adventure and discover why millions of fans love this series."
      playlist={samplePlaylist}
    />
  );
};

export default VideoPlayer;