import Link from "next/link";
import React, { useState } from "react";
import User from "../interfaces/User";
import withAuth from "../lib/withAuth";

interface HomeProps {
  user: User;
}

const Menu: React.FC<HomeProps> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Menu Button */}
      {!menuOpen && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-3 right-3 z-30"
        >
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

      {/* Overlay Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-stone-800 bg-opacity-90 transition-opacity duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative flex flex-col h-full">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-3 right-3 z-30"
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
          <div className="pt-24 px-8 flex flex-col">
            <MenuItem text="Front Page" href="/" />
            <MenuItem text="Community" href="/community" />
            <MenuItem text="Business" href="/business" />
            <MenuItem text="Opinion" href="/opinion" />
            <MenuItem text="The Hunt" href="/hunt" />

            <div className="mt-12 flex flex-col">
              {user ? (
                <>
                  <MenuItem text="Messages" href="/messages" />
                  <MenuItem text="Logout" href="/logout" />
                </>
              ) : (
                <>
                  <MenuItem text="Sign In" href="/login" />
                  <MenuItem text="Register" href="/register" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link href={href} className="text-4xl text-stone-100 pb-2 cursor-pointer">
      {text}
    </Link>
  );
};

export default withAuth(Menu);
