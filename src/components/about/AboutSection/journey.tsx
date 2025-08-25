import TimeLineObserver from "react-timeline-animation";

import InMotionDiv from "@/components/animations/InMotionDiv";
import { useTheme } from "@/hook/useTheme";

import Timeline from "./timeline";

export default function Journey() {
  const { isDark } = useTheme();

  return (
    <InMotionDiv className="flex-1 timeline-observer">
      <TimeLineObserver
        key={isDark ? "0" : "1"}
        initialColor="transparent"
        fillColor={isDark ? "#fff" : "#000000"}
        handleObserve={(setObserver) => {
          return <Timeline setObserver={setObserver} />;
        }}
        hasReverse
      />
    </InMotionDiv>
  );
}
