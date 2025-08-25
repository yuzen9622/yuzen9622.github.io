import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import ShinyText from "@/components/gsap/text/ShinyText";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const { t } = useTranslation("about");
  const MotionBadge = motion.create(Badge);

  return (
    <section className=" justify-center items-center gap-3 flex-col flex w-full  ">
      <MotionBadge
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        variant={"secondary"}
        className=" text-base  font-bold px-3 py-2 rounded-3xl shadow-2xl shadow-secondary-foreground "
      >
        Problem Solver
      </MotionBadge>
      <span className="flex items-center gap-3  max-md:flex-col">
        <motion.h1
          viewport={{ once: true }}
          initial={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
          whileInView={{ x: 0, opacity: 1 }}
          className=" text-6xl   text-shadow-lg dark:text-shadow-secondary"
        >
          {t("mySelf.name")}
        </motion.h1>
        <motion.div
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <ShinyText
            text="Developer"
            disabled={false}
            speed={3}
            className="text-6xl"
          />
        </motion.div>
      </span>
      <motion.p
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.5 }}
        viewport={{ once: true }}
        className=" text-secondary-foreground font-bold text-center"
      >
        Below are details of my experience, honours and strengths.
      </motion.p>
    </section>
  );
}
