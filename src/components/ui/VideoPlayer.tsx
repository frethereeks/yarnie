"use client";
import React, { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  type?: string; //TODO: properly define tpype
  poster?: string; // Optional poster image
  provider?: string;
}

// TODO: The video player here should just be a video player, this component as it is should belong to the instructor context folder
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  type = "video/mp4",
  provider: _provider,
}) => {
  const provider = _provider?.toLowerCase();
  console.log({poster, type})
  return (
    <>
      {provider === "youtube" && (
        <div className="video-player">
          <iframe
            width="100%"
            height="315"
            src={src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>{" "}
        </div>
      )}
      {!provider && (
        <div className="video-player">
          <HtmlVideoPlayer src={src} />
          {/* TODO: Implement a proper video player to play actual videos */}
        </div>
      )}
    </>
  );
};

interface HtmlVideoPlayerProps {
  src: string; // URL of the video
  width?: string; // Width of the video player (optional)
  height?: string; // Height of the video player (optional)
  controls?: boolean; // Whether to show the default controls (optional)
  autoplay?: boolean; // Whether to autoplay the video (optional)
}

const HtmlVideoPlayer: React.FC<HtmlVideoPlayerProps> = ({
  src,
  width = "640px",
  height = "360px",
  controls = false,
  autoplay = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoplay);
  const [volume, setVolume] = useState<number>(1);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={src}
        width={width}
        height={height}
        controls={controls}
        autoPlay={autoplay}
      />
      {!controls && (
        <div className="controls">
          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      )}
    </div>
  );
};
