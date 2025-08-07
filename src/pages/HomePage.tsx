import AboutAward from "@/components/about/AboutAward";
import AboutCard from "@/components/about/AboutCard";
import AboutHeader from "@/components/about/AboutHeader";
import AboutProgram from "@/components/about/AboutProgram";
import AboutSkill from "@/components/about/AboutSkill";

export default function AboutPage() {
  return (
    <>
      <AboutHeader />
      <AboutCard />
      <AboutAward />
      <AboutProgram />
      <AboutSkill />
    </>
  );
}
