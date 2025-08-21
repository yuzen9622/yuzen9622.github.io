import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import Tool from "@/components/Navbar/Tool";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useProfile } from "@/hook/useProfile";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { navigation, mySelf } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const MotionLink = motion.create(NavLink);
  return (
    <>
      <NavigationMenu className="p-3  w-11/12 rounded-full  h-fit hidden sm:block flex-none sticky top-2 z-10 bg-background/80  backdrop-blur-xs">
        <NavigationMenuList>
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
                  to={item.route}
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
          "p-3  w-11/12 max-w-none  h-fit  hidden max-sm:flex rounded-2xl justify-between flex-none sticky top-2 z-50  backdrop-blur-xs bg-background/80",
          isOpen && "max-sm:backdrop-blur-none bg-transparent"
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
                    to={item.route}
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
