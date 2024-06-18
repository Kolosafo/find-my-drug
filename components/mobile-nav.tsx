"use client";
import Link from "next/link";
import MaxWidthContainer from "./shared/max-width-container";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { useEffect, useState } from "react";

function MobileNav() {
  const pathname = usePathname();
  const { isLogged } = useSelector((state: IRootState) => state.user);
  console.log("PATH NAME: ", pathname);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) {
      setExpanded(!expanded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (expanded) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [expanded]);

  return (
    <header className="sticky inset-x-0 top-0 z-[100] h-14 border-b border-gray-200 bg-white/80 backdrop-blur-lg md:hidden">
      {/* logo */}
      <MaxWidthContainer className="flex items-center justify-between">
        <Link href="/" className="font-semibold lg:text-lg">
          <span className="text-blue-600">Rx</span>
          Find
        </Link>

        {/* nav-controls */}
        <button
          type="button"
          title="toggle menu"
          aria-controls="mobile-menu"
          onClick={() => setExpanded((prev) => !prev)}
          className="z-50 flex h-7 flex-col justify-center gap-1 rounded-sm bg-blue-400 p-1 outline-2 outline-offset-2 md:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded-full bg-white transition duration-500 ${expanded && "translate-y-1 rotate-45"}`}
            aria-hidden="true"
          ></span>
          <span
            className={`h-0.5 w-5 rounded-full bg-white transition duration-500 ${expanded && "hidden"}`}
            aria-hidden="true"
          ></span>
          <span
            className={`h-0.5 w-4 rounded-full bg-white transition duration-500 ${expanded && "w-6 -translate-y-0.5 -rotate-45"}`}
            aria-hidden="true"
          ></span>
        </button>

        {/* navigation */}
        <nav
          id="mobile-menu"
          className={`absolute inset-0 z-40 min-h-screen w-3/4 bg-white/90 backdrop-blur-lg transition-all duration-300 ease-in-out ${expanded ? "max-md:tranxlate-x-0" : "max-md:-translate-x-full"}`}
        >
          <ul className="flex h-full w-full flex-col gap-6 px-8 py-14 text-lg font-medium transition duration-300">
            {!isLogged && (
              <li className="relative">
                <Link
                  href="/auth/login"
                  className={`rounded-md px-3 py-1.5 text-sm text-foreground outline-2 transition duration-300 hover:bg-gray-100 focus-visible:outline-dashed ${
                    pathname === "/auth/login"
                      ? "bg-gray-100 text-blue-500"
                      : "bg-transparent"
                  }`}
                >
                  Login
                </Link>
              </li>
            )}

            <li className="relative">
              <Link
                href="/search"
                className={`rounded-md px-2 py-1.5 text-sm text-foreground outline-2 transition duration-300 hover:bg-gray-100 focus-visible:outline-dashed ${
                  pathname === "/search"
                    ? "bg-gray-100 text-blue-500"
                    : "bg-transparent"
                }`}
              >
                Search ✨
              </Link>
            </li>
            {isLogged && (
              <li className="relative">
                <Link
                  href="/search/history"
                  className={`rounded-md px-2 py-1 text-sm outline-2 hover:bg-gray-100 focus-visible:outline-dashed ${
                    pathname === "/search/history"
                      ? "bg-gray-200"
                      : "bg-transparent"
                  }`}
                >
                  History
                </Link>
              </li>
            )}
            <li className="relative">
              <Link
                href="/pharmacies"
                className={`rounded-md px-2 py-1 text-sm outline-2 hover:bg-gray-100 focus-visible:outline-dashed ${
                  pathname === "/pharmacies" ? "bg-gray-200" : "bg-transparent"
                }`}
              >
                Pharmacies
              </Link>
            </li>
          </ul>
        </nav>

        {/* backdrop */}
        <div
          className={`fixed inset-0 z-20 min-h-screen bg-black/90 backdrop-blur-md transition md:hidden ${
            expanded ? "visible opacity-100" : "invisible opacity-0"
          }`}
          aria-hidden="true"
          onClick={() => setExpanded(false)}
        />
      </MaxWidthContainer>
    </header>
  );
}

export default MobileNav;
