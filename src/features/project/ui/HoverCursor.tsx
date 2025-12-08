import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useMousePosition } from "@/shared/hook/useMousePosition";

import type { RefObject } from "react";
export default function HoverCursor({
  title,
  divRef,
}: {
  title: string;
  divRef: RefObject<HTMLElement | null>;
}) {
  const { x, y } = useMousePosition(divRef);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!divRef.current) return;
    const handleIn = () => {
      setIsHover(true);
    };
    const handleOut = () => {
      setIsHover(false);
    };

    divRef.current.addEventListener("mouseenter", handleIn);
    divRef.current.addEventListener("mouseleave", handleOut);
  }, [divRef]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        x,
        y,
        opacity: isHover ? 1 : 0,
        scale: isHover ? 1 : 0,
        display: isHover ? "block" : "none",
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      className=" absolute text-xs  z-20  p-1 bg-secondary rounded-md text-primary-foreground"
    >
      {title}
    </motion.div>
  );
}
