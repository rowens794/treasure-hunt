import { useRef, useState } from "react";
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
    <div className="bg-stone-800 h-screen w-full relative">
      {/* Full-screen video */}
      <VideoWithControls />

      {/* Overlay content */}
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

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover blur-[.5px]"
        autoPlay
      >
        <source
          src="https://swcidwtkwnkor2xg.public.blob.vercel-storage.com/Intro-yG3oxwKvAcqU6aLGSwaSUVUzfWQa3C.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-dot-pattern mix-blend-multiply pointer-events-none"></div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-8 right-8 z-20 bg-stone-100 p-4 rounded-full shadow-lg text-stone-800 hover:bg-stone-200 focus:outline-none"
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
    <div className="h-12 absolute bottom-8 mx-auto w-full px-8 z-10 pointer-events-none">
      <div className="grid grid-cols-6 bg-stone-100 rounded-sm w-full h-full pointer-events-auto">
        <Link href="/" className="pointer-events-auto">
          <div className="px-2 py-1.5 relative flex flex-col">
            <SlHome className="text-3xl mx-auto h-6 w-6 text-stone-700" />
            <span className="text-[.7rem] h-3 w-full text-center text-stone-700">
              Home
            </span>
          </div>
        </Link>
        <div className="pointer-events-auto">
          <Link href="/hunt/leaderboard">
            <div className="px-2 py-1.5 relative flex flex-col">
              <SlList className="text-3xl mx-auto h-6 w-6 text-stone-700" />
              <span className="text-[.7rem] h-3 w-full text-center text-stone-700">
                Leaders
              </span>
            </div>
          </Link>
        </div>
        <div className="col-span-2 pointer-events-auto">
          <div className="bg-stone-100 rounded-full h-32 w-32 absolute -bottom-6 p-1">
            <div className="bg-slate-300 rounded-full h-full w-full p-4">
              <SlLocationPin className="text-3xl mx-auto h-full w-full text-stone-700" />
            </div>
          </div>
        </div>
        <div className="pointer-events-auto">
          <Link href="/hunt/help">
            <div className="px-2 py-1.5 relative flex flex-col">
              <SlQuestion className="text-3xl mx-auto h-6 w-6 text-stone-700" />
              <span className="text-[.7rem] h-3 w-full text-center text-stone-700">
                Help
              </span>
            </div>
          </Link>
        </div>
        <div className="pointer-events-auto">
          <Link href="/hunt/messages">
            <div className="px-2 py-1.5 relative flex flex-col">
              <SlEnvolope className="text-3xl mx-auto h-6 w-6 text-stone-700" />
              <span className="text-[.7rem] h-3 w-full text-center text-stone-700">
                Messages
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
