import { Helmet } from "react-helmet";

import AboutAward from "@/components/about/AboutAward";
import AboutCard from "@/components/about/AboutCard";
import AboutHeader from "@/components/about/AboutHeader";
import AboutProgram from "@/components/about/AboutProgram";
import AboutSkill from "@/components/about/AboutSkill";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Yuzen - Developer</title>
      </Helmet>
      <AboutHeader />
      <AboutCard />
      <AboutAward />
      <AboutProgram />
      <AboutSkill />
    </>
  );
}
