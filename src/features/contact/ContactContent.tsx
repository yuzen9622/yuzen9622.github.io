import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AtSign, Phone, QrCode } from "lucide-react";
import ContactCard from "./ui/ContactCard";

import { useProfile } from "@/shared/hook/useProfile";

export default function ContactContent() {
  const { socialLink, profile } = useProfile();

  return (
    <div className="w-full min-h-[50dvh] flex p-5 gap-5 max-lg:flex-col-reverse">
      <Card className="flex-1  backdrop-blur-xs">
        <CardHeader>
          <CardTitle className=" flex items-center gap-3">
            <img
              src={profile.avatar}
              alt={profile.name}
              width={40}
              height={40}
              className=" w-12 h-12 aspect-square rounded-full"
            />
            <span>
              <h1 className="text-2xl">{profile.name}</h1>
              <CardDescription>
                <p>or you can call me {profile.nickName}</p>
              </CardDescription>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-3">
          <ContactCard
            title={"Email"}
            desc={profile.email}
            link={`mailto:${profile.email}`}
            icon={<AtSign />}
          />
          <ContactCard
            title="Phone"
            link={`tel:${profile.phone}`}
            icon={<Phone />}
            desc={profile.phone}
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
          {socialLink.map((item, index) => (
            <ContactCard
              key={index}
              title={item.title}
              link={item.link}
              desc={item.desc}
              icon={item.icon}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
