import { cn } from "@/shared/lib/utils";
import type { TocItem } from "../types/blog";

type Props = {
  items: TocItem[];
  activeId: string | null;
  onNavigate: (id: string) => void;
  title: string;
  className?: string;
};

export default function TableOfContents({
  items,
  activeId,
  onNavigate,
  className,
  title,
}: Props) {
  if (items.length === 0) return null;

  return (
    <aside
      className={cn("hidden md:block", className)}
      aria-label="Table of contents"
    >
      <div className="sticky top-24">
        <div className="text-xs font-semibold tracking-wide text-muted-foreground">
          <span className="text-primary text-base">{title}</span>
        </div>
        <nav className="mt-3 border-l pl-3">
          <ul className="space-y-1">
            <li></li>
            {items.map((item) => {
              const isActive = item.id === activeId;
              const indent =
                item.level === 1
                  ? "pl-0"
                  : item.level === 2
                  ? "pl-2"
                  : item.level === 3
                  ? "pl-4"
                  : item.level === 4
                  ? "pl-6"
                  : "pl-8";

              return (
                <li key={item.id} className={indent}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "w-full text-left text-sm leading-6 transition-colors",
                      isActive
                        ? " font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <span className="line-clamp-2">{item.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
