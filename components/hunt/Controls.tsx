import { memo, useState } from "react";
import {
  SlHome,
  SlList,
  SlQuestion,
  SlEnvolope,
  SlLocationPin,
} from "react-icons/sl";
import Link from "next/link";

const ControlsComponent = () => {
  const [triggerLoading, setTriggerLoading] = useState(false);

  return (
    <div className="h-12 absolute bottom-8 mx-auto w-full px-4 z-10 pointer-events-none">
      <div className="grid grid-cols-6 bg-parchment opacity-85 border-t-2 border-b-2 border-stone-700 w-full h-full pointer-events-auto shadow-md">
        <Button text="Home" Icon={SlHome} link="/" />
        <Button text="Leaders" Icon={SlList} link="/hunt/leaderboard" />
        <TriggerButton
          loading={triggerLoading}
          setLoading={setTriggerLoading}
        />
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

const TriggerButton = ({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  const handleClick = async () => {
    if ("geolocation" in navigator) {
      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch("/api/check-location", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Include credentials (cookies) in the request
              body: JSON.stringify({
                latitude,
                longitude,
              }),
            });

            const data = await response.json();

            // TODO: Show success animation and progress to next clue
            alert(data.message);
          } catch (error) {
            console.error("Error checking location:", error);
            alert("An error occurred while checking your location.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setLoading(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert(
                "You have not enabled location permissions on your device. It's not possible to play the game without location permissions - that's how we verify your location when solving clues."
              );
              console.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              console.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              console.error("The request to get user location timed out.");
              break;
            default:
              alert("An unknown error occurred.");
              console.error("An unknown geolocation error occurred.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="col-span-2 pointer-events-auto transform -translate-y-3 mx-2 flex justify-center">
      <button
        onClick={loading ? undefined : handleClick}
        className="pointer-events-auto"
        disabled={loading}
      >
        <div className="bg-stone-700 rounded-full h-18 w-18 p-0.5">
          <div className="bg-stone-900 rounded-full h-18 w-18 p-4 flex justify-center">
            <SlLocationPin
              className={`text-4xl text-stone-100 ${
                loading ? "animate-spin-with-delay" : ""
              }`}
            />
          </div>
        </div>
      </button>
    </div>
  );
};
