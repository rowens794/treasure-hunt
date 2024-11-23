import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import User from "../interfaces/User";
import withAuth from "../lib/withAuth";
import {
  SlHome,
  SlList,
  SlQuestion,
  SlEnvolope,
  SlLocationPin,
} from "react-icons/sl";
import { FaPlay, FaPause } from "react-icons/fa";

interface Props {
  user: User;
}

function Hunt({ user }: Props) {
  console.log(user);
  return (
    <div className=" h-dvh w-full relative overflow-y-hidden">
      <VideoWithControls />
      <Controls />
    </div>
  );
}

export default withAuth(Hunt);

const VideoWithControls = () => {
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
        className="absolute inset-0 w-full h-full object-cover blur-[.5px] opacity-60"
        playsInline
        preload="metadata"
        poster="https://swcidwtkwnkor2xg.public.blob.vercel-storage.com/video-poster-URvCyn21eUbv5fnCaeqZHvt4v8AnT9.png"
      >
        <source
          src="https://swcidwtkwnkor2xg.public.blob.vercel-storage.com/Video%202-hr2S3hU7Chu2qWtlRcPrvB6TCfUFSJ.mp4"
          type="video/mp4"
        />
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

const Controls = () => {
  return (
    <div className="h-12 absolute bottom-8 mx-auto w-full px-4 z-10 pointer-events-none">
      <div className="grid grid-cols-6 bg-parchment opacity-85 rounded-md border-2 border-stone-700 w-full h-full pointer-events-auto shadow-md">
        <Button text="Home" Icon={SlHome} link="/" />
        <Button text="Leaders" Icon={SlList} link="/hunt/leaderboard" />
        <TriggerButton />
        <Button text="Messages" Icon={SlEnvolope} link="/hunt/messages" />
        <Button text="Help" Icon={SlQuestion} link="/hunt/help" />
      </div>
    </div>
  );
};

const Button = ({
  text,
  Icon,
  link,
}: {
  text: string;
  Icon: React.ComponentType<{ className?: string }>;
  link: string;
}) => {
  return (
    <div className="pointer-events-auto">
      <Link href={link}>
        <div className="px-2 py-1 relative flex flex-col">
          <Icon className="text-3xl mx-auto h-6 w-6 text-stone-700" />
          <span className="text-[.7rem] font-serif h-3 w-full text-center text-stone-700">
            {text}
          </span>
        </div>
      </Link>
    </div>
  );
};

const TriggerButton = () => {
  const handleClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position retrieved successfully", position);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert(
                "You have not enabled location permissions on your device. It's not possible to play the game without location permissions - that's how we verify your location when solving clues."
              );
              console.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("POSITION_UNAVAILABLE.");
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("TIMEOUT.");
              console.error("The request to get user location timed out.");
              break;
            // case error.UNKNOWN_ERROR:
            //   console.error("An unknown error occurred.");
            //   break;
          }
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="col-span-2 pointer-events-auto transform -translate-y-3 mx-2 flex justify-center">
      <button onClick={handleClick} className="pointer-events-auto">
        <div className="bg-stone-700 rounded-full h-18 w-18 p-0.5">
          <div className="bg-stone-900 rounded-full h-18 w-18 p-4 flex justify-center">
            <SlLocationPin className="text-4xl  text-stone-100" />
          </div>
        </div>{" "}
      </button>
    </div>
  );
};
