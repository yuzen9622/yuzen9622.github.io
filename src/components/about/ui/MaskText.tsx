import { useMousePosition } from "@/hook/useMousePosition";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

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
      <div className=" relative w-11/12 text-center    rounded-md p-2 ">
        <p className="text-[clamp(2rem,3vw,3.5rem)]/13 font-extrabold text-wrap">
          As a{" "}
          <span className=" text-white p-1 rounded-md  bg-blue-600">
            Full-Stack Developer
          </span>{" "}
          enjoy tackling bugs with precision, and continuously exploring new
          technologies.
        </p>
      </div>{" "}
      <motion.div
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseOut}
        ref={maskDiv}
        initial={{ opacity: 0 }}
        animate={{
          webkitMaskPosition: `${x - 200 / 2}px ${y - 200 / 2}px`,
          opacity: isHover ? 1 : 0,
          webkitMaskSize: isHover ? "200px" : "50px",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        className="  absolute w-11/12 text-center  cursor-default mask-[url('/mask.svg')] bg-primary mask-center  mask-no-repeat  rounded-md p-2  text-primary-foreground mask-alpha "
      >
        <p className="text-[clamp(2rem,3vw,3.5rem)]/13 font-extrabold text-wrap  ">
          As a{" "}
          <span className=" text-blue-500 p-1 rounded-md  bg-white ">
            Full-Stack Developer
          </span>{" "}
          enjoy tackling bugs with precision, and continuously exploring new
          technologies.
        </p>
      </motion.div>
    </>
  );
}
