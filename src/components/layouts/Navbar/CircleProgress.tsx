import { forwardRef } from "react";

export const CircleProgress = forwardRef<
  SVGCircleElement,
  { circumference: number; offset: number; scrollY: number }
>(({ circumference, offset, scrollY }, ref) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className=" text-4xl  fill-primary hover:fill-primary-foreground"
    >
      <circle
        cx={"50"}
        cy="50"
        ref={ref}
        r="45"
        stroke={"var(--primary)"}
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        fill="none"
      ></circle>
      <text
        x={"50"}
        y="50"
        textAnchor="middle"
        dominantBaseline={"middle"}
        className=" font-bold"
      >
        {scrollY}
      </text>
    </svg>
  );
});
