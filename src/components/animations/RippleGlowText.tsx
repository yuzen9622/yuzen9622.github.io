import { cn } from "@/shared/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import type React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** 控制是否播放暈開動畫（建議搭配 inView/hover） */
  active?: boolean;
};

export default function RippleGlowText({
  children,
  className,
  active = true,
}: Props) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = active && !reducedMotion;

  return (
    <span className={cn("relative inline-block", className)}>
      <motion.span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 -z-10",
          "h-[10em] w-[10em] -translate-x-1/2 -translate-y-1/2 rounded-full",
          "blur-2xl"
        )}
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.15 }}
        animate={
          shouldAnimate
            ? { opacity: [0, 0.35, 0], scale: [0.15, 1.05, 1.35] }
            : { opacity: 0, scale: 0.15 }
        }
        transition={{
          duration: 1.8,
          ease: "easeOut",
          repeat: shouldAnimate ? Infinity : 0,
          repeatDelay: 0.35,
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
