import { motion } from "framer-motion";

import MaskHero from "./ui/MaskHero";
import Squares from "@/components/gsap/background/square";

export default function AboutHero() {
  return (
    <div className="min-h-dvh relative flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="h-full flex-1 flex   justify-center"
      >
        <div className="  absolute inset-0 z-0 w-dvw h-dvh   bg-background ">
          <Squares
            speed={0.0}
            squareSize={100}
            direction="diagonal"
            borderColor="#ffffff "
            hoverFillColor="transparent"
          />
        </div>
        <MaskHero />
      </motion.div>
    </div>
  );
}
