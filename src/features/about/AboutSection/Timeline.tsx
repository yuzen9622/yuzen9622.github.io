import { useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { useProfile } from "@/shared/hook/useProfile";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Timeline() {
  const { education } = useProfile();

  // 以 Timeline 容器作為 scroll 進度的 target
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.25,
  });

  const progress = useTransform(smoothScrollYProgress, [0, 0.9], [0, 1]);

  // 仿照 MaskHero：父層淡入 + staggerChildren
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // 子項目：往上 + 淡入（spring）
  const itemVariants: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 320, damping: 26 },
    },
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex items-center justify-center"
    >
      <div className="relative md:w-10/12 px-4">
        <div className="pointer-events-none absolute left-3 top-0 bottom-0 w-px bg-border/60" />
        <motion.div
          className="pointer-events-none absolute left-3 top-0 bottom-0 w-1 rounded-full origin-top bg-primary"
          style={{ scaleY: progress }}
        />

        <motion.ol
          className="relative pl-6 mb-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {education.map(
            (
              {
                institution,
                startYear,
                endYear,
                isCurrent,
                major,
                educationSystem,
                description,
              },
              index
            ) => {
              const isOngoing = isCurrent ?? false;
              const range = `${startYear} — ${endYear}`;

              return (
                <motion.li
                  key={`${institution}-${startYear}-${index}`}
                  className={cn("relative pb-10 last:pb-0 space-y-2")}
                  variants={itemVariants}
                >
                  <div className=" flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono">{range}</span>
                    {educationSystem ? (
                      <Badge variant={isOngoing ? "default" : "outline"}>
                        {educationSystem}
                      </Badge>
                    ) : null}
                  </div>

                  <Card className="hover:shadow-lg bg-transparent gap-2 border hover:border-primary duration-500 transition-all shadow-none">
                    <CardHeader>
                      <CardTitle>
                        <h4 className="text-lg  text-foreground">
                          {institution}
                        </h4>
                        {major ? (
                          <CardDescription className="font-extralight">
                            {major}
                          </CardDescription>
                        ) : null}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {description && (
                        <p className="text-sm font-light">{description}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.li>
              );
            }
          )}
        </motion.ol>
      </div>
    </div>
  );
}
