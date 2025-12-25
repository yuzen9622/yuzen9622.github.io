import { motion, type Variants } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

import { useMousePosition } from "@/shared/hook/useMousePosition";

import { AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import CircularText from "@/components/gsap/text/CircularText";

import { Badge } from "@/components/ui/badge";
import { AtSign, MapPin } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useProfile } from "@/shared/hook/useProfile";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils";

const LOCATION_URL =
  "https://www.google.com/maps/place/%E6%96%B0%E7%AB%B9%E7%B8%A3";
const MASK_INITIAL_SIZE = 50;
const MASK_TARGET_SIZE = 200;
const QUOTE_BASE_CLASSES =
  "relative text-[clamp(2rem,2.5vw,3rem)]/13 h-full w-11/12 flex items-center justify-center flex-col font-extrabold text-wrap before:content-['“'] before:absolute before:-top-2 before:-left-4 before:text-[clamp(3rem,4vw,4rem)] before:leading-none after:content-['”'] after:absolute after:bottom-0 after:-right-2 after:text-[clamp(3rem,4vw,4rem)] after:leading-none";

type ContactLink = {
  id: string;
  href: string;
  label: string;
  icon: ReactNode;
  target?: string;
};

type ContactBadgeProps = ContactLink & {
  badgeClassName?: string;
  textClassName?: string;
};

type ProfileRolesProps = {
  sequence: (string | number | (() => void))[];
  languageKey: string;
  className: string;
};

const ContactBadge = ({
  href,
  label,
  icon,
  target,
  badgeClassName,
  textClassName,
}: ContactBadgeProps) => (
  <Badge asChild variant="outline" className={badgeClassName}>
    <a
      href={href}
      target={target}
      rel={target === "_BLANK" ? "noreferrer" : undefined}
      className="flex items-center gap-2"
    >
      {icon}
      <p className={cn("font-bold text-[16px]", textClassName)}>{label}</p>
    </a>
  </Badge>
);

const ProfileRoles = ({
  sequence,
  languageKey,
  className,
}: ProfileRolesProps) => (
  <TypeAnimation
    key={languageKey}
    sequence={sequence}
    speed={30}
    className={className}
    repeat={Infinity}
  />
);

