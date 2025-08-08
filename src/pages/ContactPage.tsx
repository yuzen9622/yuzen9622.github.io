import { Helmet } from "react-helmet";

import ContactContent from "@/components/contact/ContactContent";
import ContactForm from "@/components/contact/ContactForm";
import ContactHeader from "@/components/contact/ContactHeader";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Yuzen - Contact</title>
      </Helmet>
      <ContactHeader />
      <ContactContent />
      <ContactForm />
    </>
  );
}
