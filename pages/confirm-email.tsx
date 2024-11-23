import { useEffect } from "react";

import Navbar from "../components/Navbar";
import User from "../interfaces/User";
import withAuth from "../lib/withAuth";

function Signout({ user }: { user: User }) {
  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <>
      <Navbar user={user} />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1>Confirm Your Email Address!</h1>
        <p>
          We&apos;ve sent you and email to confirm your email address. Please go
          and click the link to login.
        </p>
      </div>
    </>
  );
}

export default withAuth(Signout);
