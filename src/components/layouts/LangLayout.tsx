import { useParams, Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import i18n from "@/i18n";

import HomePage from "@/pages/HomePage";
import BlogPage from "@/pages/BlogPage";
import MainLayout from "@/components/layouts/MainLayout";
import BlogPost from "@/features/blog/BlogPost";
import { AnimatePresence } from "framer-motion";
import { supportedLngs } from "@/i18n";
export default function LangLayout() {
  const { lng } = useParams();

  useEffect(() => {
    if (lng && i18n.language !== lng && supportedLngs.includes(lng!)) {
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
          <Route path="blog" element={<BlogPage />}>
            <Route path=":slug" element={<BlogPost />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
}
