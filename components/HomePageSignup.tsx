import React from "react";
import { useSession } from "next-auth/react";

function HomePageSignup() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // Don't render anything while the authentication status is loading
    return null;
  }

  if (!session) {
    // User is not signed in, render the component
    return (
      <div className="pb-8">
        <div className="cutout-div bg-stone-800 text-stone-50 pt-8 p-4 w-full">
          <h2 className="text-center girassol-regular text-xl font-bold tracking-wider">
            Become a Patron
          </h2>
          <p className="text-md text-justify font-serif font-light leading-5 pt-4 pb-2 px-4">
            Register to get every update on the missing Strother treasure. 100%
            free!
          </p>
          <div className="py-4 px-4">
            <button className="border border-stone-50 p-2 font-serif w-full">
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User is signed in, don't render anything
  return null;
}

export default HomePageSignup;
