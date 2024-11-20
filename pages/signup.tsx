import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FaFacebook } from "react-icons/fa"; // Facebook Icon

import Navbar from "../components/Navbar";
import User from "../interfaces/User";
import withAuth from "../lib/withAuth";

interface Props {
  user: User;
}

function Signup({ user }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    validateForm();
  }, [email, password, confirmPassword]);

  const validateForm = () => {
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    setIsFormValid(
      !newErrors.email && !newErrors.password && !newErrors.confirmPassword
    );
  };

  const handleBlur = (field: "email" | "password" | "confirmPassword") => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      alert("Error creating account. Please try again.");
    } else {
      window.location.href = "/signup-success";
    }
  };

  const handleSocialSignup = async (provider: "google" | "facebook") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/signup-success`,
      },
    });

    if (error) {
      console.error(`Error signing up with ${provider}:`, error.message);
      alert(`Error with ${provider} signup. Please try again.`);
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
              You&apos;re already signed in!
            </h2>
          ) : (
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Create Your Account
            </h2>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!user && (
            <>
              {/* Social Signup Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialSignup("google")}
                  className="w-full flex items-center justify-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Sign up with Google
                </button>
                <button
                  onClick={() => handleSocialSignup("facebook")}
                  className="w-full flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                >
                  <FaFacebook className="mr-2 h-5 w-5" />
                  Sign up with Facebook
                </button>
              </div>

              <div className="relative mt-12">
                {/* Separation */}
                <div className="border-t border-gray-300"></div>

                {/* Explainer Text */}
                <p className="absolute inset-x-0 -top-2 mx-auto w-max bg-white px-2 text-center text-sm text-gray-500">
                  Or sign up with your email
                </p>
              </div>

              {/* Email Signup Form */}
              <form className="space-y-6 mt-6" onSubmit={handleSignup}>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6 pl-4 ${
                        errors.email && touched.email
                          ? "ring-red-500 focus:ring-red-500"
                          : "ring-gray-300 focus:ring-indigo-600"
                      }`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => handleBlur("password")}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6 pl-4 ${
                        errors.password && touched.password
                          ? "ring-red-500 focus:ring-red-500"
                          : "ring-gray-300 focus:ring-indigo-600"
                      }`}
                    />
                    {errors.password && touched.password && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => handleBlur("confirmPassword")}
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6 pl-4 ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "ring-red-500 focus:ring-red-500"
                          : "ring-gray-300 focus:ring-indigo-600"
                      }`}
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                    disabled={!isFormValid}
                  >
                    Create Account
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

export default withAuth(Signup);
