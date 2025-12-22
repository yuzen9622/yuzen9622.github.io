import { useCallback, useState } from "react";
import type { TocItem } from "../types/blog";

export default function useToc() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);

  const setHeadingId = useCallback((id: string) => {
    setActiveHeadingId(id);
  }, []);

  const buildToc = useCallback((root: HTMLDivElement | null) => {
    if (!root) return;

    const headings = Array.from(
      root.querySelectorAll<HTMLHeadingElement>("h1,h2,h3")
    );
    const items: TocItem[] = headings
      .map((h) => {
        const level = Number(h.tagName.replace("H", "")) as TocItem["level"];
        const id = h.id;
        const text = (h.textContent ?? "").trim();
        if (!id || !text) return null;
        return { id, text, level };
      })
      .filter((x): x is TocItem => Boolean(x));
    console.log(items);
    setToc(items);
    setActiveHeadingId((prev) => prev ?? items[0]?.id ?? null);
  }, []);

  const handleNavigateToHeading = useCallback(
    (id: string, root: HTMLDivElement | null) => {
      const el = root?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveHeadingId(id);
    },
    []
  );
  return {
    toc,
    activeHeadingId,
    handleNavigateToHeading,
    buildToc,
    setHeadingId,
  };
}
