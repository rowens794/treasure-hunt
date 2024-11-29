import { useState, useEffect, useRef } from "react";
import { SlLocationPin } from "react-icons/sl";
import { runConfetti } from "../../lib/confetti";

interface TriggerButtonProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setShowSlammingX: (value: boolean) => void;
}

const TriggerButton = ({
  loading,
  setLoading,
  setShowSlammingX,
}: TriggerButtonProps) => {
  // Define the cooldown duration in milliseconds
  const cooldownDuration = 10000; // Adjust this value to change the cooldown length

  const [cooldown, setCooldown] = useState(false);
  const [isCooldownOver, setIsCooldownOver] = useState(false);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
              credentials: "include",
              body: JSON.stringify({
                latitude,
                longitude,
              }),
            });

            const data = await response.json();

            console.log(data);

            switch (data.status) {
              case "success":
                runConfetti();
                alert("You've solved the clue!");
                break;
              case "failure":
                setShowSlammingX(true); // Show the "X" overlay
                break;
              case "error":
                alert("An error occurred while checking your location.");
                break;
              default:
                alert("An unknown error occurred.");
            }
          } catch (error) {
            console.error("Error checking location:", error);
            alert("An error occurred while checking your location.");
          } finally {
            setLoading(false);
            // Start the cooldown after the loading is finished
            startCooldown();
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
          // Start the cooldown even if there's an error
          startCooldown();
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const startCooldown = () => {
    setCooldown(true);
    cooldownTimerRef.current = setTimeout(() => {
      setCooldown(false);
      setIsCooldownOver(true);
    }, cooldownDuration);
  };

  useEffect(() => {
    // Cleanup the cooldown timer when the component unmounts
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isCooldownOver) {
      // Reset the pulse animation flag after the animation ends (0.5s)
      const timer = setTimeout(() => {
        setIsCooldownOver(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCooldownOver]);

  return (
    <div className="col-span-2 pointer-events-auto transform -translate-y-3 mx-2 flex justify-center">
      <button
        onClick={loading || cooldown ? undefined : handleClick}
        className="pointer-events-auto"
        disabled={loading || cooldown}
      >
        <div className="relative bg-gray-500 rounded-full h-18 w-18 p-0.5 overflow-hidden">
          {/* Icon and Background */}
          <div className="relative rounded-full h-full w-full p-4 flex justify-center items-center overflow-hidden">
            {/* Gray background during cooldown, black otherwise */}
            <div
              className={`absolute inset-0 rounded-full ${
                cooldown ? "bg-gray-500" : "bg-stone-900"
              }`}
            ></div>

            {/* Sliding Black Overlay */}
            {cooldown && (
              <div
                className="absolute inset-0 rounded-full bg-stone-900 animate-slide-in"
                style={
                  {
                    transform: "translateX(-100%)",
                    "--cooldown-duration": `${cooldownDuration}ms`,
                  } as React.CSSProperties
                }
              ></div>
            )}

            {/* Icon */}
            <SlLocationPin
              className={`relative text-4xl text-stone-100 ${
                loading
                  ? "animate-spin-with-delay"
                  : isCooldownOver
                  ? "animate-pulse-once"
                  : ""
              }`}
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default TriggerButton;
