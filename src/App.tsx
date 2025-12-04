import "./App.css";

import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";

import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import ProjectPage from "@/pages/ProjectPage";
import BlogPage from "@/pages/BlogPage";

import ViewProjectCard from "@/features/project/ui/ViewProjectCard";
import MainLayout from "@/components/layouts/MainLayout";
import BlogPost from "./features/blog/BlogPost";

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
            <Route path=":slug" element={<BlogPost />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
