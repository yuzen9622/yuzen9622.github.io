import { motion, useScroll, useTransform } from "framer-motion";

import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { useRef } from "react";
import SkillGrid from "@/features/about/AboutSection/SkillGrid";

export default function Main() {
  const { t } = useTranslation("about");
  const ref = useRef(null);
  // 追蹤元素滾動進度
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 50%"], // 元素進出視窗的區間
  });

  // 顏色從灰到黑
  const backgroundPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-100%"]
  );

  return (
    <div className=" lg:w-6/12 flex flex-col ">
      <motion.p
        ref={ref}
        style={{
          backgroundSize: "200% 100%",
          backgroundPosition,
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        className=" w-11/12 mx-auto min-w-0 bg-linear-to-r from-secondary-foreground/70 to-primary max-lg:text-center font-bold text-secondary-foreground/70   leading-6 tracking-wide  indent-8 whitespace-pre-wrap"
      >
        {t("mySelf.content")}
      </motion.p>
      <Separator className="my-4 shadow-3xl shadow-background" />
      <SkillGrid />
    </div>
  );
}
