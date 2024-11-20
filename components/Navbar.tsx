import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import User from "../interfaces/User";
import { supabase } from "../lib/supabaseClient";

const navigation = [
  { name: "home", href: "/", current: false },
  { name: "rules", href: "/rules", current: false },
  { name: "leaderboard", href: "/leaderboard", current: false },
];

function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ user }: { user: User | null }) {
  const url = typeof window !== "undefined" ? window.location.pathname : "";

  navigation.forEach((nav) => {
    if (nav.href === url) {
      nav.current = true;
    } else {
      nav.current = false;
    }
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
    if (!error) window.location.href = "/";
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {/* <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              /> */}
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="relative rounded-md bg-gray-800 p-1 text-red-200 hover:text-red-300 px-4 hover:bg-gray-700"
                >
                  Log Out
                </button>
                <Link href="/hunt">
                  <button
                    type="button"
                    className="relative rounded-md bg-gray-800 p-1 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 border-gray-100 border px-4 hover:bg-gray-700"
                  >
                    Hunt!
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-4">
                <SignInButton />

                <SignUpButton />
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Navbar;
// export default withAuth(Navbar);

const SignUpButton = () => {
  return (
    <Link href="/signup">
      <button
        type="button"
        className="relative rounded-md bg-blue-600 p-1 text-blue-100 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-4"
      >
        Sign Up
      </button>
    </Link>
  );
};

const SignInButton = () => {
  return (
    <Link href="/login">
      <button
        type="button"
        className="relative rounded-md  p-1 bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-4"
      >
        Sign In
      </button>
    </Link>
  );
};
