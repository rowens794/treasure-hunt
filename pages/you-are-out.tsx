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
        <h1>You&apos;re Out!</h1>
        <p>We have officially forgotten everything about you.</p>
        <span>Atleast until you log back in.</span>
      </div>
    </>
  );
}

export default withAuth(Signout);
