import { Helmet } from "react-helmet";

import AboutHero from "@/components/about/AboutHero";
import AboutSection from "@/components/about/AboutSection";

export default function AboutPage() {
  return (
    <div className="space-y-5">
      <Helmet>
        <title>Yuzen - Developer</title>
      </Helmet>
      <div>
        <AboutHero />
        <AboutSection />
      </div>
    </div>
  );
}
