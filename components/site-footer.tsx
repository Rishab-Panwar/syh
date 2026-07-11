import Link from "next/link";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/SecureYourHacks/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com/SecureYourHacks",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/secure-your-hacks/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SecureYourHacks",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
];

const serviceLinks = [
  { label: "VIRTUAL CISO (VCISO)", href: "/services/vciso" },
  { label: "Cyber Security Consultancy", href: "/services/consultancy" },
  { label: "VAPT", href: "/services/vapt" },
  { label: "Audit & Compliances", href: "/services/audit-compliance" },
  { label: "Corporate IT Training", href: "/services/training" },
  { label: "EDR, MDR, XDR", href: "/services/edr-mdr-xdr" },
  { label: "Smart Contracts", href: "/services/smart-contracts" },
  { label: "OSINT", href: "/services/osint" },
  { label: "Managed SOC", href: "/services/managed-soc" },
  { label: "GRC", href: "/services/grc" },
];

const quickLinks = [
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund and Cancellation", href: "/refund-and-cancellation" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  return (
    <footer className="bg-[#08081a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://secureyourhacks.com/wp-content/uploads/2024/03/Secure-Your-Hacks-Logo-A-947x1024.webp"
                alt="Secure Your Hacks Logo"
                className="h-[70px] w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#1a6bff] hover:border-[#1a6bff] hover:text-white transition-colors"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 tracking-widest">
              <span className="text-[#1a6bff]">[</span>{" SERVICES "}<span className="text-[#1a6bff]">]</span>
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-[#1a6bff] shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 tracking-widest">
              <span className="text-[#1a6bff]">[</span>{" QUICKS LINKS "}<span className="text-[#1a6bff]">]</span>
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-[#1a6bff] shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 tracking-widest">
              <span className="text-[#1a6bff]">[</span>{" GET IN TOUCH "}<span className="text-[#1a6bff]">]</span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#1a6bff] mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">+91 8683833333</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#1a6bff] mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">care@secureyourhacks.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1a6bff] mt-0.5 shrink-0" />
                <span className="text-sm text-white/60 leading-relaxed">
                  445, AIHP Horizon, Udyog Vihar Phase V, Gurugram, Haryana – 122022
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-sm text-white/40">
            Copyright&copy; 2025 Secureyourhacks, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
