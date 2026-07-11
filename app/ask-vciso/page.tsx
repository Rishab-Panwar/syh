import { Geist } from "next/font/google";
import Navbar from "@/components/navbar";
import VcisoChat from "@/components/vciso-chat";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Ask SecureBot – AI Security Advisor | Secure Your Hacks",
  description:
    "Chat with SecureBot, our AI security advisor. Get instant, cited guidance on VAPT, GDPR, HIPAA, PCI-DSS, SOC, and the right Secure Your Hacks service for your business.",
};

export default function AskVcisoPage() {
  return (
    <>
      <Navbar />
      <main
        className={`${geist.className} h-[100dvh] overflow-hidden`}
        style={{
          paddingTop: 72,
          backgroundImage:
            "radial-gradient(at 80% 0%, rgba(0, 63, 153, 0.35) 0%, rgb(7, 5, 29) 55%)",
        }}
      >
        <VcisoChat />
      </main>
    </>
  );
}
