import { Helmet } from "react-helmet-async";

import AboutHero from "@/features/about/AboutHero";
import AboutSection from "@/features/about/AboutSection";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Yuzen - Developer</title>
        <meta
          name="description"
          content="Yuzen 的個人網頁，展示開發作品、技能、專案與聯絡方式，專注於全端開發、網頁設計。"
        />
        <meta
          name="keywords"
          content="Yuzen, 全端開發, 前端, 後端, 個人網頁, 程式作品, 網頁設計, AI, Python,Portfolio, JavaScript, React, Next.js,small Z,Small Z"
        />
        <meta name="author" content="Yuzen" />
        <meta property="og:image" content="/avatar.webp" />
        <meta property="og:url" content="https://www.yuzen.dev/" />
        <meta property="og:type" content="website" />
      </Helmet>

      <AboutHero />
      <AboutSection />
    </>
  );
}
