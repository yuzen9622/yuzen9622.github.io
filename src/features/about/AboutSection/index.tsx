import Header from "./Header";
import Journey from "./Journey";
import Main from "./Main";
import Marquee from "./Marquee";
import SkillGrid from "./SkillGrid";

export default function AboutSection() {
  return (
    <section className=" w-full gap-4 z-10 overflow-hidden min-h-dvh bg-background flex  items-center flex-col   pt-5 relative">
      <Marquee />
      <Header />
      <Main />
      <div className="flex w-full  max-lg:flex-col justify-around  gap-5">
        <Journey />
        <SkillGrid />
      </div>
    </section>
  );
}
