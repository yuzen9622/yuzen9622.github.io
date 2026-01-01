import { motion } from "framer-motion";

import ShinyText from "@/components/gsap/text/ShinyText";

export default function Header() {
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
      className="justify-center items-center gap-3 inter flex-col flex w-full py-5"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.span
        className={
          " text-secondary-foreground font-bold text-center text-2xl relative  w-fit max-lg:mx-auto lg:mx-0 before:content-['\"'] before:absolute before:-left-3 before:top-[0.75em] before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-primary/70 after:content-[''] after:absolute after:-right-3 after:top-[0.75em] after:h-1.5 after:w-1.5 after:-translate-y-1/2 after:rounded-full after:bg-primary/70"
        }
        variants={item}
      >
        <ShinyText text={"Experience, Honours and Strengths."} />
      </motion.span>
    </motion.section>
  );
}
