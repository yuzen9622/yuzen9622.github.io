import React from "react";

import { useTheme } from "@/hook/useTheme";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;
  const { theme, systemTheme } = useTheme();
  const isDark =
    (theme === "system" && systemTheme === "dark") || theme === "dark";
  return (
    // <div
    //   className={` bg-clip-text inline-block ${
    //     disabled ? "" : "animate-shine"
    //   } ${className}`}
    //   style={{
    //     backgroundImage:
    //       "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
    //     backgroundSize: "200% 100%",
    //     WebkitBackgroundClip: "text",
    //     animationDuration: animationDuration,
    //   }}
    // >
    <div
      className={` bg-clip-text inline-block ${
        disabled ? "" : "animate-shine"
      } ${className} ${isDark ? "text-[#b5b5b5a4]" : "text-[#333333a4]"}`}
      style={{
        backgroundImage: isDark
          ? "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 60%)"
          : "linear-gradient(120deg, rgba(0, 0, 0, 0) 40%, rgba(0,0,0, 1) 50%, rgba(0, 0, 0, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
