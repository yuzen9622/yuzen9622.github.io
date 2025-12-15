"use client";
import { AtSign, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

import { NavLink } from "react-router-dom";

import { useProfile } from "@/shared/hook/useProfile";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  const { profile, navigation, socialLink } = useProfile();
  const { t } = useTranslation("profile");

  return (
    <footer className="mt-8 w-full border-t border-border/60 bg-secondary/30 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <section className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  className="rounded-full aspect-square"
                  width={48}
                  height={48}
                  alt={profile.name}
                  src={profile.avatar}
                />
                <AvatarFallback className="text-2xl">
                  {profile.name}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h2 className="text-xl font-extrabold leading-tight">
                  {profile.name}
                </h2>
                <span className="text-sm font-semibold text-muted-foreground">
                  {profile.nickName}
                </span>
              </div>
            </div>

            <p className="font-semibold leading-relaxed text-muted-foreground">
              {t("profile.short_description")}
            </p>
          </div>

          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-lg font-extrabold">Quick Links</h2>
            <ul className="space-y-2">
              {navigation.map((item, index) => (
                <li key={index}>
                  <NavLink
                    className="inline-flex items-center gap-2 font-semibold text-muted-foreground transition hover:text-foreground"
                    to={item.route}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <h2 className="text-lg font-extrabold">Stay Contact</h2>

            <Badge asChild variant={"outline"} className="bg-background/40">
              <a
                target="_BLANK"
                rel="noopener noreferrer"
                href="https://www.google.com/maps/place/%E6%96%B0%E7%AB%B9%E7%B8%A3"
                className="gap-2"
              >
                <MapPin absoluteStrokeWidth size={18} />
                <span className="font-semibold text-sm">{profile.country}</span>
              </a>
            </Badge>

            <Badge variant={"outline"} asChild className="bg-background/40">
              <a href={`mailto:${profile.email}`} className="gap-2">
                <AtSign absoluteStrokeWidth size={18} />
                <span className="font-semibold text-sm">{profile.email}</span>
              </a>
            </Badge>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {socialLink.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.link}
                  aria-label={link.title}
                  target="_BLANK"
                  className=" group relative grid h-10 w-10 place-items-center rounded-full border border-border/60 hover:text-background transition hover:-translate-y-0.5 hover:border-primary/60 "
                >
                  <span>{link.icon}</span>
                  <span className="absolute inset-0 -z-10 rounded-full bg-primary scale-50 opacity-0 transition-all  group-hover:scale-100 group-hover:opacity-100" />
                </NavLink>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10 flex items-center justify-center">
          <span className="rounded-full  border border-primary px-4 py-2 text-xs font-semibold text-secondary-foreground">
            Copyright © 2025 {profile.nickName}
          </span>
        </div>
      </div>
    </footer>
  );
}
