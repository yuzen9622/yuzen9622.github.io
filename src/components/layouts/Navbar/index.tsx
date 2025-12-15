"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import Tool from "@/components/layouts/Navbar/Tool";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useProfile } from "@/shared/hook/useProfile";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function Navbar() {
  const { navigation, profile } = useProfile();
  const { lng } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const MotionLink = motion.create(NavLink);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <NavigationMenu
        className={cn(
          "p-3   outline  hover:shadow-xs transition-[width]  w-11/12 rounded-full  h-fit hidden sm:block flex-none  fixed top-2 z-10 bg-background/80  backdrop-blur-xs"
        )}
      >
        <NavigationMenuList className="transition-all">
          {navigation.map((item, index) => (
            <li key={item.title}>
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
                  to={{ pathname: `/${lng}/${item.route}` }}
                >
                  <span>{item.title}</span>
                </NavLink>
              </NavigationMenuItem>{" "}
            </li>
          ))}
          <Tool />
        </NavigationMenuList>
      </NavigationMenu>

      {/** RWD navbar */}
      <NavigationMenu
        className={cn(
          "p-3  w-11/12 max-w-none  h-fit  hidden max-sm:flex rounded-2xl transition-all justify-between flex-none fixed top-2 z-20  backdrop-blur-xs bg-background/80",
          isOpen && "max-sm:backdrop-blur-none bg-transparent",
          isTop && "w-full top-0 rounded-none"
        )}
      >
        <NavLink to={"/"} className="relative font-bold text-xl  text-primary">
          <Avatar className="  pointer-events-none  w-10 h-10     aspect-square">
            <AvatarImage
              className=" rounded-full"
              alt={profile.name}
              width={48}
              height={48}
              src={profile.avatar}
            />
            <AvatarFallback>{profile.name}</AvatarFallback>
          </Avatar>
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
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className=" fixed z-10  bg-background/80  sm:hidden w-dvw h-dvh backdrop-blur-3xl flex justify-center flex-col items-center gap-10 "
          >
            <AnimatePresence mode="wait">
              {isOpen &&
                navigation.map((item, index) => (
                  <MotionLink
                    key={item.title}
                    layout
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    exit={{ y: 40, opacity: 0 }}
                    to={{ pathname: `/${lng}/${item.route}` }}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        " px-4 py-2 text-4xl    ",
                        isActive && " underline underline-offset-2"
                      )
                    }
                  >
                    {item.title}
                  </MotionLink>
                ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
