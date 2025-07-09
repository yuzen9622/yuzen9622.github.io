import { useProfile } from "@/hook/useProfile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AtSign, Phone, QrCode } from "lucide-react";
import ContactCard from "./ui/ContactCard";

export default function ContactContent() {
  const { mySelf, socialLink } = useProfile();
  return (
    <div className="w-full min-h-[50dvh] flex p-5 gap-5 max-lg:flex-col-reverse">
      <Card className="flex-1  backdrop-blur-xs">
        <CardHeader>
          <CardTitle className=" flex items-center gap-3">
            <img
              src={mySelf.avatar}
              alt={mySelf.name}
              width={40}
              height={40}
              className=" w-12 h-12 aspect-square rounded-full"
            />
            <span>
              <h1 className="text-2xl">{mySelf.name}</h1>
              <CardDescription>
                <p>or you can call me Yuzen</p>
              </CardDescription>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-3">
          <ContactCard
            title={"Email"}
            desc={mySelf.email}
            href={`mailto:${mySelf.email}`}
            icon={<AtSign />}
          />
          <ContactCard
            title="Phone"
            href={`tel:${mySelf.phone}`}
            icon={<Phone />}
            desc={mySelf.phone}
          />
        </CardContent>
      </Card>

      <Card className=" flex-1 backdrop-blur-xs">
        <CardHeader>
          <CardTitle className=" flex items-center gap-3">
            <QrCode
              size={48}
              className=" p-2 text-primary  bg-secondary rounded-full"
            />
            <span>
              <h1 className=" text-2xl">Social Link</h1>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-3">
          {socialLink.map((item) => (
            <ContactCard
              title={item.title}
              href={item.link}
              desc={item.desc}
              icon={item.icon}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
