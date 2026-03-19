"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer"
          aria-label="맨 위로 이동"
        >
          <Image
            src="/logo.png"
            alt="ListeningMind"
            width={160}
            height={25}
            className="h-6 sm:h-7 w-auto"
            priority
          />
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
<a
            href="#contact"
            className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
          >
            상담 신청하기
          </a>
        </div>
      </div>
    </nav>
  );
}
