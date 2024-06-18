"use client";
import { auth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import loginPNG from "../../../../public/loginIcon.png";
import Image from "next/image";

const ResetPassword = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const checkValidity = handleCheckFields();
    if (!checkValidity) {
      return;
    }
    setIsLoading(true);
    await sendPasswordResetEmail(auth, loginData)
      .then((res) => setSuccess(true))
      .catch(() => {
        setErrorMsg("Invalid credentials");
      });
    setIsLoading(false);
  };

  const handleCheckFields = () => {
    setErrorMsg("");
    if (loginData) {
      return true;
    }
    setErrorMsg("Please provide a valid email");
    return false;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-[70%] items-center justify-center">
        <div className="flex flex-col max-lg:hidden">
          <h1 className="mb-6 text-center text-4xl font-semibold text-emerald-400">
            Reset Your Password
          </h1>
          <Image src={loginPNG} alt="Login Png" width={700} />
        </div>
        {!success ? (
          <div className="mx-auto mb-4 w-full max-w-lg rounded bg-emerald-100 px-8 pb-8 pt-6 shadow-md">
            <span className="text-sm text-red-500">{errorMsg}</span>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="email"
                type="text"
                placeholder="johndoe@mail.com"
                value={loginData}
                onChange={(e) => setLoginData(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              {" "}
              {/* change to between when forgot password func is available */}
              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className={`rounded bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-700 ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
              <Link
                href="/auth/login"
                className="inline-block self-end align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
              >
                Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex">
            <span className="text-center">
              PLEASE CHECK YOUR EMAIL TO COMPLETE RESETTING YOUR PASSWORD
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
