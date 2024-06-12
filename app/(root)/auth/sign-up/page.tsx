import MaxWidthContainer from "@/components/shared/max-width-container";
import { ArrowLeft, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  return (
    <MaxWidthContainer className="relative grid min-h-screen w-full place-content-center bg-gray-100">
      <Link
        href="/search"
        className="absolute left-6 top-6 flex w-fit items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm transition duration-300 hover:bg-gray-50 hover:text-blue-600 md:left-20 md:top-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="flex min-w-[300px] flex-col gap-8 rounded-md bg-white p-6 shadow-md lg:min-w-[360px] lg:px-8 lg:py-10">
        <div className="flex flex-col items-center gap-4 leading-3">
          <div>
            <LogIn className="text-blue-600" />
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold">Welcome</h1>
            <p className="text-sm">Please sign in to continue.</p>
          </div>
        </div>

        <form>
          <div className="flex flex-col gap-6">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-md border border-gray-200 p-4 outline-none transition duration-300 hover:bg-gray-100 focus-visible:border-dotted focus-visible:bg-gray-100"
            >
              <Image src={"/google.svg"} alt="google" width={20} height={20} />
              <span className="text-sm">Sign in with Google</span>
            </button>

            <div className="flex items-center">
              <div className="h-px w-full bg-gray-100" />
              <span className="mx-4 text-sm">or</span>
              <div className="h-px w-full bg-gray-100" />
            </div>

            <div className="relative">
              <label htmlFor="email" className="mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your email address"
                aria-describedby="email-error"
                className="border-input peer w-full rounded-md border p-3 placeholder:text-transparent focus-visible:border-transparent focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-blue-600"
              />
            </div>
          </div>
        </form>
      </div>
    </MaxWidthContainer>
  );
}
