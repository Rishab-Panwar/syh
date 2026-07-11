import Navbar from "@/components/navbar";
import CompanySection from "@/components/company-section";
import Footer from "@/components/site-footer";

export const metadata = {
  title: "Company – Secure Your Hacks",
  description:
    "Secure Your Hacks IT Private Limited is your trusted cybersecurity partner offering expert guidance and advanced solutions.",
};

export default function CompanyPage() {
  return (
    <>
      <Navbar />
      <main>
        <CompanySection />
      </main>
      <Footer />
    </>
  );
}
