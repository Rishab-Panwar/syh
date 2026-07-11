import LegalPage from "@/components/legal-page";
import { privacyPolicy } from "@/lib/legal-data";

export const metadata = {
  title: "Privacy Policy – Secure Your Hacks",
  description:
    "How Secure Your Hacks collects, uses, and protects your personal information, including CCPA and GDPR rights.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage content={privacyPolicy} />;
}
