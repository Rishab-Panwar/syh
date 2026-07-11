"use client";

import * as React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: "easeOut" },
};

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: 730, minHeight: 600, marginTop: 72 }}
    >
      {/* Background Video / Image */}
      <div className="absolute inset-0 z-0">
        {/* Fallback static image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://secureyourhacks.com/wp-content/uploads/2024/03/Screenshot-3.webp"
          alt="Cyber Security Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://secureyourhacks.com/wp-content/uploads/2024/03/Screenshot-3.webp"
        >
          <source
            src="https://upskillfinder.s3.ap-south-1.amazonaws.com/cdn/cyber-security-2023-11-27-05-34-42-utc.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1140px] px-6 md:px-10 flex flex-col items-center md:items-end text-center md:text-right">

        {/* Title */}
        <motion.div {...fadeInUp} className="mb-4">
          <h1 className="text-white text-3xl md:text-5xl lg:text-[52px] font-extrabold leading-tight md:leading-[52px] tracking-[0.06em] m-0">
            Secure Your Hacks
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-white text-lg md:text-xl lg:text-[22px] font-medium leading-relaxed tracking-[0.04em] drop-shadow-[0px_0px_10px_rgba(0,0,0,0.8)] m-0">
            The Right Approach to Cyber Security
          </h2>
        </motion.div>

        {/* Animated teal divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-20 h-[2px] bg-[#0cf9ce] mb-8 origin-right"
        />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="/contact"
            className="inline-block bg-[#0167f7] hover:bg-[#0056cc] text-white text-sm font-medium px-5 py-2.5 rounded-[3px] tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Talk to an Expert
          </a>
        </motion.div>
      </div>
    </section>
  );
}
