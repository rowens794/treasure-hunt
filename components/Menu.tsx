import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth"; // Import prebuilt Session type

interface Props {
  user: Session | null;
}

const Menu = ({ user }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  return (
    <div className="z-[99] w-full fixed max-w-md top-2 flex justify-end">
      {!menuOpen && (
        <button onClick={() => setMenuOpen(!menuOpen)} className="z-[100] mr-4">
          <svg
            viewBox="0 0 100 80"
            width="40"
            height="40"
            className="fill-stone-800"
          >
            <rect width="100" height="10"></rect>
            <rect y="25" width="100" height="10"></rect>
            <rect y="50" width="100" height="10"></rect>
          </svg>
        </button>
      )}

      <div
        className={`fixed z-[99] top-0 left-0 w-full h-full bg-stone-800 bg-opacity-100 transition-opacity duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative flex flex-col h-full z-[99]">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-3 right-3 z-[100]"
          >
            <svg
              viewBox="0 0 100 100"
              width="40"
              height="40"
              className="fill-stone-50"
            >
              <polygon points="73.651,29.883 70.116,26.348 50,46.465 29.884,26.348 26.349,29.883 46.465,50 26.349,70.117 29.884,73.652   50,53.535 70.116,73.652 73.651,70.117 53.535,50 " />
            </svg>
          </button>

          {/* Menu Links */}
          <div className="pt-24 px-8 flex flex-col z-[99]">
            <MenuItem text="Front Page" href="/" />
            <MenuItem text="Community" href="/community" />
            <MenuItem text="Business" href="/business" />
            <MenuItem text="Opinion" href="/opinion" />
            <MenuItem text="The Hunt" href="/hunt" />

            <div className="mt-12 flex flex-col">
              {user ? (
                <>
                  <MenuItem text="Messages" href="/messages" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-4xl text-stone-100 pb-2 cursor-pointer text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <MenuItem text="Sign In" href="/login" />
                  <MenuItem text="Register" href="/signup" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link href={href} className="text-4xl text-stone-100 pb-2 cursor-pointer">
      {text}
    </Link>
  );
};

export default Menu;
