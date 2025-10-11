import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoPlayerLayout from "../../components/VideoPlayerLayout/VideoPlayerLayout";

const samplePlaylist = [
  { videoId: "JYV-Hxg4a0Y", title: "Naruto - Episode 1" },
  { videoId: "G9R7Wyb-YQk", title: "Naruto Shippuden - Episode 1" },
  { videoId: "fw2jTLMbQRk", title: "Jujutsu Kaisen - Episode 1" },
  { videoId: "MGRm4IzK1SQ", title: "Attack on Titan - Episode 1" },
  { videoId: "VQGCKyvzIM4", title: "Demon Slayer - Episode 1" },
];

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  if (!videoId) return null;

  const currentVideo = samplePlaylist.find(item => item.videoId === videoId) || 
                      { title: "Anime Episode", videoId };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <VideoPlayerLayout
      videoId={videoId}
      onClose={handleClose}
      title={currentVideo.title}
      description="Experience this amazing anime episode in stunning 4K quality with immersive audio. Join the adventure and discover why millions of fans love this series."
      playlist={samplePlaylist}
    />
  );
};

export default VideoPlayer;