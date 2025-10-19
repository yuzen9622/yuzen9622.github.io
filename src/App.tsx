import "./App.css";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "@/components/Footer";
import Squares from "@/components/gsap/background/square";
import Navbar from "@/components/Navbar/index";
import { Toaster } from "@/components/ui/sonner";
import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import ProjectPage from "@/pages/ProjectPage";

import ViewProjectCard from "./components/project/ui/ViewProjectCard";

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

function App() {
  return (
    <div className="  relative w-full flex bg-transparent    items-center flex-col min-h-screen z-10  ">
      <Navbar />
      <ScrollToTop />
      <Toaster richColors />

      <div className=" fixed inset-0 z-0 w-dvw h-dvh   bg-white dark:bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            x: [-50, 50, 50, -50],
            y: [50, 50, -50, 50],
          }}
          whileInView={{ opacity: 1 }}
          transition={{
            opacity: { duration: 3, ease: "linear" },
            x: { duration: 5, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "linear" },
          }}
          className=" w-40  h-40 rounded-3xl absolute top-0 right-1/12  bg-green-300/70 dark:bg-green-500/70  blur-3xl "
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            x: [50, 50, -50, 50],
            y: [50, -50, -50, 50],
          }}
          transition={{
            opacity: { duration: 3, ease: "linear" },
            x: { duration: 5, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "linear" },
          }}
          whileInView={{ opacity: 1 }}
          className=" w-40  h-40 rounded-3xl  absolute bottom-0  left-1/12 bg-blue-300/70 dark:bg-blue-500/70  blur-3xl "
        ></motion.div>
        <Squares
          speed={0.0}
          squareSize={100}
          direction="diagonal"
          borderColor="#ffffff "
          hoverFillColor="transparent"
        />
      </div>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />}>
            <Route path=":title" element={<ViewProjectCard />} />
          </Route>
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
