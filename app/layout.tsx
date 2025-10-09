import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "SubTracker",
  description: "Suivez et gérez vos abonnements facilement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen bg-slate-50">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <header className="mb-8 flex justify-between items-center">
              <Link href="/">
                {/* Auto width */}
                <Image
                  src="/logo.png"
                  height={75}
                  width={200}
                  priority={true}	
                  alt="SubTracker Logo"
                />
              </Link>
              <Navbar />
            </header>

            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
