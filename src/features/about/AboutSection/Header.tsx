import { motion, useScroll, useTransform } from "framer-motion";

import ShinyText from "@/components/gsap/text/ShinyText";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { useProfile } from "@/shared/hook/useProfile";

export default function Header() {
  const { profile } = useProfile();
  const MotionBadge = motion.create(Badge);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "center center"],
  });
  // 根據滾動進度改變位置與透明度
  const xName = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const xDev = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className=" justify-center items-center gap-3 flex-col flex w-full  ">
      <MotionBadge
        style={{ y: yBadge, opacity }}
        variant={"secondary"}
        className=" text-base  font-bold px-3 py-2 rounded-3xl shadow-2xl shadow-secondary-foreground "
      >
        Problem Solver
      </MotionBadge>
      <span className="flex items-center gap-3  max-md:flex-col">
        <motion.h1
          style={{ x: xName, opacity }}
          className=" text-6xl   text-shadow-lg dark:text-shadow-secondary"
        >
          {profile.name}
        </motion.h1>
        <motion.div style={{ x: xDev, opacity }}>
          <ShinyText
            text="Developer"
            disabled={false}
            speed={3}
            className="text-6xl"
          />
        </motion.div>
      </span>
      <motion.p className=" text-secondary-foreground  font-bold text-center">
        Below are details of my experience, honours and strengths.
      </motion.p>
    </section>
  );
}
