"use client";
import { ArrowUp, Moon, Sun } from "lucide-react";

import { useTheme } from "@/shared/hook/useTheme";

import { NavigationMenuItem } from "../../ui/navigation-menu";
import { useEffect, useMemo, useRef, useState } from "react";

import { motion } from "framer-motion";
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
  const [observerScroll, setObserverScroll] = useState<{
    direction: "up" | "down";
    scrollY: number;
    offset: number;
    circumference: number;
  }>({
    direction: "down",
    scrollY: 0,
    offset: 0,
    circumference: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollY = window.pageYOffset ?? document.documentElement.scrollTop;
      const progress = (scrollY / totalHeight) * 100;

      const r = circleRef.current?.getAttribute("r") ?? 45;
      const circumference = 2 * Math.PI * Number(r);
      const offset = circumference * (1 - progress / 100);

      setObserverScroll((prev) => ({
        direction: Number(progress.toFixed(0)) >= prev.scrollY ? "down" : "up",
        scrollY:
          Number.isNaN(Number(progress.toFixed(0))) ||
          Number(progress.toFixed(0)) <= 0
            ? 0
            : Number(progress.toFixed(0)),
        offset,
        circumference,
      }));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      {observerScroll.scrollY !== 0 && (
        <MotionNavigationMenuItem
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative isolate  cursor-pointer   text-foreground"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="relative  z-10 border  flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-background">
            {observerScroll.scrollY === 100 ? (
              <ArrowUp size={18} />
            ) : (
              <CircleProgress
                ref={circleRef}
                circumference={observerScroll.circumference}
                offset={observerScroll.offset}
                scrollY={observerScroll.scrollY}
              />
            )}
          </span>
        </MotionNavigationMenuItem>
      )}
    </>
  );
}
