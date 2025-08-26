import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import type { Award } from "@/types/type";
export default function Timeline({
  setObserver,
}: {
  setObserver: (target: Element, callbackFn?: (() => void) | undefined) => void;
}) {
  const timelineRefs = useRef<HTMLSpanElement[]>([]);
  const { t } = useTranslation("about");
  const myAward = useMemo(
    () => t("myAward", { returnObjects: true }) as Award[],
    [t]
  );

  useEffect(() => {
    timelineRefs.current.forEach((timelineRef) => {
      setObserver(timelineRef);
    });
  }, [setObserver, myAward]);

  return (
    <div className=" relative flex flex-col h-full ">
      {myAward.map(({ title, time, description }, index) => (
        <div
          key={title}
          className={cn(
            " relative  flex w-full min-h-36  flex-1",
            index % 2 == 0 ? "justify-start" : "justify-end"
          )}
        >
          <div className=" absolute inset-0  flex  -z-0 items-center flex-col justify-between">
            <div className="  sticky top-0 p-1 z-10  bg-accent-foreground rounded-full shadow-[0_0px_10px_rgba(0,0,0,0.5)] dark:shadow-[0_0px_10px_rgba(225,225,225)]   "></div>

            <div
              id={`timeline${index}`}
              ref={(ref) => {
                if (ref && index !== myAward.length - 1)
                  timelineRefs.current.push(ref);
              }}
              className={cn(
                " relative h-full rounded-3xl w-0.5 bg-transparent my-2 "
              )}
            />
          </div>
          <div
            className={cn(
              " sticky top-0 w-6/12 group flex ",
              index % 2 == 0
                ? "justify-end pr-4 text-end"
                : "justify-start pl-4"
            )}
          >
            <span>
              {time && (
                <p className="text-lg text-secondary-foreground/70 ">{time}</p>
              )}
              <h3 className="text-xl font-bold   group-hover:underline">
                {title}
              </h3>
              <p className="text-sm text-secondary-foreground/70">
                {description}
              </p>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
