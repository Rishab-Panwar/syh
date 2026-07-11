import Navbar from "@/components/navbar";
import { ContactSection } from "@/components/contact-section";
import Footer from "@/components/site-footer";

export const metadata = {
  title: "Contact Us – Secure Your Hacks",
  description:
    "Get in touch with our cybersecurity experts. We're here to answer your questions.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
