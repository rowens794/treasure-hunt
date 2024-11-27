import { useEffect } from "react";
import Image from "next/image";

interface SlammingXProps {
  setShowSlammingX: (value: boolean) => void;
}

const SlammingX = ({ setShowSlammingX }: SlammingXProps) => {
  useEffect(() => {
    // Hide the overlay after the animation completes
    const timer = setTimeout(() => {
      setShowSlammingX(false);
    }, 1000); // Match this duration with your animation duration
    return () => clearTimeout(timer);
  }, [setShowSlammingX]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <Image
        src="/painted-x.png" // Ensure the image is in the public folder
        alt="Incorrect location"
        width={300} // Adjust width and height as needed
        height={300}
        className="animate-slamming-x"
      />
    </div>
  );
};

export default SlammingX;
