import { motion } from "framer-motion";
import { type ReactNode } from "react";

export default function InMotionDiv({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className=" w-full flex  justify-center  "
      initial={{ opacity: 1, y: 40 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
