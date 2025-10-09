import type { Metadata } from "next";
import "../../globals.css";
import ProfileNavbar from "@/components/profile/profile-navbar";

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
    <div className="">
      <div className="mb-4">
        <ProfileNavbar />
      </div>

      <div>{children}</div>
    </div>
  );
}
