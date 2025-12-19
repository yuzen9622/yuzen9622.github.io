import { useParams, Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import i18n from "@/i18n";

import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import ProjectPage from "@/pages/ProjectPage";
import BlogPage from "@/pages/BlogPage";

import ViewProjectCard from "@/features/project/ui/ViewProjectCard";
import MainLayout from "@/components/layouts/MainLayout";
import BlogPost from "@/features/blog/BlogPost";
import { AnimatePresence } from "framer-motion";
import { supportedLngs } from "@/i18n";
export default function LangLayout() {
  const { lng } = useParams();

  useEffect(() => {
    if (i18n.language !== lng && supportedLngs.includes(lng!)) {
      i18n.changeLanguage(lng);
    }
  }, [lng]);
  if (!lng || !supportedLngs.includes(lng)) {
    return <Navigate to="/zh-Hans" replace />;
  }

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route index element={<HomePage />} />

          <Route path="projects" element={<ProjectPage />}>
            <Route path=":title" element={<ViewProjectCard />} />
          </Route>

          <Route path="contact" element={<ContactPage />} />

          <Route path="blog" element={<BlogPage />}>
            <Route path=":slug" element={<BlogPost />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
}
