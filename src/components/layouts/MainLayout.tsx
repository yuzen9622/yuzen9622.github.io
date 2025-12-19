import React, { useMemo } from "react";

import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./Footer";
import { cn } from "@/shared/lib/utils";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  const match = useMemo(
    () => location.pathname.match(/^\/(en|zh-Hans)\/blog\/([^/]+)$/),
    [location.pathname]
  );

  const slug = match ? match[2] : null;

  return (
    <div
      className={cn(
        "  relative w-full flex bg-background overflow-hidden items-center flex-col min-h-screen z-10  ",
        slug && "overflow-hidden max-h-dvh"
      )}
    >
      <Navbar />

      <Toaster richColors />

      {children}

      <Footer />
    </div>
  );
}
