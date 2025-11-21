import { motion } from "framer-motion";

import MaskText from "./ui/MaskHero";

export default function AboutHeader() {
  return (
    <div className="min-h-dvh   relative flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="h-full flex-1 flex   justify-center"
      >
        <MaskText />
      </motion.div>
    </div>
  );
}
