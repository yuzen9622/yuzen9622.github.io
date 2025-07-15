import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/hook/useTheme";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import AnimatedContent from "./gsap/animation/AnimatedContent";
import { useProfile } from "@/hook/useProfile";

export default function Navbar() {
  const { setTheme, theme, systemTheme } = useTheme();
  const { navigation, mySelf } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const isDark =
    (theme === "system" && systemTheme === "dark") || theme === "dark";
  return (
    <>
      <NavigationMenu className="p-3 w-11/12 rounded-full  h-fit hidden sm:block flex-none sticky top-2 z-10 bg-background/80  backdrop-blur-xs">
        <NavigationMenuList>
          {navigation.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavLink
                className={cn(
                  "group/a rounded-3xl px-4 py-2 transition hover:bg-secondary  "
                )}
                to={item.route}
              >
                <span
                  className={cn(
                    " relative after:bg-primary after:content-['']  after:transition-all after:scale-x-0 after:origin-left  after:absolute after:w-full  after:h-0.5 after:bottom-0 after:right-0 rounded-3xl",
                    `group-hover/a:after:scale-x-100`
                  )}
                >
                  {item.title}
                </span>
              </NavLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem
            className=" p-2"
            onClick={() => {
              setTheme(isDark ? "light" : "dark");
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/** RWD navbar */}
      <NavigationMenu
        className={cn(
          "p-3  w-11/12 max-w-none  h-fit  hidden max-sm:flex rounded-2xl justify-between flex-none sticky top-2 z-50  backdrop-blur-xs bg-background/80",
          isOpen && "max-sm:backdrop-blur-none"
        )}
      >
        <span className=" font-bold text-xl text-slate-600 dark:text-slate-300">
          {mySelf.name}
        </span>
        <NavigationMenuList>
          <div className="flex gap-2 items-center ">
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
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      {isOpen && (
        <div className=" fixed z-10  bg-background/80  sm:hidden w-dvw h-dvh backdrop-blur-3xl flex justify-center flex-col items-center gap-10 ">
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
