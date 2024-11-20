import { useEffect } from "react";
import Navbar from "../components/Navbar";
import User from "../interfaces/User";
import withAuth from "../lib/withAuth";

interface Props {
  user: User;
}
function SUSuccess({ user }: Props) {
  //if user is logged in redirect to home
  useEffect(() => {
    if (user) {
      window.location.href = "/";
    }
  }, [user]);
  return (
    <>
      <Navbar user={user} />
      {!user ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h1>You&apos;re In!</h1>
          <p>We&apos;ve sent you an email to verify your email address.</p>
          <p>Go click the link to complete your account setup.</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default withAuth(SUSuccess);
