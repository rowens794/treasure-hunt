// pages/login.tsx
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FaFacebook } from "react-icons/fa"; // Facebook Icon
import User from "../interfaces/User";
import withAuth from "../lib/withAuth";

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
  };

  return (
    <>
      <Navbar user={user} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          {user ? (
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              You&apos;re already logged in!
            </h2>
          ) : (
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!user && (
            <>
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="w-full flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Sign in with Google
                </button>
                <button
                  onClick={() => handleSocialLogin("facebook")}
                  className="w-full flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                >
                  <FaFacebook className="mr-2 h-5 w-5" />
                  Sign in with Facebook
                </button>
              </div>

              {/* Consistent Separation */}
              <div className="relative mt-12">
                {/* Separation */}
                <div className="border-t border-gray-300"></div>

                {/* Explainer Text */}
                <p className="absolute inset-x-0 -top-2 mx-auto w-max bg-white px-2 text-center text-sm text-gray-500">
                  Or sign up with your email
                </p>
              </div>

              {/* Email/Password Login Form */}
              <form className="space-y-6 mt-6" onSubmit={handleEmailLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 pl-4"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 pl-4"
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default withAuth(Login);
