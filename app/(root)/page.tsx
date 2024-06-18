import MaxWidthContainer from "@/components/shared/max-width-container";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <MaxWidthContainer className="grid place-items-center pb-24 pt-8 lg:pb-24 lg:pt-10 xl:gap-x-8 xl:pt-12">
        <div>
          <div className="lg:text-lef relative mx-auto flex flex-col items-center text-center lg:items-start">
            <div className="mt-4 md:mt-6 lg:mt-8 xl:mt-10">
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-widest text-blue-600">
                RxFind
              </span>
              <h1 className="relative w-fit text-balance text-4xl font-bold !leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="px-2 text-blue-600"> Hassle free</span> search
                for your medical
                <span className="px-2 text-blue-600"> prescriptions</span>{" "}
              </h1>
            </div>
            <p className="lg:text-lef mx-auto mt-8 max-w-prose text-balance text-center text-lg md:text-wrap lg:pr-10">
              <span className="font-semibold">
                Don&apos;t settle for alternative drugs
              </span>{" "}
              Seach for your prescriptions easily from over 2,000 pharmacies
              across Nigeria.
            </p>

            <div className="mt-8 flex w-full flex-col items-center justify-center gap-8 text-left font-medium lg:flex-row lg:gap-14 xl:gap-28">
              <div>
                <h2 className="mb-4 text-blue-600">For individuals</h2>
                <ul className="space-y-2">
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    Find prescriptions easily.
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    Zero cost to start.
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    Govt Approved.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-4 text-blue-600">For businesses</h2>
                <ul className="space-y-2">
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    Bring customers to you.
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    Sell out quickly.
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    Govt Approved.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex w-full items-center justify-center">
            <Link
              href="/search"
              className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white transition duration-300 hover:bg-blue-600/80"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
