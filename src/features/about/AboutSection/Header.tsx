import { motion } from "framer-motion";

import ShinyText from "@/components/gsap/text/ShinyText";
import { Badge } from "@/components/ui/badge";

import { useProfile } from "@/shared/hook/useProfile";

export default function Header() {
  const { profile } = useProfile();
  const MotionBadge = motion.create(Badge);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    transition: { duration: 0.45, ease: "easeOut" },
  };

  return (
    <motion.section
      className="justify-center items-center gap-3 flex-col flex w-full"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <MotionBadge
        variant={"secondary"}
        className="text-base font-bold px-3 py-2 rounded-3xl shadow-2xl shadow-secondary-foreground"
        initial={item.hidden}
        animate={item.visible}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        Problem Solver
      </MotionBadge>
      <motion.span
        className="flex items-center gap-3 max-md:flex-col"
        variants={item}
      >
        <motion.h1 className="text-6xl text-shadow-lg dark:text-shadow-secondary">
          {profile.name}
        </motion.h1>
        <motion.div>
          <ShinyText
            text="Developer"
            disabled={false}
            speed={3}
            className="text-6xl"
          />
        </motion.div>
      </motion.span>
      <motion.p
        className="text-secondary-foreground font-bold text-center"
        variants={item}
      >
        Below are details of my experience, honours and strengths.
      </motion.p>
    </motion.section>
  );
}
