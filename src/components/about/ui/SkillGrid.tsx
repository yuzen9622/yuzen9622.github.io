import type { Skill } from "@/types/type";
import { motion } from "framer-motion";

import AnimationProgress from "./AnimationProgress";

export default function SkillGrid({ groupSkill }: { groupSkill: Skill[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2  ">
      {groupSkill.map((skill, index) => (
        <motion.div
          key={skill.title}
          initial={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: index / 20, duration: 0.3 }}
        >
          <AnimationProgress skill={skill} delay={index * 100} />
        </motion.div>
      ))}
    </div>
  );
}
