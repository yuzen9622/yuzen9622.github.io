import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { AtSign, MapPin } from "lucide-react";
import { useProfile } from "@/hook/useProfile";

export default function Footer() {
  const { navigation, mySelf } = useProfile();
  return (
    <footer className="w-full min-h-60 dark:bg-none dark:border-t-2 backdrop-blur-xs bg-gradient-to-r from-slate-300 via-slate-100   to-slate-300 p-5">
      <section className="flex gap-3 lg:flex-row flex-col">
        <div className="flex-1 text-center">
          <span className="flex items-center gap-3 space-y-1 justify-center">
            <Avatar className="  w-12   h-12 aspect-square">
              <AvatarImage
                className=" rounded-full aspect-square "
                width={48}
                height={48}
                alt={mySelf.name}
                src={mySelf.avatar}
              />
              <AvatarFallback className=" text-2xl">
                {mySelf.name}
              </AvatarFallback>
            </Avatar>
            <h1 className=" text-slate-700  dark:text-slate-200 text-2xl font-extrabold">
              {mySelf.name}
            </h1>
          </span>
          <span className="text-wrap text-slate-500  dark:text-slate-200 font-bold">
            {mySelf.description}
          </span>
        </div>
        <div className="flex-1  space-y-1 text-center">
          <h1 className="text-slate-700  dark:text-slate-200 text-xl font-extrabold">
            Quick Links
          </h1>
          <ul className=" space-y-1">
            {navigation.map((item, index) => (
              <li key={index}>
                <NavLink
                  className={
                    "hover:text-slate-700  dark:text-slate-200 text-slate-500 hover:font-bold hover:translate-x-2 transition-all"
                  }
                  to={item.route}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1  gap-2 flex flex-col items-center">
          <h1 className="text-slate-700 text-xl font-extrabold  dark:text-slate-200">
            Stay Contact
          </h1>

          <Badge
            variant={"outline"}
            className=" text-slate-500 outline  outline-slate-400  dark:text-slate-200"
          >
            <MapPin absoluteStrokeWidth size={20} />
            <p className=" font-bold text-[16px]"> {mySelf.contry}</p>
          </Badge>
          <Badge
            variant={"outline"}
            className=" text-slate-500 outline  outline-slate-400  dark:text-slate-200"
          >
            <AtSign absoluteStrokeWidth size={20} />
            <p className=" font-bold text-[16px]"> {mySelf.email}</p>
          </Badge>
        </div>
      </section>
      <section></section>
    </footer>
  );
}
