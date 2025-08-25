import type { Card } from "@/types/type";

export default function ExperienceCard({ title, description }: Card) {
  return (
    <div className=" flex flex-col  flex-1 items-center justify-between  gap-10">
      <h1 className="text-5xl font-bold text-primary/80">{title}</h1>
      <p className=" text-sm text-secondary-foreground/70 text-center">
        {description}
      </p>
    </div>
  );
}
