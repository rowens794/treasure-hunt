// pages/signup.js
// import { useState, useEffect } from "react";
import { Session } from "next-auth"; // Import prebuilt Session type

interface Props {
  user: Session | null;
}

function Leaderboard({ user }: Props) {
  console.log(user);
  return (
    <>
      <span>Leaderboard</span>
    </>
  );
}

export default Leaderboard;
