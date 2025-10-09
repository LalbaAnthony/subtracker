import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/layout/navbar";
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
    <div className="container mx-auto">
      <nav className="mb-8 flex justify-between items-center">
        <Navbar />
      </nav>

      <div>{children}</div>
    </div>
  );
}
