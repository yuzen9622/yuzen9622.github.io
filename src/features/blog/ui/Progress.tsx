import { CircleProgress } from "@/components/layouts/Navbar/CircleProgress";
import { useEffect, useRef, useState } from "react";

type ProgressProps = {
  root: HTMLDivElement | null;
};
export default function Progress({ root }: ProgressProps) {
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
    const el = root;
    if (!el) return;

    const handleScroll = () => {
      const totalHeight = el.scrollHeight - el.clientHeight;
      const scrollY = el.scrollTop;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;

      const r = circleRef.current?.getAttribute("r") ?? 45;
      const circumference = 2 * Math.PI * Number(r);
      const offset = circumference * (1 - progress / 100);

      const roundedProgress = Number(progress.toFixed(0));

      setObserverScroll((prev) => ({
        direction: roundedProgress >= prev.scrollY ? "down" : "up",
        scrollY:
          Number.isNaN(roundedProgress) || roundedProgress <= 0
            ? 0
            : roundedProgress,
        offset,
        circumference,
      }));
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [root]);

  return (
    <button
      type="button"
      className="fixed right-1/12 bottom-4 z-20 w-8 h-8 backdrop-blur-md bg-background/50 border rounded-full"
      onClick={() => root?.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <CircleProgress
        ref={circleRef}
        className="rounded-full hover:fill-primary "
        circumference={observerScroll.circumference}
        offset={observerScroll.offset}
        scrollY={observerScroll.scrollY}
      />
    </button>
  );
}
