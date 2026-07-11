"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const CONTACT_DETAILS = [
  {
    id: "address",
    icon: MapPin,
    text: "445, AIHP Horizon, Udyog Vihar Phase V, Gurugram, Haryana – 122022",
  },
  {
    id: "phone",
    icon: Phone,
    text: "+91 8683833333",
  },
  {
    id: "email",
    icon: Mail,
    text: "care@secureyourhacks.com",
  },
];

const SOCIAL_LINKS = [
  {
    id: "facebook",
    href: "https://www.facebook.com/SecureYourHacks/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    id: "twitter",
    href: "https://x.com/SecureYourHacks",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/company/secure-your-hacks/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: "youtube",
    href: "https://www.youtube.com/@SecureYourHacks",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-[72px]">
      {/* Background image with dark blue overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://secureyourhacks.com/wp-content/uploads/2024/03/pexels-photo-1103970.jpeg")',
        }}
      >
        <div className="absolute inset-0 bg-[#1F365E] opacity-85" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-10 md:py-12">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12 max-w-7xl mx-auto">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col justify-center space-y-5"
          >
            <div className="space-y-2">
              <span className="text-white text-xs font-medium tracking-[0.2em] uppercase block">
                {"We'd love to hear from you"}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
                Contact Us
              </h1>
              <div className="w-12 h-1 bg-[#0167F7]" />
            </div>

            <div className="space-y-3 text-white/80 text-sm leading-relaxed max-w-lg">
              <p>
                Get in touch with our cybersecurity experts! Our team is here to answer your
                questions and address any concerns you may have.
              </p>
              <p>
                Speak with an expert: Connect directly with a cybersecurity professional for
                personalized advice.
              </p>
              <p>
                Request more information: Fill out our form to receive details about our products
                and services. {"We're"} here to help you stay secure!
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/70 text-sm font-medium tracking-wide">
                Reach us through
              </h3>
              <ul className="space-y-3">
                {CONTACT_DETAILS.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 group">
                    <div className="mt-0.5">
                      <item.icon className="w-4 h-4 text-[#0167F7] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-white/70 text-sm leading-snug tracking-wide">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0167F7] hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
                  aria-label={social.id}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right column: form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{
              boxShadow: [
                "0px 0px 0px rgba(1, 103, 247, 0)",
                "0px 0px 20px rgba(1, 103, 247, 0.1)",
                "0px 0px 0px rgba(1, 103, 247, 0)",
              ],
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              boxShadow: { repeat: Infinity, duration: 4 },
            }}
            viewport={{ once: true }}
            className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-normal text-white capitalize">
                  Send Us A Message
                </h2>
                <div className="w-10 h-[3px] bg-[#0167F7]" />
              </div>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/10 border border-transparent focus:border-[#0167F7] focus:ring-1 focus:ring-[#0167F7] text-white placeholder:text-white/50 px-5 py-3 rounded-full transition-all duration-300 outline-none text-sm"
                />
                <input
                  type="email"
                  placeholder="someone@example.com"
                  required
                  className="w-full bg-white/10 border border-transparent focus:border-[#0167F7] focus:ring-1 focus:ring-[#0167F7] text-white placeholder:text-white/50 px-5 py-3 rounded-full transition-all duration-300 outline-none text-sm"
                />
                <input
                  type="url"
                  placeholder="http://yourwebsite.com"
                  className="w-full bg-white/10 border border-transparent focus:border-[#0167F7] focus:ring-1 focus:ring-[#0167F7] text-white placeholder:text-white/50 px-5 py-3 rounded-full transition-all duration-300 outline-none text-sm"
                />
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="w-full bg-white/10 border border-transparent focus:border-[#0167F7] focus:ring-1 focus:ring-[#0167F7] text-white placeholder:text-white/50 px-5 py-3 rounded-2xl transition-all duration-300 outline-none resize-none text-sm"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#0167F7] hover:bg-[#0156d4] text-white font-medium py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-[#0167F7]/20"
                >
                  <span className="tracking-wider text-sm">Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
