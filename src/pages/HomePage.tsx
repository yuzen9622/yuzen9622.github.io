import { Helmet } from "react-helmet";

import AboutHero from "@/components/about/AboutHero";
import AboutSection from "@/components/about/AboutSection";

export default function AboutPage() {
  return (
    <div className="w-full overflow-hidden">
      <Helmet>
        <title>Yuzen - Developer</title>
      </Helmet>
      <div className="flex flex-col   overflow-hidden">
        <AboutHero />
        <AboutSection />
      </div>
    </div>
  );
}
