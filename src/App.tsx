import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import About from "@/components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Squares from "./components/gsap/background/square";
import Project from "./components/Project";

import { useEffect } from "react";
import Contact from "./components/Contact";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left of the window
  }, [pathname]); // Re-run effect whenever the pathname changes

  return null; // This component doesn't render any visible UI
};

function App() {
  return (
    <div className=" relative w-full flex  bg-transparent   items-center flex-col gap-5 min-h-screen z-10  ">
      <Navbar />
      <ScrollToTop />
      {
        <div className="absolute inset-0 z-0 bg-white dark:bg-black">
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="#ffffff "
            hoverFillColor="transparent"
          />
        </div>
      }

      <Routes>
        <Route path="" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
