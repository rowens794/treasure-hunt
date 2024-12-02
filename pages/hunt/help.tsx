import React from "react";
import Controls from "@/components/hunt/Controls";

export default function index() {
  return (
    <>
      {" "}
      <Controls />
      <div className="p-8 space-y-6 pb-24">
        <span className="text-3xl girassol-regular">How To Play</span>
        <div className="space-y-4 font-serif">
          <p>
            Welcome to the Charleston Treasure Hunt! This city-wide treasure
            hunt challenges your knowledge, creativity, and determination.
            Follow these steps to join the fun and compete for the $500 grand
            prize!
          </p>

          <h2 className="text-2xl font-semibold">
            Step 1: Register an Account
          </h2>
          <p>
            To participate, you must create an account on our website using
            Google or Facebook. This allows us to track your progress and keep
            you updated throughout the hunt.
          </p>

          <h2 className="text-2xl font-semibold">
            Step 2: Enable GPS on Your Phone
          </h2>
          <p>
            GPS sharing is required to validate your presence at each clue
            location. Follow these instructions to enable GPS on your phone:
          </p>
          <div>
            <h3 className="text-xl font-medium">iPhone:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Open your phone&apos;s <b>Settings</b>.
              </li>
              <li>
                Scroll down and select <b>Privacy & Security</b>.
              </li>
              <li>
                Tap <b>Location Services</b> and toggle it <b>on</b>.
              </li>
              <li>
                Find your web browser or the app you&apos;re using and ensure
                location access is set to <b>&quot;While Using the App&quot;</b>
                .
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-xl font-medium">Android:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Open your phone&apos;s <b>Settings</b>.
              </li>
              <li>
                Tap <b>Location</b> and toggle it <b>on</b>.
              </li>
              <li>
                Ensure location permission is granted for your web browser or
                the app you&apos;re using by going to <b>App Permissions</b>.
              </li>
            </ol>
          </div>

          <h2 className="text-2xl font-semibold">Step 3: Solve Clues</h2>
          <p>
            Navigate to &quot;The Hunt&quot; section of the website to view your
            first clue. Clues may be puzzles, riddles, or challenges that
            require knowledge of Charleston, WV, or research using resources
            like &quot;The Hunt&quot; newspaper.
          </p>
          <p>
            Travel to the location indicated by the clue, and your GPS
            coordinates will confirm your presence, allowing you to progress to
            the next clue.
          </p>

          <h2 className="text-2xl font-semibold">Step 4: Compete for Prizes</h2>
          <p>
            The first person to solve all clues wins the $500 grand prize!
            Smaller prizes are hidden around the city, so keep an eye out while
            solving the clues.
          </p>

          <h2 className="text-2xl font-semibold">Game Rules</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Use only a GPS-enabled smartphone to play.</li>
            <li>No hacking or attempting to manipulate the game software.</li>
            <li>Have fun and enjoy exploring Charleston!</li>
          </ul>
        </div>
      </div>
    </>
  );
}
