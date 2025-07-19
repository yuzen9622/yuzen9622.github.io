import { motion } from "framer-motion";
import { type ReactNode } from "react";

export default function InMotionDiv({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className=" w-full flex  justify-center  "
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: delay }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
