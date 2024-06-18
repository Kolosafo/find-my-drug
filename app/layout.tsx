import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "./ReduxWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RxFind",
  description: "Hassle free search for your medical prescriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxWrapper>
      <body className={poppins.className}>
        {children}
        <ToastContainer />
      </body>
    </ReduxWrapper>
  );
}
