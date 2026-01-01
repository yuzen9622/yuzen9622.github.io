"use client";
import { ArrowUp, Moon, Sun } from "lucide-react";

import { useTheme } from "@/shared/hook/useTheme";

import { NavigationMenuItem } from "../../ui/navigation-menu";
import { useMemo, useRef, useState } from "react";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CircleProgress } from "./CircleProgress";

import { LanguageSelector } from "@/components/shared/LangSwitch";

export default function Tool() {
  const { setTheme, theme, systemTheme } = useTheme();

  const isDark =
    (theme === "system" && systemTheme === "dark") || theme === "dark";

  const MotionNavigationMenuItem = useMemo(
    () => motion.create(NavigationMenuItem),
    []
  );
  const circleRef = useRef<SVGCircleElement>(null);
  const { scrollYProgress } = useScroll();
  const [scrollYPercent, setScrollYPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const percent = Math.max(0, Math.min(100, Math.round(latest * 100)));
    setScrollYPercent(percent);
  });

  const r = 45;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - scrollYPercent / 100);

  return (
    <>
      <NavigationMenuItem
        className=" p-2  cursor-pointer hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary"
        onClick={() => {
          setTheme(isDark ? "light" : "dark");
        }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </NavigationMenuItem>
      <NavigationMenuItem className="">
        <LanguageSelector />
      </NavigationMenuItem>
      {scrollYPercent !== 0 && (
        <MotionNavigationMenuItem
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative isolate  cursor-pointer   text-foreground"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="relative  z-10 border  flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-background">
            {scrollYPercent === 100 ? (
              <ArrowUp size={18} />
            ) : (
              <CircleProgress
                ref={circleRef}
                circumference={circumference}
                offset={offset}
                scrollY={scrollYPercent}
              />
            )}
          </span>
        </MotionNavigationMenuItem>
      )}
    </>
  );
}
