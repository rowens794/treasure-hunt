import { memo } from "react";
import {
  SlHome,
  SlList,
  SlQuestion,
  SlEnvolope,
  SlLocationPin,
} from "react-icons/sl";
import Link from "next/link";

import User from "@/interfaces/User";

type Props = {
  user: User | null; // or the specific type for your user object
};

const ControlsComponent = ({ user }: Props) => {
  return (
    <div className="h-12 absolute bottom-8 mx-auto w-full px-4 z-10 pointer-events-none">
      <div className="grid grid-cols-6 bg-parchment opacity-85 border-t-2 border-b-2 border-stone-700 w-full h-full pointer-events-auto shadow-md">
        <Button text="Home" Icon={SlHome} link="/" />
        <Button text="Leaders" Icon={SlList} link="/hunt/leaderboard" />
        <TriggerButton user={user} />
        <Button text="Messages" Icon={SlEnvolope} link="/hunt/messages" />
        <Button text="Help" Icon={SlQuestion} link="/hunt/help" />
      </div>
    </div>
  );
};

const Controls = memo(ControlsComponent);

export default Controls;

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

interface TriggerButtonProps {
  user: User | null;
}

const TriggerButton = ({ user }: TriggerButtonProps) => {
  const handleClick = () => {
    if ("geolocation" in navigator) {
      console.log(user);
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
        </div>
      </button>
    </div>
  );
};
