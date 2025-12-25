import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { useRef } from "react";

export default function Main() {
  const { t } = useTranslation("profile");
  const ref = useRef(null);
  const description = t("profile.description") as string;
  const lines = description.split("\n");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 50%"], // 元素進出視窗的區間
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.25,
  });

  // 顏色從灰到黑
  const backgroundPosition = useTransform(
    smoothScrollYProgress,
    [0, 1],
    ["0%", "-100%"]
  );

  const lineContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const lineItem: Variants = {
    hidden: { y: 10, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="lg:w-10/12 flex flex-col">
      <motion.div
        ref={ref}
        variants={lineContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-11/12 max-w-2xl mx-auto min-w-0 text-center font-bold text-primary leading-6 tracking-wide"
      >
        {lines.map((line, index) => {
          if (line.trim() === "") {
            return <span key={`spacer-${index}`} className="block h-4" />;
          }

          return (
            <motion.span
              key={`line-${index}`}
              variants={lineItem}
              style={{
                backgroundSize: "200% 100%",
                backgroundPosition,
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              className={
                "block min-w-0   bg-secondary-foreground whitespace-pre-wrap"
              }
            >
              {line}
            </motion.span>
          );
        })}
      </motion.div>
      <Separator className="my-6 md:my-10" />
    </div>
  );
}
