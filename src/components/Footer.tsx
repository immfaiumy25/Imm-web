import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Footer() {
  const settings = await prisma.siteSetting.findMany();
  const getVal = (key: string, defaultVal: string) => settings.find(s => s.key === key)?.value || defaultVal;

  const description = getVal("footer_description", "Wadah perkaderan mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta yang berlandaskan intelektualitas, religiusitas, dan humanitas.");
  const instagram = getVal("contact_instagram", "#");
  const email = getVal("contact_email", "");
  const whatsapp = getVal("contact_whatsapp", "#");
  const address = getVal("footer_address", "Gedung Ki Bagus Hadikusumo (G6), Kampus Terpadu UMY, Jl. Brawijaya, Kasihan, Bantul, Yogyakarta.");

  return (
    <footer id="kontak" className="bg-surface-container-highest pt-[var(--spacing-section-gap)] pb-12 rounded-t-[20px] shadow-[0px_-10px_30px_rgba(75,32,37,0.05)]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] grid grid-cols-1 md:grid-cols-4 gap-[var(--spacing-gutter)] mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-4 mb-8">
            <Image
              alt="Logo PK IMM FAI UMY"
              className="h-12 w-12 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBclyGHCaIA-wxM2ZFeetlfGM_rm9qHoTfDQua2X7vIFJk5V5jathrKiJOD1Bz8ClZcdcDwEEibGx2u7ncaFLpXWpK3sSZ-FhV6fGdadnaukX7JV0tyhCJv0Nt6FkwiEnJUOcwgYZECR0QpVKKZNVolh_dyBS-Fys0VkPweyjYBHejHEPZmgnMYfe3LrDoQI2roHnB2hNsR8egMiseJoNLLQL0sN6YRpSeC9S7L68kkF0EJdttv9HxQ"
              width={48}
              height={48}
            />
            <span className="font-headline-md text-headline-md font-bold text-primary">
              PK IMM FAI UMY
            </span>
          </div>
          <p className="text-on-surface-variant mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex gap-4">
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a href={email ? `mailto:${email}` : "#"} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">mail</span>
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">phone</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-8 text-lg">Navigasi</h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="#"
                className="text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 block"
              >
                Profil
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 block"
              >
                Bidang
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 block"
              >
                Dokumentasi
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 block"
              >
                Berita
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-8 text-lg">Tautan Cepat</h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="#"
                className="text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 block"
              >
                Kalender
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 block"
              >
                Agenda
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 block"
              >
                Kontak
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-on-surface-variant hover:text-[#f92727] font-medium transition-transform hover:translate-x-1 block"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-on-surface-variant hover:text-primary transition-transform hover:translate-x-1 block"
              >
                Join IMM
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-8 text-lg">Sekretariat</h4>
          <p className="text-on-surface-variant mb-6 whitespace-pre-line">
            {address}
          </p>
          <div className="w-full h-32 rounded-xl bg-surface-container overflow-hidden grayscale relative">
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary/30 text-4xl">
                map
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] pt-8 border-t border-outline-variant text-center">
        <p className="text-on-surface-variant font-body-md">
          © 2026 PK IMM FAI UMY. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
