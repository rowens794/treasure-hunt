// pages/signup.js
// import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import User from "../interfaces/User";
import withAuth from "../lib/withAuth";

interface Props {
  user: User;
}

function Rules({ user }: Props) {
  return (
    <>
      <Navbar user={user} />
    </>
  );
}

export default withAuth(Rules);
