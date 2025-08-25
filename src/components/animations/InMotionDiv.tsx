import { motion } from "framer-motion";

import type { HTMLMotionProps } from "framer-motion";
type InMotionDivProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export default function InMotionDiv({
  children,
  className,
  delay = 0,
  ...props
}: InMotionDivProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: delay }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
