import { memo, useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const VideoWithControlsComponent = ({
  videoUrl,
  videoPosterUrl,
}: {
  videoUrl: string;
  videoPosterUrl: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    // Reset isPlaying to false when the video ends
    const handleVideoEnded = () => {
      setIsPlaying(false);
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnded);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-dvh overflow-y-hidden">
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover blur-[.5px] opacity-60 `}
        playsInline
        preload="metadata"
        poster={videoPosterUrl}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-dot-pattern mix-blend-multiply pointer-events-none"></div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-8 right-4 z-20  p-4 rounded-full shadow-lg text-stone-800 border border-stone-500 focus:outline-none"
      >
        {isPlaying ? (
          <FaPause className="text-2xl" />
        ) : (
          <FaPlay className="text-2xl" />
        )}
      </button>
    </div>
  );
};

const VideoWithControls = memo(VideoWithControlsComponent);

export default VideoWithControls;
