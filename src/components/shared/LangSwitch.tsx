import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Languages size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={14}
        className="  backdrop-blur-md bg-background/50 space-y-2 w-fit"
      >
        <DropdownMenuItem
          className={cn(
            i18n.language === "en" && "bg-primary  text-primary-foreground"
          )}
          onClick={() => changeLanguage("en")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            i18n.language === "zh-Hans" && "bg-primary  text-primary-foreground"
          )}
          onClick={() => changeLanguage("zh-Hans")}
        >
          中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
