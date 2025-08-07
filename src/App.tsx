import "./App.css";

import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "@/components/Footer";
import Squares from "@/components/gsap/background/square";
import Navbar from "@/components/Navbar/index";
import { Toaster } from "@/components/ui/sonner";
import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import ProjectPage from "@/pages/ProjectPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left of the window
  }, [pathname]); // Re-run effect whenever the pathname changes

  return null; // This component doesn't render any visible UI
};

function App() {
  return (
    <div className="  relative w-full flex  bg-transparent   items-center flex-col gap-5 min-h-screen z-10  ">
      <Navbar />
      <ScrollToTop />
      <Toaster richColors />
      <div className=" fixed inset-0 z-0 w-dvw h-dvh bg-white dark:bg-black">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#ffffff "
          hoverFillColor="transparent"
        />
      </div>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
