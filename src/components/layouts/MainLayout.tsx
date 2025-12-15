import React, { memo, useEffect, useMemo, useState } from "react";

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

  const ScrollToTop = memo(() => {
    const { pathname } = useLocation();
    const [prevPath, setPrevPath] = useState<string | null>(null);

    useEffect(() => {
      if (pathname === prevPath || (prevPath && prevPath.split("/").length > 2))
        return;
      window.scrollTo(0, 0); // Scrolls to the top-left of the window

      setPrevPath(pathname);
    }, [pathname, prevPath]); // Re-run effect whenever the pathname changes

    return null; // This component doesn't render any visible UI
  });

  return (
    <div
      className={cn(
        "  relative w-full flex bg-background overflow-hidden items-center flex-col min-h-screen z-10  ",
        slug && "overflow-hidden max-h-dvh"
      )}
    >
      <Navbar />
      <ScrollToTop />
      <Toaster richColors />

      {children}

      <Footer />
    </div>
  );
}
