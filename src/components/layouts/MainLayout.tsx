import React, { useEffect, useState } from "react";
import Squares from "@/components/gsap/background/square";
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
  const match = location.pathname.match(/^\/blog\/([^/]+)$/);
  const slug = match ? match[1] : null;
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    const [prevPath, setPrevPath] = useState<string | null>(null);
    useEffect(() => {
      if (
        pathname === prevPath ||
        pathname.split("/").length > 2 ||
        (prevPath && prevPath.split("/").length > 2)
      )
        return;
      window.scrollTo(0, 0); // Scrolls to the top-left of the window

      setPrevPath(pathname);
    }, [pathname, prevPath]); // Re-run effect whenever the pathname changes

    return null; // This component doesn't render any visible UI
  };

  return (
    <div
      className={cn(
        "  relative w-full flex bg-transparent    items-center flex-col min-h-screen z-10  ",
        slug && "overflow-hidden max-h-dvh"
      )}
    >
      <Navbar />
      <ScrollToTop />
      <Toaster richColors />

      <div className=" fixed inset-0 z-0 w-dvw h-dvh   bg-background ">
        <Squares
          speed={0.0}
          squareSize={100}
          direction="diagonal"
          borderColor="#ffffff "
          hoverFillColor="transparent"
        />
      </div>
      {children}
      <Footer />
    </div>
  );
}
