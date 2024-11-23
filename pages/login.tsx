import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Menu from "../components/Menu";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FaFacebook } from "react-icons/fa"; // Facebook Icon
import User from "../interfaces/User";
import withAuth from "../lib/withAuth";
import NewsTooper from "@/components/NewsTooper";

interface Props {
  user: User;
}

function Login({ user }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      window.location.href = "/hunt";
    }
  }, [user]);

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      setError("Invalid email or password. Please try again.");
    } else {
      window.location.href = "/hunt";
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setError(null); // Clear previous errors
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/hunt`,
        },
      });

      if (error) {
        console.error(`Error with ${provider} login:`, error.message);
        setError(`Unable to log in with ${provider}. Please try again.`);
      }
    } catch (err) {
      console.error(`Unexpected error during ${provider} login:`, err);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <NewsTooper />
      <Menu user={user} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {user ? (
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 girassol-regular">
              You&apos;re already logged in!
            </h2>
          ) : (
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 girassol-regular">
              Sign in to your account
            </h2>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!user && (
            <>
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="w-full flex items-center justify-center rounded-sm bg-[#FBEDDC] border border-stone-700 px-3 py-1.5 text-sm font-semibold font-serif text-stone-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Sign in with Google
                </button>
                <button
                  onClick={() => handleSocialLogin("facebook")}
                  className="w-full flex items-center justify-center rounded-sm bg-blue-600 font-serif px-3 py-1.5 text-sm font-semibold text-white shadow-sm border border-stone-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                >
                  <FaFacebook className="mr-2 h-5 w-5" />
                  Sign in with Facebook
                </button>
              </div>

              <div className="relative mt-12">
                <div className="border-t border-stone-800"></div>
                <p className="absolute inset-x-0 -top-2 mx-auto w-max bg-[#f4d3a8] px-2 text-center text-sm text-stone-800 font-serif">
                  Or sign up with your email
                </p>
              </div>

              <form
                className="space-y-6 mt-6 font-serif text-stone-900"
                onSubmit={handleEmailLogin}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full border rounded-sm py-1.5 text-stone-900 shadow-sm ring-gray-300 placeholder:text-stone-400 sm:text-sm/6 pl-4 bg-[#FEFBF6]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full border rounded-sm py-1.5 text-stone-900 shadow-sm ring-gray-300 placeholder:text-stone-400 sm:text-sm/6 pl-4 bg-[#FEFBF6]"
                  />
                </div>

                {error && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-sm bg-[#304C89] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-sky-800"
                >
                  Log in
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default withAuth(Login);
