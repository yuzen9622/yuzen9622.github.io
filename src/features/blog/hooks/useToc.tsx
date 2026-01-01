import { useCallback, useRef, useState } from "react";
import type { TocItem } from "../types/blog";

type HeadingPosition = {
  id: string;
  top: number;
};

export default function useToc() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const headingPositionsRef = useRef<HeadingPosition[]>([]);
  const activeHeadingIdRef = useRef<string | null>(null);

  const setHeadingId = useCallback((id: string) => {
    activeHeadingIdRef.current = id;
    setActiveHeadingId(id);
  }, []);

  const recalcHeadingPositions = useCallback(
    (root: HTMLDivElement | null, scrollContainer: HTMLElement | null) => {
      if (!root || !scrollContainer) return;

      const containerRect = scrollContainer.getBoundingClientRect();
      const headings = Array.from(
        root.querySelectorAll<HTMLHeadingElement>("h1,h2,h3")
      );

      headingPositionsRef.current = headings
        .map((h) => {
          const id = h.id;
          if (!id) return null;
          const rect = h.getBoundingClientRect();
          const top = rect.top - containerRect.top + scrollContainer.scrollTop;
          return { id, top };
        })
        .filter((x): x is HeadingPosition => Boolean(x))
        .sort((a, b) => a.top - b.top);
    },
    []
  );

  const buildToc = useCallback(
    (root: HTMLDivElement | null, scrollContainer: HTMLElement | null) => {
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
      setToc(items);
      recalcHeadingPositions(root, scrollContainer);
      setActiveHeadingId((prev) => {
        const next = prev ?? items[0]?.id ?? null;
        activeHeadingIdRef.current = next;
        return next;
      });
    },
    [recalcHeadingPositions]
  );

  const setActiveHeadingByScroll = useCallback(
    (scrollTop: number, offset = 120) => {
      const positions = headingPositionsRef.current;
      if (positions.length === 0) return;

      const targetTop = scrollTop + offset;
      let lo = 0;
      let hi = positions.length - 1;
      let best = 0;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (positions[mid].top <= targetTop) {
          best = mid;
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      }

      const current = positions[best]?.id ?? null;
      if (!current || activeHeadingIdRef.current === current) return;

      activeHeadingIdRef.current = current;
      setActiveHeadingId(current);
    },
    []
  );

  const handleNavigateToHeading = useCallback(
    (id: string, root: HTMLDivElement | null) => {
      const el = root?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      activeHeadingIdRef.current = id;
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
    recalcHeadingPositions,
    setActiveHeadingByScroll,
  };
}
