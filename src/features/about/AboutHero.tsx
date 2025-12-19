import MaskHero from "./ui/MaskHero";
import Squares from "@/components/gsap/background/square";

export default function AboutHero() {
  return (
    <div className="min-h-dvh relative flex flex-col">
      <div className="h-full flex-1 flex   justify-center">
        <div className="  absolute inset-0 z-0 w-dvw h-dvh   bg-background ">
          <Squares
            speed={0.0}
            squareSize={50}
            direction="diagonal"
            borderColor="#ffffff "
            hoverFillColor="transparent"
          />
        </div>
        <MaskHero />
      </div>
    </div>
  );
}
