import { Route, Routes } from "react-router-dom";
import "./App.css";

import About from "@/components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Squares from "./components/gsap/background/square";
import { useTheme } from "@/hook/useTheme";
function App() {
  const { theme, systemTheme } = useTheme();
  const isDark =
    (theme === "system" && systemTheme === "dark") || theme === "dark";
  return (
    <div className=" relative w-full flex    items-center flex-col gap-5 min-h-screen z-10  ">
      <Navbar />
      {isDark && (
        <div className="absolute inset-0 z-0">
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="#fff"
            hoverFillColor="transperant"
          />
        </div>
      )}

      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/experience" element={<></>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
