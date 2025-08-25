import { Helmet } from "react-helmet";

import AboutHeader from "@/components/about/AboutHeader";
import AboutSection from "@/components/about/AboutSection";
import AboutSkill from "@/components/about/AboutSkill";

export default function AboutPage() {
  return (
    <div className="space-y-5">
      <Helmet>
        <title>Yuzen - Developer</title>
      </Helmet>
      <div>
        <AboutHeader />
        <AboutSection />
      </div>

      <AboutSkill />
    </div>
  );
}
