"use client";
import Link from "next/link";
import MaxWidthContainer from "./shared/max-width-container";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  console.log("PATH NAME: ", pathname);

  return (
    <header className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthContainer className="flex items-center justify-between">
        <Link href="/" className="font-semibold lg:text-lg">
          <span className="text-blue-600">Rx</span>
          Find
        </Link>
        <nav>
          <ul
            className={`flex min-w-full gap-6 text-lg font-medium transition duration-300`}
          >
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
                className={`rounded-md px-3 py-1.5 text-sm text-foreground outline-2 transition duration-300 hover:bg-gray-100 focus-visible:outline-dashed ${
                  pathname === "/search"
                    ? "bg-gray-100 text-blue-500"
                    : "bg-transparent"
                }`}
              >
                Search ✨
              </Link>
            </li>
            {!isLogged && (
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
          </ul>
        </nav>
      </MaxWidthContainer>
    </header>
  );
}

export default Navbar;
