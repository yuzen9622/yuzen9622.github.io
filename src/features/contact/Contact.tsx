import { useProfile } from "@/shared/hook/useProfile";
import { cn } from "@/shared/lib/utils";
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
export default function Contact() {
  const { socialLink, profile } = useProfile();
  const contactScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: contactScrollRef,
    offset: ["start end", "end start"],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.25,
  });
  const opacity = useTransform(smoothScrollYProgress, [0, 0.5], [0, 1]);

  const headlineLines = [
    { text: "Let’s Build the Future", accent: false },
    { text: "Together.", accent: true },
    { text: "Code. Create. Collaborate.", accent: false },
  ] as const;

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: "0.75em", rotateX: 35 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.02 * i + 0.15,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  } as const;

  let letterCounter = 0;
  return (
    <motion.div
      id="contact"
      ref={contactScrollRef}
      className="relative  w-11/12 bg-background py-20  pt-48"
      style={{ opacity }}
    >
      <div
        className={cn(
          "  pointer-events-none absolute w-100 -right-30 -bottom-10  h-100  rounded-full blur-3xl opacity-50 dark:opacity-30 bg-[radial-gradient(circle,var(--primary)_0%,transparent_100%)] "
        )}
      />
      <div
        className={cn(
          "  pointer-events-none absolute w-100 -left-30 -top-10  h-100  rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle,var(--primary)_0%,transparent_100%)] "
        )}
      />
      <motion.h1
        className="lg:text-left text-center text-4xl mb-10  md:text-6xl inter lg:text-8xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {headlineLines.map((line, lineIndex) => (
          <span
            key={`${line.text}-${lineIndex}`}
            className={cn("block", line.accent && "text-primary")}
          >
            {Array.from(line.text).map((character, charIndex) => {
              const currentIndex = letterCounter;
              letterCounter += 1;
              return (
                <motion.span
                  key={`${line.text}-${charIndex}`}
                  custom={currentIndex}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {character === " " ? "\u00A0" : character}
                </motion.span>
              );
            })}
          </span>
        ))}
      </motion.h1>
      <div className="grid md:grid-cols-2 justify-items-center gap-6 lg:w-8/12  ">
        <div className=" lg:text-xl text-base text-center space-y-3 flex-wrap">
          <h2 className=" text-primary bbh-sans-bartle-regular">[Contact]</h2>
          <a className=" inter" href={`tel:${profile.phone}`}>
            {profile.phone}
          </a>
        </div>
        <div className=" lg:text-xl text-base text-center space-y-3">
          <h2 className=" text-primary bbh-sans-bartle-regular">[Email]</h2>
          <a className=" inter" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
        <div className=" lg:text-xl text-base text-center space-y-3">
          <h2 className=" text-primary bbh-sans-bartle-regular">[Position]</h2>
          <p className=" inter">{profile.country}</p>
        </div>
        <div className=" lg:text-xl text-base text-center space-y-3 ">
          <h2 className=" text-primary bbh-sans-bartle-regular">[Social]</h2>
          <div className="flex gap-2 w-full items-center justify-center">
            {socialLink.map((social) => (
              <a
                href={social.link}
                rel="noopener noreferrer"
                target="_BLANK"
                className=" group inter"
              >
                <div className=" p-2 bg-secondary rounded-3xl group-hover:scale-110 transition-all">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
