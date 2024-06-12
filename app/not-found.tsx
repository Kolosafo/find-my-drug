import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MaxWidthContainer from "@/components/shared/max-width-container";

export default function Notfound() {
  return (
    <MaxWidthContainer className="grid min-h-[calc(100vh-60px)] place-items-center">
      <div className="flex h-full flex-col items-center justify-center gap-6 lg:gap-8">
        <h1 className="text-center text-2xl font-bold uppercase lg:text-4xl">
          Something went wrong
        </h1>
        <p className="max-w-[900px] text-center text-lg lg:text-xl">
          The page you&apos;re looking for has either been removed or
          doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-600/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>
    </MaxWidthContainer>
  );
}
