import { useEffect, useState } from "react";

import type { RefObject } from "react";
export const useMousePosition = (ref: RefObject<HTMLElement | null>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const getPosition = (e: MouseEvent) => {
      if (!ref?.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left - 20,
        y: e.clientY - rect.top - 25,
      });
    };
    window.addEventListener("mousemove", getPosition);
    return () => {
      window.removeEventListener("mousemove", getPosition);
    };
  });
  return position;
};
