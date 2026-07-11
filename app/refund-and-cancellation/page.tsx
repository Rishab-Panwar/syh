import LegalPage from "@/components/legal-page";
import { refundPolicy } from "@/lib/legal-data";

export const metadata = {
  title: "Refund and Cancellation – Secure Your Hacks",
  description:
    "Pricing, subscription, renewal, and refund terms for Secure Your Hacks purchases.",
};

export default function RefundPage() {
  return <LegalPage content={refundPolicy} />;
}
