import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

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
              <h1 className="text-3xl font-bold mb-2">
                {String(metadata.title)}
              </h1>
              <Navbar />
            </header>

            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
