import { motion } from "framer-motion";
import Header from "./header";
import Journey from "./journey";
import Main from "./main";

export default function AboutSection() {
  const techField = [
    "Frontend Development",
    "Backend Architecture",
    "Database Design",
    "UI/UX Design",
  ];

  return (
    <section className=" w-full overflow-hidden min-h-dvh bg-background flex  items-center flex-col   pt-5 relative">
      <Header />
      <div className="flex w-full  max-lg:flex-col justify-around  gap-5">
        <Main />
        <Journey />
      </div>
      <div className="min-w-0  py-4  overflow-hidden flex gap-4 bbh-sans-bartle-regular">
        <motion.div
          animate={{ x: ["0%", "calc(-100% - 16px)"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 py-2 [&>*:nth-child(odd)]:rotate-3   [&>*:nth-child(even)]:-rotate-3 [&>*:hover]:rotate-0! after:absolute after:inset-0 after:w-10 after:h-full     justify-around flex-shrink-0"
        >
          {techField.map((field, index) => (
            <p className="text-2xl transition-all" key={`${field}-${index}`}>
              {field}
            </p>
          ))}
        </motion.div>
        <motion.div
          animate={{ x: ["0%", "calc(-100% - 16px)"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 py-2 [&>*:nth-child(odd)]:rotate-3 [&>*:hover]:rotate-0!  [&>*:nth-child(even)]:-rotate-3  justify-around flex-shrink-0"
        >
          {techField.map((field, index) => (
            <p className="text-2xl transition-all" key={`${field}-${index}`}>
              {field}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
