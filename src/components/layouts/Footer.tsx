"use client";
import { AtSign, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { useProfile } from "@/hook/useProfile";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  const { navigation, mySelf } = useProfile();
  const { t } = useTranslation("contact");
  const socialLink = t("socialLink", { returnObjects: true });
  const iconMap = {
    Instagram: <FaInstagram size={18} />,
    GitHub: <FaGithub size={18} />,
    LinkedIn: <FaLinkedin size={18} />,
  };
  return (
    <footer className="w-full min-h-60 mt-5 dark:bg-none dark:border-t-2 backdrop-blur-xs bg-background flex flex-col items-center  justify-between gap-10  p-5">
      <section className="flex gap-3 lg:flex-row flex-col">
        <div className="flex-1 text-center flex flex-col gap-3">
          <span className="flex items-center gap-3 space-y-1 justify-center">
            <Avatar className="  w-12   h-12 aspect-square">
              <AvatarImage
                className=" rounded-full aspect-square "
                width={48}
                height={48}
                alt={mySelf.name}
                src={mySelf.avatar}
              />
              <AvatarFallback className=" text-2xl">
                {mySelf.name}
              </AvatarFallback>
            </Avatar>
            <h1 className=" text-secondary-foreground text-2xl font-extrabold">
              {mySelf.name}
            </h1>
          </span>
          <span className="text-wrap text-primary font-bold">
            {mySelf.description}
          </span>
          <div className="space-x-2 flex  justify-center">
            {socialLink.map((link) => (
              <NavLink
                key={link.title}
                to={link.link}
                aria-label={link.title}
                target="_BLANK"
                className=" z-10 hover:text-background relative group outline p-3 rounded-full"
              >
                <span className=" "> {iconMap[link.title]}</span>
                <div className=" absolute transition-all -z-10 inset-0 w-full h-full rounded-3xl bg-primary scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100"></div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex-1  space-y-1 text-center">
          <h1 className="text-xl font-extrabold">Quick Links</h1>
          <ul className=" space-y-1">
            {navigation.map((item, index) => (
              <li key={index}>
                <NavLink
                  className={
                    "   hover:font-bold hover:translate-x-2 transition-all"
                  }
                  to={item.route}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1  gap-2 flex flex-col items-center">
          <h1 className=" text-xl font-extrabold ">Stay Contact</h1>
          <Badge asChild variant={"outline"}>
            <a
              target="_BLANK"
              href="https://www.google.com/maps/place/%E6%96%B0%E7%AB%B9%E7%B8%A3"
            >
              <MapPin absoluteStrokeWidth size={20} />
              <p className=" font-bold text-[16px]"> {mySelf.country}</p>
            </a>
          </Badge>
          <Badge variant={"outline"} asChild>
            <a href={`mailto:${mySelf.email}`}>
              <AtSign absoluteStrokeWidth size={20} />
              <p className=" font-bold text-[16px]"> {mySelf.email}</p>
            </a>
          </Badge>
        </div>
      </section>
      <section>
        <span className=" text-xs text-accent-foreground font-bold    bg-secondary px-3 py-2 rounded-3xl">
          Copyright © 2025 {mySelf.nickName}
        </span>
      </section>
    </footer>
  );
}
