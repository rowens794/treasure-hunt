// import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import User from "../interfaces/User";
import withAuth from "../lib/withAuth";

interface Props {
  user: User;
}

function Hunt({ user }: Props) {
  return (
    <div className="bg-stone-800 h-screen w-full">
      <span></span>
    </div>
  );
}

export default withAuth(Hunt);
