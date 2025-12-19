"use client";
import { useTranslation } from "react-i18next";

import { NavLink, useParams } from "react-router-dom";

import { useProfile } from "@/shared/hook/useProfile";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const { profile, navigation, socialLink } = useProfile();
  const { t } = useTranslation("profile");
  const { lng } = useParams();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 w-full border-t border-border/60 bg-secondary/30 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <section className="grid gap-10 md:grid-cols-12">
          <div className="space-y-3 text-center md:col-span-5 md:text-left">
            <h2 className="text-sm font-extrabold tracking-widest text-muted-foreground">
              SITE
            </h2>
            <div className="space-y-2">
              <p className="text-lg font-extrabold tracking-tight">
                {profile.name}
              </p>
              <p className="text-sm font-semibold text-muted-foreground">
                {t("profile.country")}
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
              >
                {profile.email}
              </a>
            </div>
          </div>

          <nav className="space-y-3 text-center md:col-span-3 md:text-left">
            <h2 className="text-sm font-extrabold tracking-widest text-muted-foreground">
              LINKS
            </h2>
            <ul className="space-y-2">
              {navigation.map((item, index) => (
                <li key={index}>
                  <NavLink
                    className="inline-flex font-semibold text-muted-foreground transition hover:text-foreground"
                    to={{ pathname: `/${lng}/${item.route}` }}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 text-center md:col-span-4 md:text-left">
            <h2 className="text-sm font-extrabold tracking-widest text-muted-foreground">
              ELSEWHERE
            </h2>
            <ul className="space-y-2">
              {socialLink.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.link}
                    target="_BLANK"
                    rel="noopener noreferrer"
                    className="inline-flex font-semibold text-muted-foreground transition hover:text-foreground"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Separator className="my-8" />

        <div className="flex items-center justify-center text-center text-xs font-semibold text-muted-foreground">
          <span>
            © {year} {profile.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
