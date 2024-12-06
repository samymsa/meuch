"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isContactPage = pathname === "/credits";

  return (
    <nav
      className={`w-full bg-transparent fixed top-0 z-50 px-8 ${
        isContactPage ? "text-black" : "text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4">
        <NavigationMenu>
          <NavigationMenuList className="justify-start">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="text-lg font-semibold hover:underline"
                >
                  MEUCH
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList className="justify-end">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/credits"
                  className="text-lg font-semibold hover:underline"
                >
                  À propos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
