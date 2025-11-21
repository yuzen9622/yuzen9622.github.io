import "./App.css";

import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";

import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import ProjectPage from "@/pages/ProjectPage";

import ViewProjectCard from "@/features/project/ui/ViewProjectCard";
import MainLayout from "@/components/layouts/MainLayout";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />}>
            <Route path=":title" element={<ViewProjectCard />} />
          </Route>
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/blog" element={<BlogPage />}>
            <Route path=":id" />
          </Route>
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
