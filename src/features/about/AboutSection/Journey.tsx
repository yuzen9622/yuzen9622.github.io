import { useTranslation } from "react-i18next";
import TimeLineObserver from "react-timeline-animation";

import InMotionDiv from "@/components/animations/InMotionDiv";
import { useTheme } from "@/shared/hook/useTheme";

import Timeline from "./Timeline";

export default function Journey() {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  return (
    <InMotionDiv className="flex-1 timeline-observer ">
      <TimeLineObserver
        key={`${i18n.language}-${isDark}`}
        initialColor="transparent"
        fillColor={isDark ? "#FDF7F8" : "#2C3B4E"}
        handleObserve={() => {
          return <Timeline />;
        }}
        hasReverse
      />
    </InMotionDiv>
  );
}
