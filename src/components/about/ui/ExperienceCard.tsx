import type { Card } from "@/types/type";

export default function ExperienceCard({ title, description }: Card) {
  return (
    <div className=" flex flex-col   self-stretch  items-center justify-between gap-10">
      <h1 className="text-5xl flex-1 font-bold text-primary/80">{title}</h1>
      <p className=" text-sm text-secondary-foreground/70 text-center text-wrap">
        {description}
      </p>
    </div>
  );
}
