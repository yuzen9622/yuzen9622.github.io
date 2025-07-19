import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import AnimatedContent from "@/components/gsap/animation/AnimatedContent";
import { useProfile } from "@/hook/useProfile";
import Tool from "./Tool";

export default function Navbar() {
  const { navigation, mySelf } = useProfile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NavigationMenu className="p-3  w-11/12 rounded-full  h-fit hidden sm:block flex-none sticky top-2 z-10 bg-background/80  backdrop-blur-xs">
        <NavigationMenuList>
          {navigation.map((item, index) => (
            <NavigationMenuItem
              asChild
              key={index}
              className="overflow-hidden  "
            >
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "rounded-3xl  px-4  py-2 z-0 transition  hover:text-background relative hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary ",
                    isActive && "before:scale-100 before:opacity-100"
                  )
                }
                to={item.route}
              >
                <span className={cn("  ", `group-hover/a:after:translate-0`)}>
                  {item.title}
                </span>
              </NavLink>
            </NavigationMenuItem>
          ))}
          <Tool />
        </NavigationMenuList>
      </NavigationMenu>

      {/** RWD navbar */}
      <NavigationMenu
        className={cn(
          "p-3  w-11/12 max-w-none  h-fit  hidden max-sm:flex rounded-2xl justify-between flex-none sticky top-2 z-50  backdrop-blur-xs bg-background/80",
          isOpen && "max-sm:backdrop-blur-none"
        )}
      >
        <NavLink to={"/"} className=" font-bold text-xl  text-primary">
          {mySelf.name}
        </NavLink>
        <NavigationMenuList>
          <div className="flex gap-2 items-center ">
            <NavigationMenuItem
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              {isOpen ? <X /> : <Menu />}
            </NavigationMenuItem>
            <Tool />
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
                    " px-4 py-2 text-4xl   transition ",
                    isActive && " underline underline-offset-2"
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
