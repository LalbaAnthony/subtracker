"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const items: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Mon compte",
    href: "/profile",
    description: "",
  },
];

export default function ProfileNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <nav>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {items.map((item) => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link href={item.href}>
                  <div className="text-sm leading-none font-medium">
                    {item.title}
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                    {item.description}
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
          <Button
            onClick={handleLogout}
            variant="destructive"
            className=""
          >
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
          </Button>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
