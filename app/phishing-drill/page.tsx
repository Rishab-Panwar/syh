import { Geist } from "next/font/google";
import Navbar from "@/components/navbar";
import PhishingDrill from "@/components/phishing-drill";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Phishing Drill - Voice Scam Simulator | Secure Your Hacks",
  description:
    "Practice against voice phishing (vishing) in a safe, AI-powered simulation. An AI plays a scammer calling you, then scores how well you resisted.",
};

export default function PhishingDrillPage() {
  return (
    <>
      <Navbar />
      <main
        className={`${geist.className} min-h-screen`}
        style={{
          paddingTop: 72,
          backgroundColor: "#0b0718",
          backgroundImage:
            "radial-gradient(at 85% 0%, rgba(139, 92, 246, 0.28) 0%, transparent 45%), radial-gradient(at 10% 100%, rgba(192, 132, 252, 0.14) 0%, transparent 45%), radial-gradient(at 50% 50%, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
        }}
      >
        <PhishingDrill />
      </main>
    </>
  );
}
