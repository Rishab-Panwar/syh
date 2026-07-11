import LegalPage from "@/components/legal-page";
import { termsAndConditions } from "@/lib/legal-data";

export const metadata = {
  title: "Terms and Conditions – Secure Your Hacks",
  description:
    "The terms governing your use of the Secure Your Hacks website and services.",
};

export default function TermsPage() {
  return <LegalPage content={termsAndConditions} />;
}
