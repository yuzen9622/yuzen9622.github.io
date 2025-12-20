"use client";

import { useProfile } from "@/shared/hook/useProfile";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const { profile } = useProfile();

  const year = new Date().getFullYear();

  return (
    <footer className=" w-full border-t border-border/60 bg-secondary/30 backdrop-blur-sm">
      {" "}
      <Separator className="my-8 max-w-6xl mx-auto" />
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-xs font-semibold text-muted-foreground">
          <span>
            © {year} {profile.name}. All rights reserved.
          </span>
          <p>
            Powered by{" "}
            <a
              href="https://react.dev/"
              target="_BLANK"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              React
            </a>
            {" · "}
            <a
              href="https://tailwindcss.com/"
              target="_BLANK"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              Tailwind CSS
            </a>
            {" · "}
            <a
              href="https://ui.shadcn.com/"
              target="_BLANK"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              shadcn/ui
            </a>{" "}
            {" · "}
            <a
              href="https://www.framer.com/motion/"
              target="_BLANK"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              Framer Motion
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
