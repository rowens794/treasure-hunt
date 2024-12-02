// components/Controls.tsx
import { memo, useEffect, useState } from "react";
import { SlHome, SlList, SlQuestion, SlEnvolope } from "react-icons/sl";
import Link from "next/link";
import TriggerButton from "./TriggerButton"; // Import the TriggerButton component
import SlammingX from "./SlammingX"; // Import the SlammingX component
import { useRouter } from "next/router";

const ControlsComponent = () => {
  const router = useRouter();
  const [triggerLoading, setTriggerLoading] = useState(false);
  const [showSlammingX, setShowSlammingX] = useState(false); // Lifted state
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(router.pathname);
  }, [router.pathname]);

  return (
    <>
      {/* Render the SlammingX component at the root level */}
      {showSlammingX && <SlammingX setShowSlammingX={setShowSlammingX} />}
      <div className="h-12 fixed bottom-8 mx-auto w-full px-4 z-10 pointer-events-none">
        <div className="grid grid-cols-6 bg-parchment opacity-85 border-t-2 border-b-2 border-stone-700 w-full h-full pointer-events-auto shadow-md">
          <Button text="Home" Icon={SlHome} link="/" />
          <Button
            text="Leaders"
            Icon={SlList}
            link="/hunt/leaderboard"
            currentPath={path}
          />
          <TriggerButton
            loading={triggerLoading}
            setLoading={setTriggerLoading}
            setShowSlammingX={setShowSlammingX} // Pass down the setter
            currentPath={path}
          />
          <Button
            text="Messages"
            Icon={SlEnvolope}
            link="/hunt/messages"
            currentPath={path}
          />
          <Button
            text="Help"
            Icon={SlQuestion}
            link="/hunt/help"
            currentPath={path}
          />
        </div>
      </div>
    </>
  );
};

const Controls = memo(ControlsComponent);

export default Controls;

interface ButtonProps {
  text: string;
  Icon: React.ComponentType<{ className?: string }>;
  link: string;
  currentPath?: string;
}

const Button = ({ text, Icon, link, currentPath }: ButtonProps) => {
  return (
    <div className="pointer-events-auto">
      <Link href={link}>
        <div className="px-2 py-1 relative flex flex-col">
          <Icon
            className={`text-3xl mx-auto h-6 w-6 ${
              link === currentPath ? "text-red-700" : "text-stone-800"
            }`}
          />
          <span
            className={`text-[.7rem] font-serif h-3 w-full text-center ${
              link === currentPath ? "text-red-700" : "text-stone-800"
            }`}
          >
            {text}
          </span>
        </div>
      </Link>
    </div>
  );
};
