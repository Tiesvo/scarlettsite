"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { content } from "./_data/content";
import CTAButton from "./(components)/CTAButton";
import BrandBadge from "./(components)/BrandBadge";
import MarqueeStrip from "./(components)/MarqueeStrip";

export default function Page() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden">
      {/* background + dim */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-5 pt-[9vh]">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-4"
        >
          <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden ring-2 ring-white/40 shadow-lg">
            <Image
              src="/profile.jpg"
              alt={content.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 140px, 180px"
              priority
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-fluid-4xl sm:text-fluid-5xl font-bold text-white drop-shadow-lg mb-2"
        >
          {content.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-fluid-base sm:text-fluid-lg text-white drop-shadow-md mb-6 text-center"
        >
          {content.tagline.split("spicy").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="text-red-500 font-semibold">spicy</span>
              )}
            </span>
          ))}
        </motion.p>

        {/* CTAs in vertical stack: F2F and Telegram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-col items-center gap-3 w-full max-w-md"
        >
          <CTAButton href={content.ctas[0].href} label={content.ctas[0].label}>
            <BrandBadge brand={content.ctas[0].brand as any} />
            <span className="font-medium">{content.ctas[0].label}</span>
          </CTAButton>

          {/* F2F */}
          <CTAButton href={content.ctas[1].href} label={content.ctas[0].label}>
            <BrandBadge brand={content.ctas[1].brand as any} />
            <span className="font-medium">{content.ctas[1].label}</span>
          </CTAButton>

          {/* Telegram */}
	</motion.div> 
        {/* Moving strip (directly under CTAs) */}
        <div className="mt-12 w-full">
          <MarqueeStrip images={content.gallery} />
        </div>
      </div>
    </main>
  );
}
