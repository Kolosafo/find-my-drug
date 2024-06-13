import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main className="h-full w-full">{children}</main>
      <Footer />
    </div>
  );
}
