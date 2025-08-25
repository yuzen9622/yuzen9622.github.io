import { motion } from "framer-motion";
import { useRef, useState } from "react";

import { useMousePosition } from "@/hook/useMousePosition";

export default function MaskText() {
  const maskDiv = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition(maskDiv);
  const [isHover, setIsHover] = useState(false);

  const handleMouseIn = () => {
    setIsHover(true);
  };
  const handleMouseOut = () => {
    setIsHover(false);
  };

  return (
    <>
      <div className=" relative  text-center  flex-1  flex items-center justify-center  ">
        <p className="text-[clamp(2rem,3vw,3.5rem)]/13 h-full  w-11/12 flex items-center justify-center flex-col font-extrabold text-wrap">
          As a{" "}
          <span className=" text-white p-1 rounded-md  bg-blue-600">
            Full-Stack Developer
          </span>{" "}
          enjoy tackling bugs with precision, and continuously exploring new
          technologies.
        </p>
        <motion.div
          onMouseEnter={handleMouseIn}
          onMouseLeave={handleMouseOut}
          ref={maskDiv}
          initial={{ opacity: 0, webkitMaskSize: "50px", maskSize: "50px" }}
          animate={{
            webkitMaskPosition: `${x - 200 / 2}px ${y - 200 / 2}px`,
            opacity: isHover ? 1 : 0,
            maskSize: isHover ? "200px" : "50px",
            webkitMaskSize: isHover ? "200px" : "50px",
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
          className="  absolute   flex items-center justify-center inset-0 text-center  cursor-default mask-[url('/mask.svg')] bg-primary mask-center  mask-no-repeat    text-primary-foreground mask-alpha "
        >
          <p className="text-[clamp(2rem,3vw,3.5rem)]/13 h-full  w-11/12 flex items-center justify-center flex-col font-extrabold text-wrap ">
            As a{" "}
            <span className=" text-blue-500 p-1 rounded-md  bg-white ">
              Full-Stack Developer
            </span>{" "}
            enjoy tackling bugs with precision, and continuously exploring new
            technologies.
          </p>
        </motion.div>
      </div>{" "}
    </>
  );
}
