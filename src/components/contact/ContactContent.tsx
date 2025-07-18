import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AtSign, Phone, QrCode } from "lucide-react";
import ContactCard from "./ui/ContactCard";
import { useTranslation } from "react-i18next";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function ContactContent() {
  const { t } = useTranslation(["contact", "about"]);
  const socialLink = t("socialLink", { returnObjects: true });
  const iconMap = {
    Instagram: <FaInstagram size={25} />,
    GitHub: <FaGithub size={25} />,
    LinkedIn: <FaLinkedin size={25} />,
  };

  return (
    <div className="w-full min-h-[50dvh] flex p-5 gap-5 max-lg:flex-col-reverse">
      <Card className="flex-1  backdrop-blur-xs">
        <CardHeader>
          <CardTitle className=" flex items-center gap-3">
            <img
              src={t("about:mySelf.avatar")}
              alt={t("about:mySelf.name")}
              width={40}
              height={40}
              className=" w-12 h-12 aspect-square rounded-full"
            />
            <span>
              <h1 className="text-2xl">{t("about:mySelf.name")}</h1>
              <CardDescription>
                <p>or you can call me {t("about:mySelf.nickName")}</p>
              </CardDescription>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-3">
          <ContactCard
            title={"Email"}
            desc={t("about:mySelf.email")}
            link={`mailto:${t("about:mySelf.email")}`}
            icon={<AtSign />}
          />
          <ContactCard
            title="Phone"
            link={`tel:${t("about:mySelf.phone")}`}
            icon={<Phone />}
            desc={t("about:mySelf.phone")}
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
              icon={iconMap[item.title]}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
