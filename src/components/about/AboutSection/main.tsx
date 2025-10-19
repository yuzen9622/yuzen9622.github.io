import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";

export default function Main() {
  const { t } = useTranslation("about");

  return (
    <div className=" lg:w-6/12 ">
      <motion.p
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        className=" w-11/12 mx-auto min-w-0   max-lg:text-center font-bold text-secondary-foreground/70   leading-6 tracking-wide  indent-8 whitespace-pre-wrap"
      >
        {t("mySelf.content")}
      </motion.p>
      <Separator className="my-4 shadow-3xl shadow-background" />
    </div>
  );
}
