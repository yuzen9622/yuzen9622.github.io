"use client";
import { ArrowUp, Languages, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/hook/useTheme";

import { NavigationMenuItem } from "../../ui/navigation-menu";
import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

export default function Tool() {
  const { setTheme, theme, systemTheme } = useTheme();
  const { i18n } = useTranslation();
  const isDark =
    (theme === "system" && systemTheme === "dark") || theme === "dark";

  const MotionNavigationMenuItem = useMemo(
    () => motion.create(NavigationMenuItem),
    []
  );

  const [observerScroll, setObserverScroll] = useState<{
    direction: "up" | "down";
    scrollY: number;
  }>({
    direction: "down",
    scrollY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const progress = (scrollY / totalHeight) * 100;
      setObserverScroll((prev) => ({
        direction: Number(progress.toFixed(0)) >= prev.scrollY ? "down" : "up",
        scrollY: Number(progress.toFixed(0)),
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
      <NavigationMenuItem
        className=" p-2 cursor-pointer hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary"
        onClick={() => {
          i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
        }}
      >
        <Languages size={18} />
      </NavigationMenuItem>
      {observerScroll.scrollY !== 0 && (
        <MotionNavigationMenuItem
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative isolate p-1 cursor-pointer   text-foreground"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="   pointer-events-none absolute inset-0 rounded-full "
            style={{
              background: `conic-gradient(var(--primary) ${observerScroll.scrollY}%, transparent ${observerScroll.scrollY}%)`,
            }}
          />
          <span className="relative  z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background text-primary transition-colors hover:bg-primary hover:text-background">
            {observerScroll.scrollY === 100 ? (
              <ArrowUp size={18} />
            ) : (
              <span className="text-xs ">{observerScroll.scrollY}</span>
            )}
          </span>
        </MotionNavigationMenuItem>
      )}
    </>
  );
}
