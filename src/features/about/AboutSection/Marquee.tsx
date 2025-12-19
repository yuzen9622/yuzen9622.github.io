import { motion } from "framer-motion";

export default function Marquee() {
  const techField = [
    "Frontend Development",
    "*",
    "Backend Architecture",
    "*",
    "Database Design",
    "*",
    "UI/UX Design",
    "*",
  ];
  return (
    <div className="min-w-0 group   cursor-default  py-4  overflow-hidden flex gap-4 bbh-sans-bartle-regular">
      <motion.div
        animate={{ x: ["0%", "calc(-100% - 16px)"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 py-2      group-hover:[&>*]:rotate-0! after:absolute after:inset-0 after:w-10 after:h-full     justify-around flex-shrink-0"
      >
        {techField.map((field, index) => {
          if (field === "*") {
            return (
              <span
                key={`sep-${index}`}
                className="text-2xl opacity-50 transition-all"
              >
                {field}
              </span>
            );
          }

          // 計算是第幾個文字項目（不含*）
          const textIndex = techField
            .slice(0, index)
            .filter((item) => item !== "*").length;
          const rotateClass = textIndex % 2 === 0 ? "rotate-3" : "-rotate-3";

          return (
            <p
              key={`${field}-${index}`}
              className={`text-2xl ${rotateClass} group-hover:rotate-0 transition-all`}
            >
              {field}
            </p>
          );
        })}
      </motion.div>
      <motion.div
        animate={{ x: ["0%", "calc(-100% - 16px)"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 py-2    group-hover:[&>*]:rotate-0!  justify-around flex-shrink-0"
      >
        {techField.map((field, index) => {
          // 只對非*項目應用旋轉效果
          if (field === "*") {
            return (
              <span
                key={`sep-${index}`}
                className="text-2xl opacity-50 transition-all"
              >
                {field}
              </span>
            );
          }

          // 計算是第幾個文字項目（不含*）
          const textIndex = techField
            .slice(0, index)
            .filter((item) => item !== "*").length;
          const rotateClass = textIndex % 2 === 0 ? "rotate-3" : "-rotate-3";

          return (
            <p
              key={`${field}-${index}`}
              className={`text-2xl ${rotateClass} group-hover:rotate-0 transition-all`}
            >
              {field}
            </p>
          );
        })}
      </motion.div>
    </div>
  );
}
