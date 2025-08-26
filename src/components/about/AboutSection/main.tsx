import { motion } from "framer-motion";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import ExperienceCard from "../ui/ExperienceCard";

export default function Main() {
  const { t } = useTranslation("about");
  const cards = t("myCard", { returnObjects: true });
  const BadgeMotion = motion.create(Badge);
  const techField = useMemo(() => {
    return ["Frontend", "Backend", "SQL Design", "UI Design", "AI/ML"];
  }, []);
  return (
    <div className="flex-1">
      <motion.p
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        className=" w-11/12 mx-auto  max-lg:text-center font-bold text-secondary-foreground/70   leading-6 tracking-wide  indent-8 whitespace-pre-wrap"
      >
        {t("mySelf.content")}
      </motion.p>
      <Separator className="my-4 shadow-3xl shadow-background" />
      <div className="space-x-2 space-y-2 flex  items-center justify-around flex-wrap">
        {techField.map((field, index) => (
          <BadgeMotion
            key={field}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
            className="p-2 text-bold text-lg    text-secondary-foreground/70 shadow-xl/20 shadow-accent-foreground"
            variant={"outline"}
          >
            {field}
          </BadgeMotion>
        ))}
      </div>
      <Separator className="my-4 shadow-3xl shadow-background" />
      <div className="flex items-center  justify-around">
        {cards.map((card, index) => (
          <Fragment key={index}>
            <ExperienceCard title={card.title} description={card.description} />
            {index !== cards.length - 1 && (
              <Separator className="h-20! mx-4" orientation="vertical" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
