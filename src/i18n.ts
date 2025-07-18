// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ⬇️ 載入翻譯檔（en）
import about_en from "@/locales/en/about.json";
import project_en from "@/locales/en/project.json";
import contact_en from "@/locales/en/contact.json";

// ⬇️ 載入翻譯檔（zh）
import about_zh from "@/locales/zh/about.json";
import project_zh from "@/locales/zh/project.json";
import contact_zh from "@/locales/zh/contact.json";

i18n.use(initReactI18next).init({
  lng: "en", // 預設語言（可改成 "en"）
  fallbackLng: "en", // 語言找不到時用英文備用
  debug: false,

  ns: ["about", "project", "contact"], // 告訴 i18next 你有哪些命名空間
  defaultNS: "about", // 預設命名空間（t() 沒指定會用這個）

  resources: {
    en: {
      about: about_en,
      project: project_en,
      contact: contact_en,
    },
    zh: {
      about: about_zh,
      project: project_zh,
      contact: contact_zh,
    },
  },

  interpolation: {
    escapeValue: false, // React 已處理 XSS，這裡設 false 就好
  },
});

export default i18n;
