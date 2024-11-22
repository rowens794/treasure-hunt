// import { useState, useEffect } from "react";
import User from "../interfaces/User";
import withAuth from "../lib/withAuth";

interface Props {
  user: User;
}

function Hunt({ user }: Props) {
  console.log(user);
  return (
    <div className="bg-stone-800 h-screen w-full">
      <span></span>
    </div>
  );
}

export default withAuth(Hunt);
