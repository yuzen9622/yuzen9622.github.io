import { motion } from "framer-motion";

import ShinyText from "@/components/gsap/text/ShinyText";

import { useProfile } from "@/shared/hook/useProfile";

export default function Header() {
  const { profile } = useProfile();

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
        className="text-secondary-foreground font-bold text-center relative w-fit max-lg:mx-auto lg:mx-0 before:content-[''] before:absolute before:-left-3 before:top-[0.75em] before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-primary/70 after:content-[''] after:absolute after:-right-3 after:top-[0.75em] after:h-1.5 after:w-1.5 after:-translate-y-1/2 after:rounded-full after:bg-primary/70"
        variants={item}
      >
        Below are details of my experience, honours and strengths.
      </motion.p>
    </motion.section>
  );
}
