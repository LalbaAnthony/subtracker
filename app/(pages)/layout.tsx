import "../globals.css";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 flex justify-between items-center">
          <Link href="/dashboard">
            <Image
              className="block sm:hidden"
              src="/images/logo-mini.png"
              height={35}
              width={35}
              priority={true}
              alt="SubTracker Logo"
            />
            <Image
              className="hidden sm:block"
              src="/images/logo.png"
              height={50}
              width={150}
              priority={true}
              alt="SubTracker Logo"
            />
          </Link>
          <Navbar />
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
