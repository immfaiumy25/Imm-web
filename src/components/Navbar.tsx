"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Profil", href: "#profil" },
    { name: "Bidang", href: "#bidang" },
    { name: "Dokumentasi", href: "#dokumentasi" },
    { name: "Berita", href: "#berita" },
    { name: "Kalender", href: "#kalender" },
    { name: "Kontak", href: "#kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled h-20" : "bg-transparent h-24"
      }`}
    >
      <div className="flex justify-between items-center max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] w-full h-full">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            alt="Logo PK IMM FAI UMY"
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBclyGHCaIA-wxM2ZFeetlfGM_rm9qHoTfDQua2X7vIFJk5V5jathrKiJOD1Bz8ClZcdcDwEEibGx2u7ncaFLpXWpK3sSZ-FhV6fGdadnaukX7JV0tyhCJv0Nt6FkwiEnJUOcwgYZECR0QpVKKZNVolh_dyBS-Fys0VkPweyjYBHejHEPZmgnMYfe3LrDoQI2roHnB2hNsR8egMiseJoNLLQL0sN6YRpSeC9S7L68kkF0EJdttv9HxQ"
            width={48}
            height={48}
          />
          <span className="font-headline-md text-sm md:text-lg font-bold text-black uppercase tracking-tight">
            PK IMM FAI UMY
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`font-label-md text-label-md uppercase tracking-wider transition-all ${
                i === 0
                  ? "text-secondary font-bold border-b-2 border-secondary"
                  : "text-black hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="#join" className="bg-tertiary text-on-tertiary px-6 py-2 rounded-full font-label-md hover:opacity-90 transition-all">
            Join IMM
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-black p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-t border-black/10 flex flex-col py-4">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-[var(--spacing-margin-desktop)] py-4 text-black hover:bg-black/5 font-bold tracking-wider uppercase border-b border-black/5"
            >
              {link.name}
            </Link>
          ))}
          <div className="px-[var(--spacing-margin-desktop)] py-6 flex flex-col">
            <Link href="#join" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-tertiary text-on-tertiary px-6 py-3 rounded-full font-bold uppercase tracking-wider hover:opacity-90 transition-all text-center">
              Join IMM
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
