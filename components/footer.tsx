import Link from "next/link";
import MaxWidthContainer from "./shared/max-width-container";

function Footer() {
  return (
    <footer className="relative h-20 bg-white">
      <MaxWidthContainer className="border-t border-gray-200">
        <div className="flex h-full flex-col items-center justify-center md:flex-row md:justify-between">
          <div className="pb-2 text-center md:pb-0 md:text-left">
            <p className="text-foreground text-sm">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex space-x-8">
              <Link
                href="#"
                className="text-foreground text-sm hover:text-gray-600"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-foreground text-sm hover:text-gray-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-foreground text-sm hover:text-gray-600"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthContainer>
    </footer>
  );
}

export default Footer;
