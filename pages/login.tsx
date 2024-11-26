import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SlRefresh } from "react-icons/sl"; // Google Icon
import { FaFacebook } from "react-icons/fa"; // Facebook Icon
import NewsTooper from "@/components/NewsTooper";

function Login() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/hunt";
    }
  }, [status]);

  const handleSocialLogin = (provider: "google" | "facebook") => {
    signIn(provider);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("email", {
      email,
      redirect: false, // Prevent immediate redirection
      callbackUrl: "/hunt", // Redirect after successful login
    });

    if (res?.error) {
      setMessage("Failed to send magic link. Please try again.");
    } else {
      setMessage("Magic link sent! Check your email.");
    }
  };

  return (
    <>
      <NewsTooper />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {session ? (
            <div className="w-full flex justify-center">
              <SlRefresh className="h-12 w-12 text-stone-700 animate-spin" />
            </div>
          ) : (
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 girassol-regular">
              Sign in to your account
            </h2>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!session && (
            <>
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="w-full flex items-center justify-center rounded-sm bg-[#FBEDDC] border border-stone-700 px-3 py-1.5 text-sm font-semibold font-serif text-stone-700 shadow-sm hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
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
                  Or sign in with your email
                </p>
              </div>

              <form
                onSubmit={handleMagicLink}
                className="space-y-2 mt-6 flex flex-col items-center"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-stone-700 bg-[#FBEDDC] rounded-sm py-2 px-3 text-sm font-serif text-stone-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center rounded-sm bg-[#FBEDDC] border border-stone-700 px-3 py-1.5 text-sm font-semibold font-serif text-stone-700 shadow-sm hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  Send Log In Link
                </button>
              </form>
              {message && (
                <p className="mt-4 text-center text-green-500 font-serif">
                  {message}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
