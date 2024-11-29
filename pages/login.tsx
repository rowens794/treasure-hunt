import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SlRefresh } from "react-icons/sl"; // Google Icon
import { FaFacebook } from "react-icons/fa"; // Facebook Icon
import NewsTooper from "@/components/NewsTooper";
import Menu from "@/components/Menu";

function Login() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/hunt";
    }
  }, [status]);

  const handleSocialLogin = (provider: "google" | "facebook") => {
    signIn(provider);
  };

  return (
    <>
      <Menu user={session} />
      <NewsTooper />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {session ? (
            <div className="w-full flex justify-center">
              <SlRefresh className="h-12 w-12 text-stone-700 animate-spin" />
            </div>
          ) : (
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900 girassol-regular">
              Sign in to the Hunt
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