export default function MaskHero() {
  const maskDiv = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition(maskDiv);
  const [isHover, setIsHover] = useState(false);
  const { profile } = useProfile();
  const { i18n } = useTranslation();
  const contactLinks: ContactLink[] = [
    {
      id: "location",
      href: LOCATION_URL,
      label: profile.country,
      icon: <MapPin absoluteStrokeWidth size={20} />,
      target: "_BLANK",
    },
    {
      id: "email",
      href: `mailto:${profile.email}`,
      label: profile.email,
      icon: <AtSign absoluteStrokeWidth size={20} />,
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 320, damping: 26 },
    },
  };

  const stack: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.06,
      },
    },
  };

  const cardContainer: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 24,
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const fastItem: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 360, damping: 28 },
    },
  };
  const handleMouseIn = () => {
    setIsHover(true);
  };
  const handleMouseOut = () => {
    setIsHover(false);
  };
  const maskInitialSize = `${MASK_INITIAL_SIZE}px`;
  const maskSizePx = `${isHover ? MASK_TARGET_SIZE : MASK_INITIAL_SIZE}px`;
  const maskPosition = `${x - MASK_TARGET_SIZE / 2}px ${
    y - MASK_TARGET_SIZE / 2
  }px`;
  const maskAnimation = {
    webkitMaskPosition: maskPosition,
    opacity: isHover ? 1 : 0,
    maskSize: maskSizePx,
    webkitMaskSize: maskSizePx,
  };
  const defaultQuoteClass = `${QUOTE_BASE_CLASSES} before:text-primary/70 after:text-primary/70`;
  const maskQuoteClass = `${QUOTE_BASE_CLASSES} before:text-primary-foreground/70 after:text-primary-foreground/70`;

  return (
    <>
      <motion.div
        className="relative text-center flex-1 flex flex-col items-center justify-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div variants={fastItem}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              x: [-50, 50, 50, -50],
              y: [50, 50, -50, 50],
            }}
            whileInView={{ opacity: 1 }}
            transition={{
              opacity: { duration: 3, ease: "linear" },
              x: { duration: 5, repeat: Infinity, ease: "linear" },
              y: { duration: 5, repeat: Infinity, ease: "linear" },
            }}
            className=" w-40  h-40  rounded-3xl absolute dark:bg-primary right-0 top-0 transition-all  bg-primary/50  blur-3xl "
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              x: [50, 50, -50, 50],
              y: [50, -50, -50, 50],
            }}
            transition={{
              opacity: { duration: 3, ease: "linear" },
              x: { duration: 5, repeat: Infinity, ease: "linear" },
              y: { duration: 5, repeat: Infinity, ease: "linear" },
            }}
            whileInView={{ opacity: 1 }}
            className=" w-40  h-40 rounded-3xl   absolute bottom-0  dark:bg-primary   left-0 bg-primary/50   blur-3xl "
          ></motion.div>
          {/**第一層 */}
          <motion.div variants={cardContainer}>
            <Card className="mx-auto mt-20 justify-center border-none shadow-none flex lg:flex-row items-center bg-transparent flex-col">
              <motion.div variants={item}>
                <CardContent className="h-full relative w-full ">
                  <motion.div className=" w-40  h-40 rounded-3xl absolute bottom-2/12 z-0 left-3/12  bg-primary/70 blur-3xl "></motion.div>
                  <Avatar className="pointer-events-none w-3xs h-full aspect-square">
                    <AvatarImage
                      className=" rounded-full"
                      alt={profile.name}
                      width={48}
                      height={48}
                      src={profile.avatar}
                    />
                    <AvatarFallback>{profile.name}</AvatarFallback>
                  </Avatar>
                </CardContent>
              </motion.div>

              <motion.div variants={stack}>
                <CardContent className="h-full flex justify-center lg:items-start items-center flex-col gap-5">
                  <motion.h1
                    variants={item}
                    className="relative lg:text-5xl text-4xl font-extrabold text-primary"
                  >
                    {profile.name}
                  </motion.h1>

                  <motion.div variants={item}>
                    <ProfileRoles
                      languageKey={i18n.language}
                      sequence={profile.roles}
                      className="lg:text-2xl text-lg text-white relative font-bold bg-primary w-fit rounded-md p-2"
                    />
                  </motion.div>

                  <motion.div
                    variants={stack}
                    className="relative flex gap-3 lg:justify-start justify-center max-sm:flex-col items-center"
                  >
                    {contactLinks.map((link) => (
                      <motion.div key={link.id} variants={item}>
                        <ContactBadge
                          {...link}
                          badgeClassName="backdrop-blur-xs"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.p variants={stack} className={defaultQuoteClass}>
          <motion.span variants={item} className="  w-fit max-w-full ">
            {profile.slogan}
          </motion.span>
        </motion.p>

        <motion.div
          onMouseEnter={handleMouseIn}
          onMouseLeave={handleMouseOut}
          ref={maskDiv}
          initial={{
            opacity: 0,
            webkitMaskSize: maskInitialSize,
            maskSize: maskInitialSize,
          }}
          animate={maskAnimation}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
          className="  absolute pt-20  flex flex-col items-center justify-center text-primary-foreground inset-0 text-center  cursor-default mask-[url('/mask.svg')] bg-primary mask-center  mask-no-repeat     mask-alpha "
        >
          <Card className="mx-auto  w-11/12   justify-center border-none shadow-none  flex lg:flex-row items-center bg-transparent   flex-col   ">
            <CardContent className="h-full relative  flex items-center justify-center ">
              <Avatar className="  relative w-3xs  z-50  h-full aspect-square">
                <AvatarImage
                  className=" rounded-full"
                  alt={profile.name}
                  width={48}
                  height={48}
                  src={profile.avatar}
                />
                <AvatarFallback>{profile.name}</AvatarFallback>
                <div className=" absolute flex items-center justify-center w-full h-full">
                  <CircularText
                    text={profile.tagline}
                    spinDuration={20}
                    className=" w-full h-full  cursor-pointer  text-white"
                  />
                </div>
              </Avatar>
            </CardContent>
            <CardContent className="  h-full flex justify-center    lg:items-start items-center flex-col gap-3 ">
              <h1 className=" relative lg:text-5xl text-4xl font-extrabold text-primary-foreground ">
                {profile.name}
              </h1>

              <ProfileRoles
                languageKey={i18n.language}
                sequence={profile.roles}
                className="lg:text-2xl text-lg relative font-bold bg-secondary w-fit rounded-md p-2"
              />

              <div className=" relative flex gap-3 lg:justify-start  justify-center max-sm:flex-col items-center">
                {contactLinks.map((link) => (
                  <ContactBadge
                    key={link.id}
                    {...link}
                    badgeClassName="text-primary-foreground"
                    textClassName="text-primary-foreground"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <p className={maskQuoteClass}>
            <span className="  w-fit max-w-full ">{profile.slogan}</span>
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}
