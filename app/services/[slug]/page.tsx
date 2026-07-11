import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Users,
  Search,
  ClipboardList,
  Monitor,
  FileCode,
  GraduationCap,
  Globe,
  Activity,
  BarChart3,
  Check,
  ArrowRight,
  Bot,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/site-footer";
import { SERVICES, getService, getServiceSlugs } from "@/lib/services-data";

const ICONS: Record<string, LucideIcon> = {
  vciso: ShieldCheck,
  consultancy: Users,
  vapt: Search,
  "audit-compliance": ClipboardList,
  "edr-mdr-xdr": Monitor,
  "smart-contracts": FileCode,
  training: GraduationCap,
  osint: Globe,
  "managed-soc": Activity,
  grc: BarChart3,
};

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found – Secure Your Hacks" };
  return {
    title: `${service.title} – Secure Your Hacks`,
    description: service.tagline,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = ICONS[service.slug] ?? ShieldCheck;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="bg-[#07051d]" style={{ paddingTop: 72 }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(at 80% 0%, rgba(0, 63, 153, 0.45) 0%, rgb(7, 5, 29) 60%)",
          }}
        >
          {/* grid overlay */}
          <div
            className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-24">
            <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
              <Link href="/" className="hover:text-white/70 transition">
                Home
              </Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-white/70 transition">
                Services
              </Link>
              <span>/</span>
              <span className="text-white/70">{service.title}</span>
            </nav>

            <div className="flex flex-col items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0167f7]/15 ring-1 ring-[#0167f7]/30">
                <Icon className="h-8 w-8 text-[#0167f7]" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                  {service.title}
                </h1>
                <div className="mt-4 h-[3px] w-16 bg-[#0cf9ce]" />
                <p className="mt-5 max-w-2xl text-lg text-white/70">{service.tagline}</p>
              </div>
              <p className="max-w-3xl text-[15px] leading-relaxed text-white/60">
                {service.intro}
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0167f7] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0156d4]"
                >
                  Talk to an Expert
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/ask-vciso"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#0167f7]/40 bg-[#0167f7]/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0167f7]/20 hover:shadow-[0_0_18px_rgba(1,103,247,0.5)]"
                >
                  <Bot className="h-4 w-4 text-[#0167f7]" />
                  Ask SecureBot
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-6">
            {service.sections.map((sec) => (
              <div
                key={sec.heading}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-white">{sec.heading}</h2>
                {sec.body && (
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">{sec.body}</p>
                )}
                {sec.bullets && (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0167f7]/15">
                          <Check className="h-3 w-3 text-[#0167f7]" />
                        </span>
                        <span className="text-sm leading-snug text-white/70">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* CTA banner */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#0167f7]/30 bg-gradient-to-r from-[#0167f7]/15 to-transparent p-8 text-center md:p-10">
            <h3 className="text-2xl font-bold text-white">
              Ready to strengthen your security?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">
              Talk to a Secure Your Hacks expert about {service.title}, or ask our AI vCISO
              for instant guidance.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0167f7] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0156d4]"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ask-vciso"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/5"
              >
                <Bot className="h-4 w-4 text-[#0167f7]" />
                Ask SecureBot
              </Link>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="border-t border-white/10 bg-[#0a0824]">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-white/40">
              Explore other services
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {others.map((s) => {
                const OtherIcon = ICONS[s.slug] ?? ShieldCheck;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#0167f7]/40 hover:bg-[#0167f7]/[0.06]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0167f7]/15">
                        <OtherIcon className="h-4.5 w-4.5 text-[#0167f7]" strokeWidth={1.5} />
                      </span>
                      <span className="text-sm font-medium text-white">{s.title}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-[#0167f7]" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
