import { NavigationMenuItem } from "../ui/navigation-menu";
import { useTheme } from "@/hook/useTheme";
import { Languages, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Tool() {
  const { setTheme, theme, systemTheme } = useTheme();
  const { i18n } = useTranslation();
  const isDark =
    (theme === "system" && systemTheme === "dark") || theme === "dark";
  return (
    <>
      <NavigationMenuItem
        className=" p-2"
        onClick={() => {
          setTheme(isDark ? "light" : "dark");
        }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </NavigationMenuItem>{" "}
      <NavigationMenuItem
        className=" p-2"
        onClick={() => {
          i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
        }}
      >
        <Languages size={18} />
      </NavigationMenuItem>
    </>
  );
}
