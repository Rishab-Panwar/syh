import { Geist } from "next/font/google";
import Navbar from "@/components/navbar";
import RiskAssessment from "@/components/risk-assessment";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "AI Third-Party Risk Assessment | Secure Your Hacks",
  description:
    "An AI agent that gathers live security signals from a vendor's domain and returns an explainable risk score, factor breakdown, and onboarding decision.",
};

export default function RiskAssessmentPage() {
  return (
    <>
      <Navbar />
      <main
        className={`${geist.className} min-h-screen`}
        style={{
          paddingTop: 72,
          backgroundColor: "#07051d",
          backgroundImage:
            "radial-gradient(at 85% 0%, rgba(1, 103, 247, 0.28) 0%, transparent 45%), radial-gradient(at 5% 100%, rgba(34, 211, 238, 0.10) 0%, transparent 45%)",
        }}
      >
        <RiskAssessment />
      </main>
    </>
  );
}
