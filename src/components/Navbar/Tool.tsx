import { Languages, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/hook/useTheme";

import { NavigationMenuItem } from "../ui/navigation-menu";

export default function Tool() {
  const { setTheme, theme, systemTheme } = useTheme();
  const { i18n } = useTranslation();
  const isDark =
    (theme === "system" && systemTheme === "dark") || theme === "dark";
  return (
    <>
      <NavigationMenuItem
        className=" p-2 hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary"
        onClick={() => {
          setTheme(isDark ? "light" : "dark");
        }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </NavigationMenuItem>
      <NavigationMenuItem
        className=" p-2 hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary"
        onClick={() => {
          i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
        }}
      >
        <Languages size={18} />
      </NavigationMenuItem>
    </>
  );
}
