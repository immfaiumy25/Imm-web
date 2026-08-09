"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 h-20 transition-all duration-300 flex items-center ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] w-full">
        <div className="flex items-center gap-4">
          <Image
            alt="Logo PK IMM FAI UMY"
            className="h-12 w-12 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBclyGHCaIA-wxM2ZFeetlfGM_rm9qHoTfDQua2X7vIFJk5V5jathrKiJOD1Bz8ClZcdcDwEEibGx2u7ncaFLpXWpK3sSZ-FhV6fGdadnaukX7JV0tyhCJv0Nt6FkwiEnJUOcwgYZECR0QpVKKZNVolh_dyBS-Fys0VkPweyjYBHejHEPZmgnMYfe3LrDoQI2roHnB2hNsR8egMiseJoNLLQL0sN6YRpSeC9S7L68kkF0EJdttv9HxQ"
            width={48}
            height={48}
          />
          <span className="font-headline-md text-headline-md font-bold text-white uppercase tracking-tight">
            PK IMM FAI UMY
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold border-b-2 border-secondary"
            href="#"
          >
            Home
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-wider text-white hover:text-secondary-fixed transition-all"
            href="#"
          >
            Profil
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-wider text-white hover:text-secondary-fixed transition-all"
            href="#"
          >
            Bidang
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-wider text-white hover:text-secondary-fixed transition-all"
            href="#"
          >
            Dokumentasi
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-wider text-white hover:text-secondary-fixed transition-all"
            href="#"
          >
            Berita
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-wider text-white hover:text-secondary-fixed transition-all"
            href="#"
          >
            Kalender
          </Link>
          <Link
            className="font-label-md text-label-md uppercase tracking-wider text-white hover:text-secondary-fixed transition-all"
            href="#"
          >
            Kontak
          </Link>
          <button className="bg-tertiary text-on-tertiary px-6 py-2 rounded-full font-label-md hover:opacity-90 transition-all">
            Join IMM
          </button>
        </div>
      </div>
    </nav>
  );
}
