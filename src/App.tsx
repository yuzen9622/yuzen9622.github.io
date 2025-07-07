import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import About from "@/components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Squares from "./components/gsap/background/square";
import { useTheme } from "@/hook/useTheme";
import Project from "./components/Project";

import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left of the window
  }, [pathname]); // Re-run effect whenever the pathname changes

  return null; // This component doesn't render any visible UI
};

function App() {
  const { theme, systemTheme } = useTheme();
  const isDark =
    (theme === "system" && systemTheme === "dark") || theme === "dark";
  return (
    <div className=" relative w-full flex    items-center flex-col gap-5 min-h-screen z-10  ">
      <Navbar />
      <ScrollToTop />
      {isDark && (
        <div className="absolute inset-0 z-0">
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="#fff"
            hoverFillColor="transparent"
          />
        </div>
      )}

      <Routes>
        <Route path=" " element={<About />} />
        <Route index path="/projects" element={<Project />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
