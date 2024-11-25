import { useEffect } from "react";

import { Session } from "next-auth";

interface Props {
  user: Session | null;
}

function Signout({ user }: { user: Props }) {
  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1>You&apos;re Out!</h1>
        <p>We have officially forgotten everything about you.</p>
        <span>Atleast until you log back in.</span>
      </div>
    </>
  );
}

export default Signout;
