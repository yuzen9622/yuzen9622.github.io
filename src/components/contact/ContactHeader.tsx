import GlitchText from "../gsap/text/GlitchText";
import RotatingText from "../gsap/text/RotatingText";

export default function ContactHeader() {
  return (
    <div className=" w-full h-[33dvh] flex flex-col gap-10 items-center justify-center   animate-test">
      <GlitchText
        speed={0.5}
        enableShadows
        className="  text-black! dark:text-white! text-5xl"
      >
        Contact
      </GlitchText>
      <span className="flex items-center gap-2 text-[clamp(1rem,3vw,1.5rem)] bbh-sans-bartle-regular">
        <RotatingText
          texts={["Got an Idea?", "Need a Dev?", "Ping Me!"]}
          splitBy="characters"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
          mainClassName=" bg-blue-600  p-2 rounded-md  text-white font-extrabold"
        />
      </span>
    </div>
  );
}
