import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/hook/useTheme";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import AnimatedContent from "./gsap/aniamtion/AnimatedContent";

const navigation = [
  { title: "Small Z", route: "/" },
  { title: "Project", route: "/projects" },
  { title: "Experience", route: "/experience" },
  { title: "Contact", route: "/contact" },
];

export default function Navbar() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isDark =
    (theme === "system" && systemTheme === "dark") || theme === "dark";
  return (
    <>
      <NavigationMenu className="p-3 w-11/12 rounded-full h-fit hidden sm:block flex-none sticky top-2 z-10  backdrop-blur-lg">
        <NavigationMenuList>
          {navigation.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavLink to={item.route}>
                {({ isActive }) => (
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "rounded-3xl px-4 py-2 hover:bg-slate-200 dark:hover:bg-white/10 transition",
                      isActive
                        ? "bg-slate-200 dark:bg-white/10"
                        : "bg-transparent"
                    )}
                  >
                    <span>{item.title}</span>
                  </NavigationMenuLink>
                )}
              </NavLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem
            onClick={() => {
              setTheme(isDark ? "light" : "dark");
            }}
          >
            {isDark ? <Sun /> : <Moon />}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu
        className={cn(
          "p-3  w-11/12 max-w-none  h-fit  hidden max-sm:flex rounded-2xl  justify-between flex-none sticky top-2 z-50  backdrop-blur-lg",
          isOpen && "max-sm:backdrop-blur-none"
        )}
      >
        <span className=" font-bold text-xl text-slate-600 dark:text-slate-300">
          Small Z
        </span>
        <NavigationMenuList>
          <div className="flex gap-2">
            <NavigationMenuItem
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              {isOpen ? <X /> : <Menu />}
            </NavigationMenuItem>
            <NavigationMenuItem
              onClick={() => {
                setTheme(isDark ? "light" : "dark");
              }}
            >
              {isDark ? <Sun /> : <Moon />}
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      {isOpen && (
        <div className=" fixed z-10  sm:hidden w-dvw h-dvh backdrop-blur-3xl flex justify-center flex-col items-center gap-10 bg-transparent">
          {navigation.map((item, index) => (
            <AnimatedContent delay={index / 10} key={index}>
              <NavLink
                to={item.route}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    " px-4 py-2 text-4xl   transition",
                    isActive
                      ? " underline underline-offset-2"
                      : "bg-transparent"
                  )
                }
              >
                {item.title}
              </NavLink>
            </AnimatedContent>
          ))}
        </div>
      )}
    </>
  );
}
