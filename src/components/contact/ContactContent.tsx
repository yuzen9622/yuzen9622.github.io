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
          <Card>
            <CardContent>
              <a
                href={`mailto:${mySelf.email}`}
                className="flex items-center gap-3"
              >
                <div className=" p-2 bg-secondary rounded-3xl">
                  <AtSign />
                </div>

                {mySelf.email}
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <a
                href={`tel:${mySelf.phone}`}
                className="flex items-center gap-3"
              >
                <div className=" p-2 bg-secondary rounded-3xl">
                  <Phone />
                </div>

                {mySelf.phone}
              </a>
            </CardContent>
          </Card>
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
        </CardHeader>
      </Card>
    </div>
  );
}
