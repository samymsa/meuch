import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-background">
      <div className="container mx-auto flex justify-between items-center py-4">
        <NavigationMenu>
          <NavigationMenuList className="justify-start">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="text-lg font-semibold hover:underline">
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
                <Link href="/about" className="text-lg font-semibold hover:underline">
                  À propos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
