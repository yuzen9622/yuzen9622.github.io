import { useMousePosition } from "@/hook/useMousePostion";
import { motion } from "framer-motion";
import type { RefObject } from "react";

export default function HoverCursor({
  title,
  divRef,
}: {
  title: string;
  divRef: RefObject<HTMLElement | null>;
}) {
  const { x, y } = useMousePosition(divRef);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x, y, opacity: 1 }}
      transition={{ type: "tween", ease: "backOut" }}
      className=" absolute text-xs  z-20  p-1 bg-secondary rounded-md text-primary"
    >
      {title}
    </motion.div>
  );
}
