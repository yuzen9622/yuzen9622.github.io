import { useEffect, useState, type RefObject } from "react";

export const useMousePosition = (ref: RefObject<HTMLElement | null>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const getPosition = (e: MouseEvent) => {
      if (!ref?.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    window.addEventListener("mousemove", getPosition);
    return () => {
      window.removeEventListener("mousemove", getPosition);
    };
  });
  return position;
};
