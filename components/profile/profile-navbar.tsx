import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export const items: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Mon compte",
    href: "/",
    description: "",
  },
];

export default function ProfileNavbar() {
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
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
