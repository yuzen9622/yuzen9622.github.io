// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ⬇️ 載入翻譯檔（en）
import profile_en from "@/locales/en/profile.json";
import project_en from "@/locales/en/project.json";
import award_en from "@/locales/en/award.json";
import blog_en from "@/locales/en/blog.json";
import education_en from "@/locales/en/education.json";
// ⬇️ 載入翻譯檔（zh）
import profile_zh from "@/locales/zh/profile.json";
import project_zh from "@/locales/zh/project.json";
import award_zh from "@/locales/zh/award.json";
import blog_zh from "@/locales/zh/blog.json";
import education_zh from "@/locales/zh/education.json";
export const supportedLngs = ["en", "zh-Hans"];
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs,
    debug: false,
    detection: {
      order: [
        "path",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    ns: ["profile", "project", "award", "blog", "education"],
    defaultNS: "profile",

    resources: {
      en: {
        profile: profile_en,
        project: project_en,
        blog: blog_en,
        award: award_en,
        education: education_en,
      },
      "zh-Hans": {
        profile: profile_zh,
        project: project_zh,
        blog: blog_zh,
        award: award_zh,
        education: education_zh,
      },
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
