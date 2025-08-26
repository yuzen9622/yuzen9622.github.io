import { useTranslation } from "react-i18next";
import TimeLineObserver from "react-timeline-animation";

import InMotionDiv from "@/components/animations/InMotionDiv";
import { useTheme } from "@/hook/useTheme";

import Timeline from "./timeline";

export default function Journey() {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  return (
    <InMotionDiv className="flex-1 timeline-observer">
      <TimeLineObserver
        key={`${i18n.language}-${isDark}`}
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
