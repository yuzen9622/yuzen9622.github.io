import AboutAward from "./about/AboutAward";
import AboutCard from "./about/AboutCard";
import AboutHeader from "./about/AboutHeader";
import AboutProgram from "./about/AboutProgram";
import AboutSkill from "./about/AboutSkill";

export default function About() {
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
