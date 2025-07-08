import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { SquareArrowOutUpRight } from "lucide-react";
import type { JSX } from "react";

type ContentProps = {
  title: string;
  icon: JSX.Element;
  href: string;
  desc?: string;
};

export default function ContactCard({ title, icon, desc, href }: ContentProps) {
  return (
    <Card className="hover:bg-secondary">
      <CardContent>
        <a
          href={href}
          target="_BLANK"
          className=" group flex items-center justify-between gap-3 "
        >
          <div className=" flex items-center gap-3">
            <div className=" p-2 bg-secondary rounded-3xl group-hover:scale-110 transition-all">
              {icon}
            </div>
            <span>
              <h1 className="text-xl font-bold">{title}</h1>
              <CardDescription>{desc}</CardDescription>
            </span>
          </div>

          <SquareArrowOutUpRight className=" translate-x-3 transition-all  group-hover:opacity-100 opacity-0 group-hover:translate-0" />
        </a>
      </CardContent>
    </Card>
  );
}
