import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { supportedLngs } from "@/i18n";

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    const segments = location.pathname.split("/").filter(Boolean);
    const nextSegments = [...segments];

    if (nextSegments.length === 0) {
      nextSegments.push(lng);
    } else if (supportedLngs.includes(nextSegments[0])) {
      nextSegments[0] = lng;
    } else {
      nextSegments.unshift(lng);
    }

    navigate(
      {
        pathname: `/${nextSegments.join("/")}`,
        search: location.search,
        hash: location.hash,
      },
      { replace: true }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2  cursor-pointer hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary">
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
          onSelect={() => void changeLanguage("en")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            i18n.language === "zh-Hans" && "bg-primary  text-primary-foreground"
          )}
          onSelect={() => void changeLanguage("zh-Hans")}
        >
          繁體中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
