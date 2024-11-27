// components/TriggerButton.tsx
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

export default TriggerButton;
