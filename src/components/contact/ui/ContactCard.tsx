import { Card, CardContent, CardDescription } from "@/components/ui/card";
import type { SocialLink } from "@/types/type";
import { SquareArrowOutUpRight } from "lucide-react";

export default function ContactCard({ title, icon, desc, link }: SocialLink) {
  return (
    <a
      href={link}
      rel="noopener noreferrer"
      target="_BLANK"
      className=" group  w-full"
    >
      <Card className="hover:bg-secondary ">
        <CardContent className=" flex items-center  justify-between">
          <div className=" flex items-center gap-3 ">
            <div className=" p-2 bg-secondary rounded-3xl group-hover:scale-110 transition-all">
              {icon}
            </div>
            <span>
              <h1 className="lg:text-xl  font-bold">{title}</h1>
              <CardDescription className="max-sm:text-xs">
                {desc}
              </CardDescription>
            </span>
          </div>

          <SquareArrowOutUpRight className=" translate-x-3 transition-all  group-hover:opacity-100 opacity-0 group-hover:translate-0" />
        </CardContent>
      </Card>
    </a>
  );
}
