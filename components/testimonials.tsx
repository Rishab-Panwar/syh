"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    text: "We appreciate the effort and support you had extended by sharing the information on vulnerabilities on our API Manager and also suggesting the appropriate fixes to mitigate this vulnerability and security concerns. We look forward to again engage with you and your organization soon to further strengthen our cyber security posture.",
    name: "ANIL KUMAR NAIK",
    title: "Head IT Infrastructure and CyberSecurity, Kotak Securities",
    avatar: "AK",
  },
  {
    text: "We appreciate the effort and support you have demonstrated in getting the Vulnerability Assessment done on our websites and suggesting the appropriate fixes and mitigation techniques to address the security concerns. We sincerely thank you for your valuable feedback and support by suggesting fixes for the security gaps of our websites. The level of detail and accountability you have demonstrated was very helping and highly appreciable. Thank you once again for your support and guidance.",
    name: "PRAMOD KUMAR",
    title: "Head HR, Netplus",
    avatar: "PK",
  },
  {
    text: "Exceptional service in IT Compliance fulfillment! From the initial assessment to the implementation phase, Secure Your Hacks team provided clear guidance and support at every step. Their knowledge of compliance regulations is truly impressive, and their dedication to helping us achieve and maintain compliance is commendable. We are grateful for their expertise and commitment to excellence.",
    name: "APURV ABHAY MODI",
    title: "Founder and MD, ATechnos",
    avatar: "AM",
  },
  {
    text: "I am thoroughly impressed by the exceptional VAPT services your team provided, surpassing our expectations in safeguarding our digital infrastructure. I extend my heartfelt gratitude to your entire team and eagerly anticipate further collaboration in the future.",
    name: "SHAILENDRA TRIPATHI",
    title: "CTO - iCtrlBiz Consulting Pvt Ltd",
    avatar: "ST",
  },
  {
    text: "Secure Your Hacks has significantly transformed our organization's approach to cybersecurity. Through their comprehensive Vulnerability Assessment and Penetration Testing (VAPT) services, we have been able to detect and mitigate key security weaknesses effectively. Furthermore, their provision of virtual Chief Information Security Officer (vCISO) services has offered indispensable strategic insights, considerably enhancing our cybersecurity framework.",
    name: "VIKAS GOYAL",
    title: "Founder, Rupee112",
    avatar: "VG",
  },
  {
    text: "Secure Your Hacks is a game-changer! Their VAPT service uncovered vulnerabilities we never knew existed, ensuring our systems are secure. The vCISO service offered expert guidance, enhancing our cybersecurity strategy effervescently. With Secure Your Hacks, we feel protected and empowered. Highly recommended!",
    name: "KAUSHIK CHATTERJEE",
    title: "CEO, Lendingplate",
    avatar: "KC",
  },
  {
    text: "Exemplary VAPT and vCISO services from Secure Your Hacks! Their team's professionalism and commitment to our security have been instrumental in protecting our organization from cyber threats and ensuring regulatory compliance. Trust them with your security needs!",
    name: "RISHI KAPOOR",
    title: "Board Advisor, Bharat Loan",
    avatar: "RK",
  },
  {
    text: "Top-notch cybersecurity consultancy! They swiftly identified vulnerabilities and implemented robust measures. They conducted a comprehensive assessment of our systems, provided clear recommendations, and guided us through the implementation process. Highly recommended for their expertise and exceptional service.",
    name: "YOGESH SHARMA",
    title: "Founder and MD, Aastha Industries",
    avatar: "YS",
  },
  {
    text: "We are pleased with the IT Compliance solutions offered by Secure Your Hacks. Their comprehensive approach and attention to detail ensured that we met all necessary regulatory requirements with ease. A reliable choice for organizations seeking seamless compliance fulfillment.",
    name: "VINEET RELIA",
    title: "Managing Director, UrbanBriq",
    avatar: "VR",
  },
  {
    text: "Secure Your Hacks has provided exceptional service as our security consultant. Their prompt communication and extensive security knowledge have been instrumental in ensuring the success of our security initiatives.",
    name: "KULBIR SINGH",
    title: "Founder, Aiboard.io",
    avatar: "KS",
  },
  {
    text: "I am thoroughly impressed by the exceptional VAPT services your team provided, surpassing our expectations in safeguarding our digital infrastructure. I extend my heartfelt gratitude to your entire team and eagerly anticipate further collaboration in the future.",
    name: "SHAHROZ ALI",
    title: "Managing Director, Upskillfinder",
    avatar: "SA",
  },
];

const VISIBLE = 2;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
  ];

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-medium">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Read What Our{" "}
            <span className="text-[#1a6bff]">Clients Say About Us</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-400 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            {visible.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm"
              >
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a6bff] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-[#1a6bff] hover:text-white hover:border-[#1a6bff] transition-colors group z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-white" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center hover:bg-[#1a6bff] hover:text-white hover:border-[#1a6bff] transition-colors group z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-[#1a6bff] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
