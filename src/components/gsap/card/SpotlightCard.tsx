import { motion, useReducedMotion } from "framer-motion";
import React, { useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
  /** follow: 跟著滑鼠的聚光；ripple: 進場時圈圈暈開 */
  mode?: "follow" | "ripple";
  /** ripple 時暈開起點 */
  rippleOrigin?: "mouse" | "center";
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "hsl(var(--primary))",
  mode = "follow",
  rippleOrigin = "mouse",
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);
  const [rippleKey, setRippleKey] = useState<number>(0);

  const setPosFromEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();

    if (rippleOrigin === "center") {
      setPosition({ x: rect.width / 2, y: rect.height / 2 });
      return;
    }

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused || mode === "ripple") return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsActive(true);
    if (mode === "follow") setOpacity(0.6);
    if (mode === "ripple") setRippleKey((k) => k + 1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsActive(false);
    setOpacity(0);
  };

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsActive(true);

    if (mode === "follow") {
      setOpacity(0.6);
      return;
    }

    setPosFromEvent(e);
    setRippleKey((k) => k + 1);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-border bg-card overflow-hidden p-8 ${className}`}
    >
      {mode === "follow" ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 50%)`,
          }}
        />
      ) : (
        <motion.div
          key={rippleKey}
          aria-hidden
          className="pointer-events-none absolute z-0"
          style={{
            left: position.x,
            top: position.y,
            width: "46rem",
            height: "46rem",
            transform: "translate(-50%, -50%)",
            borderRadius: 9999,
            background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
            filter: "blur(28px)",
          }}
          initial={{ opacity: 0, scale: 0.18 }}
          animate={
            reducedMotion || !isActive
              ? { opacity: 0, scale: 0.18 }
              : { opacity: [0, 0.45, 0], scale: [0.18, 1.02, 1.25] }
          }
          transition={{
            duration: 1.35,
            ease: "easeOut",
            repeat: !reducedMotion && isActive ? Infinity : 0,
            repeatDelay: 0.25,
          }}
        />
      )}
      {children}
    </div>
  );
};

export default SpotlightCard;
