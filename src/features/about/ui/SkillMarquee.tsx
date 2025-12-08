import SpotlightCard from "@/components/gsap/card/SpotlightCard";
import { useTheme } from "@/shared/hook/useTheme";
import { cn } from "@/shared/lib/utils";
import type { Skill } from "@/shared/types/type";
import { motion } from "framer-motion";
export default function SkillMarquee({
  skills,
  direction = "right",
}: {
  skills: Skill[];
  direction?: "left" | "right";
}) {
  const { isDark } = useTheme();
  return (
    <div className="min-w-0 relative group flex-1   cursor-default   overflow-hidden flex  gap-4 bbh-sans-bartle-regular after:content-[''] after:absolute after:w-10 after:h-full after:top-0 after:right-0 after:bg-linear-to-l after:from-background after:to-transparent after:pointer-events-none  before:content-[''] before:absolute before:w-10 before:h-full before:top-0 before:left-0 before:bg-linear-to-r before:from-background before:z-10 before:to-transparent before:pointer-events-none ">
      <motion.div
        animate={
          direction === "right"
            ? { x: ["0%", "calc(-100% - 16px)"] }
            : { x: ["calc(-100% - 16px)", "0%"] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 py-2  w-full     after:absolute after:inset-0 after:w-10 after:h-full     justify-around flex-shrink-0"
      >
        {skills.map((skill, index) => {
          return (
            <SpotlightCard
              spotlightColor={isDark ? "rgba(255, 255, 255, 0.6)" : skill.color}
              key={`${skill.name}-${index}`}
              className={cn(
                `text-2xl  border bg-card! border-accent-foreground  h-full p-4 rounded-2xl flex items-center justify-center  transition-all`,
                skill.gridClass
              )}
            >
              {skill.icon}
            </SpotlightCard>
          );
        })}
      </motion.div>
      <motion.div
        animate={
          direction === "right"
            ? { x: ["0%", "calc(-100% - 16px)"] }
            : { x: ["calc(-100% - 16px)", "0%"] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 py-2     w-full    after:absolute after:inset-0 after:w-10 after:h-full     justify-around flex-shrink-0"
      >
        {skills.map((skill, index) => {
          return (
            <SpotlightCard
              spotlightColor={isDark ? "rgba(255, 255, 255, 0.6)" : skill.color}
              key={`${skill.name}-${index}`}
              className={cn(
                `text-2xl bg-card!  border border-accent-foreground  h-full p-4 rounded-2xl flex items-center justify-center  transition-all`,
                skill.gridClass
              )}
            >
              {skill.icon}
            </SpotlightCard>
          );
        })}
      </motion.div>
      <motion.div
        animate={
          direction === "right"
            ? { x: ["0%", "calc(-100% - 16px)"] }
            : { x: ["calc(-100% - 16px)", "0%"] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 py-2  w-full   after:absolute after:inset-0 after:w-10 after:h-full     justify-around flex-shrink-0"
      >
        {skills.map((skill, index) => {
          return (
            <SpotlightCard
              spotlightColor={isDark ? "rgba(255, 255, 255, 0.6)" : skill.color}
              key={`${skill.name}-${index}`}
              className={cn(
                `text-2xl bg-card!  border border-accent-foreground  h-full p-4 rounded-2xl flex items-center justify-center  transition-all`,
                skill.gridClass
              )}
            >
              {skill.icon}
            </SpotlightCard>
          );
        })}
      </motion.div>
    </div>
  );
}
