import { Helmet } from "react-helmet";

import ContactContent from "@/features/contact/ContactContent";
import ContactForm from "@/features/contact/ContactForm";
import ContactHeader from "@/features/contact/ContactHeader";

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
