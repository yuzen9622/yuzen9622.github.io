import { cn } from "@/lib/utils";
import type { Skill } from "@/types/type";
import { motion } from "framer-motion";
export default function SkillMarquee({
  skills,
  direction = "right",
}: {
  skills: Skill[];
  direction?: "left" | "right";
}) {
  return (
    <div className="min-w-0 group flex-1   cursor-default   overflow-hidden flex gap-4 bbh-sans-bartle-regular">
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
            <div
              key={`${skill.name}-${index}`}
              className={cn(
                `text-2xl  h-full border border-accent-foreground p-4 rounded-2xl flex items-center justify-center  transition-all`,
                skill.gridClass
              )}
            >
              {skill.icon}
            </div>
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
            <div
              key={`${skill.name}-${index}`}
              className={cn(
                `text-2xl  border border-accent-foreground  h-full p-4 rounded-2xl flex items-center justify-center  transition-all`,
                skill.gridClass
              )}
            >
              {skill.icon}
            </div>
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
            <div
              key={`${skill.name}-${index}`}
              className={cn(
                `text-2xl  h-full border border-accent-foreground  p-4 rounded-2xl flex items-center justify-center  transition-all`,
                skill.gridClass
              )}
            >
              {skill.icon}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
