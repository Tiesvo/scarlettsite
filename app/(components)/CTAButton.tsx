"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

interface CTAButtonProps {
  href: string;
  label: string;
}

export default function CTAButton({
  href,
  label,
  children,
}: PropsWithChildren<CTAButtonProps>) {
  const trackClick = async () => {
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buttonLabel: label,
          buttonHref: href,
        }),
      });
    } catch (error) {
      // Silently fail - don't block user navigation
      console.error("Failed to track click:", error);
    }
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick}
      className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-4 py-2 text-sm text-black ring-1 ring-black/10 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/70"
    >
      {children}
    </Link>
  );
}
