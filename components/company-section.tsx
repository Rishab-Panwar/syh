"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Compass, Cpu, GraduationCap, CheckCircle2 } from "lucide-react";

const PILLARS = [
  {
    icon: Compass,
    title: "Expert Advisory",
    body: "Seasoned professionals help you navigate complex cybersecurity challenges and translate security objectives into practical implementations.",
  },
  {
    icon: Cpu,
    title: "Deep-Tech Solutions",
    body: "We harness the latest technological advancements to defend your organization against emerging and evolving threats.",
  },
  {
    icon: GraduationCap,
    title: "World-Class Training",
    body: "We develop your organization's security capabilities from within, turning your people into your strongest line of defense.",
  },
];

const WHY_CHOOSE = [
  "A proven track record across diverse industries",
  "A collaborative style focused on understanding your unique needs",
  "Adoption of the latest security technologies against emerging threats",
  "Dedication to service excellence and surpassing expectations",
];

export default function CompanySection() {
  return (
    <>
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#07051d] selection:bg-blue-500/30"
      style={{ paddingTop: 72 }}
    >
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(at 100% 50%, rgb(0, 63, 153) 0%, rgb(7, 5, 29) 100%)",
        }}
      />

      {/* Decorative blurs */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 md:px-10 lg:px-20 max-w-[1140px]">
        <div className="flex flex-col items-start text-left space-y-6">

          {/* Tagline + animated divider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start gap-4"
          >
            <span className="text-[#0167f7] font-semibold text-sm md:text-base tracking-[0.2em] uppercase">
              Secure Your Hacks
            </span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 110 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
              className="h-[2.4px] bg-white"
            />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="max-w-5xl text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-[#0167f7] tracking-tight whitespace-nowrap"
          >
            The Trusted Partner for Your Cybersecurity Journey
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="text-white text-sm md:text-[15px] font-normal leading-relaxed tracking-wide">
              Secure Your Hacks IT Private Limited is your one-stop for all your
              cybersecurity needs, offering expert guidance and advanced solutions
              to businesses navigating the ever-present dangers of the digital world.
            </p>
          </motion.div>


        </div>
      </div>
    </section>

      {/* Mission + pillars + why-choose */}
      <section className="relative w-full bg-[#07051d] py-20 px-6 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          {/* Mission */}
          <div className="max-w-3xl">
            <span className="text-[#0167f7] font-semibold text-sm tracking-[0.2em] uppercase">
              Our Mission
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white">
              Building a More Secure Digital World
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60">
              Secure Your Hacks IT Private Limited is your one-stop for all your cybersecurity
              needs. Our team of security professionals brings extensive technical backgrounds
              across multiple domains, becoming an extension of your team and translating your
              security objectives into practical, effective implementations.
            </p>
          </div>

          {/* Pillars */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0167f7]/15 ring-1 ring-[#0167f7]/30">
                    <Icon className="h-6 w-6 text-[#0167f7]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{p.body}</p>
                </div>
              );
            })}
          </div>

          {/* Why choose us */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h3 className="text-xl font-bold text-white">Why Choose Secure Your Hacks</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {WHY_CHOOSE.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0167f7]" />
                  <span className="text-sm leading-snug text-white/70">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
