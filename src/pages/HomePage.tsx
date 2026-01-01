import { Helmet } from "react-helmet-async";

import AboutHero from "@/features/about/AboutHero";
import AboutSection from "@/features/about/AboutSection";
import Project from "@/features/project/Project";
import Contact from "@/features/contact/Contact";
export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Yuzen - Developer</title>
      </Helmet>
      <AboutHero />
      <AboutSection />
      <Project />
      <Contact />
    </>
  );
}
