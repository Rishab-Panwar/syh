"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight, Bot, PhoneCall, Gauge, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceLink {
  label: string;
  slug: string;
}

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  services?: ServiceLink[];
  highlight?: boolean;
  icon?: LucideIcon;
  badge?: string;
  tooltip?: string;
}

const SERVICES: ServiceLink[] = [
  { label: "VIRTUAL CISO (VCISO)", slug: "vciso" },
  { label: "Cyber Security Consultancy", slug: "consultancy" },
  { label: "VAPT", slug: "vapt" },
  { label: "Audit & Compliances", slug: "audit-compliance" },
  { label: "Corporate IT Training", slug: "training" },
  { label: "EDR, MDR, XDR", slug: "edr-mdr-xdr" },
  { label: "Smart Contracts", slug: "smart-contracts" },
  { label: "OSINT", slug: "osint" },
  { label: "Managed SOC", slug: "managed-soc" },
  { label: "GRC", slug: "grc" },
];

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", isActive: true },
  { label: "Services", href: "/", hasDropdown: true, services: SERVICES },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
  {
    label: "Ask SecureBot",
    href: "/ask-vciso",
    highlight: true,
    icon: Bot,
    badge: "new",
    tooltip: "Ask our AI advisor about security & compliance",
  },
  {
    label: "Phishing Drill",
    href: "/phishing-drill",
    highlight: true,
    icon: PhoneCall,
    badge: "new",
    tooltip: "See if you can resist a live AI scam call",
  },
  {
    label: "Risk Agent",
    href: "/risk-assessment",
    highlight: true,
    icon: Gauge,
    badge: "new",
    tooltip: "Instantly score any vendor's security risk",
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-[#021938] border-b border-white/5 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-[72px] flex items-center">

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105 duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://secureyourhacks.com/wp-content/uploads/2024/03/Secure-Your-Hacks-Logo-A-947x1024.webp"
              alt="Secure Your Hacks"
              className="h-[52px] w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation - sits immediately after the logo */}
        <nav className="hidden lg:flex items-center gap-0.5 ml-4">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={cn("relative group", item.highlight && "ml-4")}
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.hasDropdown ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === item.label ? null : item.label)
                  }
                  className={cn(
                    "px-3 py-2 text-[15px] font-medium transition-colors flex items-center gap-1.5 rounded-md",
                    item.isActive ? "text-white" : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      activeDropdown === item.label ? "rotate-180" : ""
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-[15px] font-medium transition-all duration-300 flex items-center gap-1.5 rounded-md",
                    item.highlight
                      ? "relative text-white bg-[#0167f7]/15 ring-1 ring-[#0167f7]/40 hover:bg-[#f5c518]/10 hover:ring-[#f5c518]/70 hover:shadow-[0_0_20px_rgba(245,197,24,0.55)]"
                      : item.isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4 text-[#0167f7]" />}
                  {item.label}
                  {item.badge && (
                    <span className="absolute -top-2.5 -right-2.5 rotate-12 rounded-md bg-[#f5c518] px-1.5 py-0.5 text-[10px] font-extrabold uppercase leading-none tracking-wider text-[#021938] shadow-md shadow-black/40 ring-2 ring-[#021938]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}

              {item.tooltip && (
                <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#021938] px-3 py-1.5 text-xs text-white/80 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                  {item.tooltip}
                </div>
              )}

              {item.hasDropdown && (
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-0 pt-2 w-[280px] z-50"
                    >
                      <div className="bg-[#021938] border border-white/10 shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="px-5 py-3 border-b border-white/10">
                          <span className="text-[#0167f7] font-bold text-sm tracking-widest">[ </span>
                          <span className="text-white font-bold text-sm tracking-widest">SERVICES</span>
                          <span className="text-[#0167f7] font-bold text-sm tracking-widest"> ]</span>
                        </div>
                        {/* Service list */}
                        <ul className="py-2">
                          {item.services?.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}`}
                                className="flex items-center gap-2 px-5 py-2 text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                <ChevronRight className="w-3.5 h-3.5 text-[#0167f7] shrink-0" />
                                {service.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Toggle - pushed to the far right */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden ml-auto p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#021938] border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <div
                    className="flex items-center justify-between text-white/90 font-medium text-lg py-2 cursor-pointer"
                    onClick={() =>
                      item.hasDropdown &&
                      setActiveDropdown(activeDropdown === item.label ? null : item.label)
                    }
                  >
                    {item.hasDropdown ? (
                      <span className="flex items-center gap-2">{item.label}</span>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon && <item.icon className="w-5 h-5 text-[#0167f7]" />}
                        {item.label}
                        {item.badge && (
                          <span className="rotate-6 rounded-md bg-[#f5c518] px-1.5 py-0.5 text-[10px] font-extrabold uppercase leading-none tracking-wider text-[#021938] shadow-md shadow-black/40">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 transition-transform",
                          activeDropdown === item.label ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </div>
                  {item.hasDropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pl-4 mt-2 space-y-1 border-l border-white/10"
                    >
                      {item.services?.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="flex items-center gap-2 py-1.5"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-[#0167f7] shrink-0" />
                          <span className="text-white/70 text-sm">{service.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
