// pages/signup.js
// import { useState, useEffect } from "react";
import { Session } from "next-auth";

interface Props {
  user: Session | null;
}

function Rules({ user }: Props) {
  console.log(user);
  return (
    <>
      <span>rules</span>{" "}
    </>
  );
}

export default Rules;
