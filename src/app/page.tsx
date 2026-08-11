"use client";

import { useState, useEffect, useRef } from "react";
import { DisableZoom } from "@/components/DisableZoom";
import SpotlightCard from "@/components/SpotlightCard";
import CardSwap, { Card } from "@/components/CardSwap";
import MagicBento from "@/components/MagicBento";
import BorderGlow from "@/components/BorderGlow";
import IMMCalendar from "@/components/IMMCalendar";
import TypewriterText from "@/components/TypewriterText";
import Link from 'next/link';

const bidangData = [
  { name: "Organisasi", desc: "Penguatan sistem manajemen internal.", icon: "account_tree" },
  { name: "Kaderisasi", desc: "Pusat pengembangan kader unggul.", icon: "groups" },
  { name: "RPK", desc: "Riset dan Pengembangan Keilmuan.", icon: "science" },
  { name: "Hikmah", desc: "Gerakan politik dan advokasi sosial.", icon: "policy" },
  { name: "TKK", desc: "Tabligh dan Kajian Keislaman.", icon: "mosque" },
  { name: "SPM", desc: "Sosial Pemberdayaan Masyarakat.", icon: "volunteer_activism" },
  { name: "SBO", desc: "Seni, Budaya, dan Olahraga.", icon: "palette" },
  { name: "IMMawati", desc: "Pemberdayaan dan isu perempuan.", icon: "woman" },
  { name: "Ekonomi", desc: "Kewirausahaan dan kemandirian.", icon: "payments" },
  { name: "Medkom", desc: "Media, Komunikasi, dan Informasi.", icon: "podcasts" },
];

export default function Home() {
  const [navbarTheme, setNavbarTheme] = useState('dark');
  const [activeSectionTitle, setActiveSectionTitle] = useState('PK IMM FAI UMY');
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const isIntroLockedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // 1. Intro Animation Logic
      const introMaxScroll = window.innerHeight * 0.65;
      let progress = scrollY / introMaxScroll;
      
      if (progress >= 1) {
        isIntroLockedRef.current = true;
      }
      
      if (isIntroLockedRef.current) {
        progress = 1;
      } else {
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
      }
      
      if (heroRef.current) {
        heroRef.current.style.setProperty('--intro-progress', progress.toString());
      }
      
      if (progress >= 1) {
        setIsIntroFinished(true);
      } else {
        setIsIntroFinished(false);
      }

      // 2. Navbar Theme & Title Logic
      // Check which section is currently at the top of the viewport
      // Ordered from bottom to top so the first one that is at the top is the current section
      const sections = [
        { id: 'kontak', theme: 'light', title: 'Kontak Kami' },
        { id: 'kalender', theme: 'dark', title: 'Kalender Kegiatan' },
        { id: 'berita', theme: 'light', title: 'Berita & Artikel' },
        { id: 'dokumentasi', theme: 'light', title: 'Dokumentasi' },
        { id: 'bidang', theme: 'dark', title: 'Bidang Organisasi' },
        { id: 'profile', theme: 'light', title: 'Profil Kami' },
        { id: 'home', theme: 'dark', title: 'PK IMM FAI UMY' }
      ];

      let currentTheme = 'dark'; // Default for hero (dark bg -> white text)
      let currentTitle = 'PK IMM FAI UMY';

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          currentTheme = section.theme;
          currentTitle = section.title;
          break; // Stop at the first section that is at the top
        }
      }

      setNavbarTheme(currentTheme);
      setActiveSectionTitle(currentTitle);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      
      {/* SVG Filter for Liquid Glass Effect */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="liquid-glass">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* =======================
          FIXED NAVBAR
          ======================= */}
      <div className={`fixed top-4 left-0 right-0 w-full px-4 md:px-[26px] z-50 transition-all duration-700 ease-in-out ${isIntroFinished ? 'translate-y-0 opacity-100 pointer-events-none' : '-translate-y-12 opacity-0 pointer-events-none'}`}>
        <nav 
          className="pointer-events-auto h-[60px] px-8 md:px-[60px] flex items-center justify-between max-w-[1450px] w-full mx-auto rounded-[26px] border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
          style={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'url(#liquid-glass) blur(16px)', 
            WebkitBackdropFilter: 'url(#liquid-glass) blur(16px)' 
          }}
        >
          <div className={`flex items-center gap-3 font-medium tracking-[-0.02em] text-base md:text-lg transition-colors duration-300 ${navbarTheme === 'light' ? 'text-[#280000]' : 'text-white drop-shadow-md'}`}>
            <img src="/logo.png" alt="IMM Logo" className="w-[56px] h-[56px] object-contain drop-shadow-md" />
            <span className="transition-all duration-300 w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{activeSectionTitle}</span>
          </div>
          
          {/* Navbar Links */}
          <div className={`hidden md:flex items-center gap-6 font-normal text-sm tracking-wide transition-colors duration-300 ${navbarTheme === 'light' ? 'text-[#280000] font-medium' : 'text-white drop-shadow-md'}`}>
            <a href="#home" className="hover:opacity-70 transition-opacity">Home</a>
            <a href="#profile" className="hover:opacity-70 transition-opacity">Profile</a>
            <a href="#bidang" className="hover:opacity-70 transition-opacity">Bidang</a>
            <a href="#dokumentasi" className="hover:opacity-70 transition-opacity">Dokumentasi</a>
            <a href="#berita" className="hover:opacity-70 transition-opacity">Berita</a>
            <a href="#kalender" className="hover:opacity-70 transition-opacity">Kalender</a>
            <Link href="/creative-minority" className="hover:opacity-70 transition-opacity">Creative Minority</Link>
            <a href="#kontak" className="hover:opacity-70 transition-opacity">Kontak</a>
          </div>
          
          <button className={`pointer-events-auto rounded-[10px] px-[16px] py-[8px] text-sm font-normal backdrop-blur-md shadow-lg transition-all duration-300 ${navbarTheme === 'light' ? 'bg-[#280000] text-white hover:bg-[#6d0100]' : 'bg-white/20 border border-white/40 text-white hover:bg-white/30 drop-shadow-md'}`}>
            Join IMM
          </button>
        </nav>
      </div>

      {/* =======================
          HOME SECTION (Gradient)
          ======================= */}
      <section id="home" className="relative w-full block bg-[linear-gradient(145deg,#6d0100_0%,#a90a05_40%,#f92727_65%,#f8cf0f_100%)] text-white pt-32">

        {/* Scroll Track */}
        <div className="h-[160vh]">
          {/* Liquid Glass Hero Card - Pinned during intro */}
          <div className="sticky top-[128px] w-full p-4 md:p-[26px] flex items-center justify-center z-10" style={{ height: 'calc(100vh - 128px)' }}>
          <div 
            ref={heroRef}
            className="mx-auto rounded-[32px] border border-white/20 shadow-2xl flex flex-col justify-center items-center text-center overflow-hidden relative"
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'url(#liquid-glass) blur(16px)', 
              WebkitBackdropFilter: 'url(#liquid-glass) blur(16px)',
              width: `calc(250px + (100% - 250px) * var(--intro-progress, 0))`,
              maxWidth: `calc(250px + (1450px - 250px) * var(--intro-progress, 0))`,
              height: `calc(250px + (100% - 250px) * var(--intro-progress, 0))`
            }}
          >
            
            {/* SCROLL UP TEXT (Visible only when small) */}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center font-normal tracking-widest text-lg md:text-xl text-white pointer-events-none"
              style={{ opacity: `calc(1 - (var(--intro-progress, 0) * 2))` }}
            >
              <span className="animate-bounce mb-2">↓</span>
              SCROLL UP
            </div>

            {/* REAL CONTENT (Fades in as it expands) */}
            <div 
              className="w-full h-full flex flex-col justify-center items-center p-8 md:p-12 absolute inset-0"
              style={{ 
                opacity: `var(--intro-progress, 0)`,
                transform: `scale(calc(0.9 + 0.1 * var(--intro-progress, 0)))`,
                pointerEvents: isIntroFinished ? 'auto' : 'none'
              }}
            >
              <h1 className="font-serif text-5xl md:text-7xl font-normal leading-tight tracking-tight mb-6">
                <TypewriterText text="Bergerak Bersama " />
                <br className="hidden md:block"/>
                <TypewriterText text="Berkarya untuk Peradaban" />
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-[700px] font-light mb-10 min-h-[150px] md:min-h-[120px]">
                <TypewriterText text="Pimpinan Komisariat Ikatan Mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta adalah wadah perkaderan yang progresif, mengintegrasikan intelektualitas, spiritualitas, dan humanitas untuk membangun generasi emas masa depan." />
              </p>

            </div>

          </div>
        </div>
        </div>
      </section>

      {/* ========================
          PROFILE SECTION (White)
          ======================== */}
      <section id="profile" className="relative w-full bg-white text-[#280000] p-8 md:px-[60px] pb-[100px] md:pb-[200px] flex flex-col items-center justify-start pt-24 md:pt-32">
        <div className="relative z-10 w-full max-w-[1450px] mx-auto text-center flex flex-col items-center gap-16 md:gap-24">
          
          <div className="flex flex-col items-center max-w-[1000px]">
            <h2 className="font-serif text-4xl md:text-6xl font-normal leading-tight tracking-tight mb-6 text-[#6d0100]">
              Menciptakan Kader Berintelektual Tinggi & Berakhlak Mulia
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-700">
              Ikatan Mahasiswa Muhammadiyah (IMM) adalah organisasi otonom Muhammadiyah yang bergerak di bidang keagamaan, kemahasiswaan, dan kemasyarakatan. PK IMM FAI UMY berkomitmen untuk menjadi inkubator kepemimpinan yang berlandaskan Trilogi IMM: Keagamaan, Kemahasiswaan, dan Kemasyarakatan.
            </p>
          </div>
          
          <div className="w-full">
            <img 
              src="/Profileimm.jpg" 
              alt="Profile IMM FAI UMY" 
              className="w-full h-auto max-h-[80vh] object-cover rounded-[32px] shadow-2xl"
            />
          </div>

          <div className="w-full mt-10">
            <h3 className="font-serif text-3xl md:text-4xl font-normal mb-12 text-[#6d0100] text-center md:text-left">Anggota & Pengurus</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
              
              {/* Organic Blob Portrait 1 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                <div className="relative w-48 h-48 flex-shrink-0 flex items-end justify-center">
                  {/* Organic Blob Background */}
                  <div 
                    className="absolute inset-0 bg-[linear-gradient(135deg,#6d0100,#f92727)] transition-all duration-500 group-hover:scale-105"
                    style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                  ></div>
                  <div className="relative z-10 w-[90%] h-[120%] flex items-end justify-center">
                    <img 
                      src="/pengurus-4.png" 
                      alt="Foto Ketua Umum" 
                      className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-8">
                  <h4 className="font-serif text-2xl font-normal text-[#280000]">Agung Rezki</h4>
                  <p className="text-[#6d0100] font-medium text-lg">Ketua Umum <span className="text-sm font-normal text-gray-500">(PAI 23)</span></p>
                  <p className="text-gray-500 mt-2 text-sm max-w-[250px]">
                    Bertanggung jawab atas seluruh kegiatan manajerial dan operasional PK IMM FAI UMY.
                  </p>
                </div>
              </div>

              {/* Organic Blob Portrait 2 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                <div className="relative w-48 h-48 flex-shrink-0 flex items-end justify-center">
                  <div 
                    className="absolute inset-0 bg-[linear-gradient(135deg,#f8cf0f,#f7aa09)] transition-all duration-500 group-hover:scale-105"
                    style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
                  ></div>
                  <div className="relative z-10 w-[90%] h-[120%] flex items-end justify-center">
                    <img 
                      src="/pengurus-3.png" 
                      alt="Foto Sekum" 
                      className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-8">
                  <h4 className="font-serif text-2xl font-normal text-[#280000]">Zulfa Safinatun Najwa</h4>
                  <p className="text-[#f7aa09] font-medium text-lg">Sekretaris Umum <span className="text-sm font-normal text-gray-500">(KPI 23)</span></p>
                  <p className="text-gray-500 mt-2 text-sm max-w-[250px]">
                    Mengurus administrasi, korespondensi, dan pengarsipan data organisasi.
                  </p>
                </div>
              </div>

              {/* Organic Blob Portrait 3 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                <div className="relative w-48 h-48 flex-shrink-0 flex items-end justify-center">
                  <div 
                    className="absolute inset-0 bg-[linear-gradient(135deg,#6d0100,#f92727)] transition-all duration-500 group-hover:scale-105"
                    style={{ borderRadius: '50% 50% 40% 60% / 60% 40% 70% 50%' }}
                  ></div>
                  <div className="relative z-10 w-[90%] h-[120%] flex items-end justify-center">
                    <img 
                      src="/pengurus-1.png" 
                      alt="Foto Sek 1" 
                      className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-8">
                  <h4 className="font-serif text-2xl font-normal text-[#280000]">Safira Dewi Maharani</h4>
                  <p className="text-[#6d0100] font-medium text-lg">Sekretaris Satu <span className="text-sm font-normal text-gray-500">(Eksya 23)</span></p>
                  <p className="text-gray-500 mt-2 text-sm max-w-[250px]">
                    Membantu Sekretaris Umum dalam mengelola kesekretariatan dan pendataan.
                  </p>
                </div>
              </div>

              {/* Organic Blob Portrait 4 */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                <div className="relative w-48 h-48 flex-shrink-0 flex items-end justify-center">
                  <div 
                    className="absolute inset-0 bg-[linear-gradient(135deg,#ffcfcf,#f92727)] transition-all duration-500 group-hover:scale-105"
                    style={{ borderRadius: '70% 30% 50% 50% / 30% 60% 40% 70%' }}
                  ></div>
                  <div className="relative z-10 w-[90%] h-[120%] flex items-end justify-center">
                    <img 
                      src="/pengurus-2.png" 
                      alt="Foto Bendum" 
                      className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-8">
                  <h4 className="font-serif text-2xl font-normal text-[#280000]">Alia Ghaza Partasti</h4>
                  <p className="text-[#f92727] font-medium text-lg">Bendahara Umum <span className="text-sm font-normal text-gray-500">(Eksya 23)</span></p>
                  <p className="text-gray-500 mt-2 text-sm max-w-[250px]">
                    Mengelola sirkulasi keuangan organisasi dan pembukuan anggaran kepanitiaan.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </section>

      {/* ========================
          BIDANG SECTION
          ======================== */}
      <section 
        id="bidang" 
        className="relative w-full min-h-[70vh] text-white p-8 md:p-[60px] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f8cf0f 0%, #f7aa09 15%, #f92727 55%, #c71212 100%)' }}
      >
        <h2 className="relative z-10 font-serif text-4xl md:text-6xl font-normal mb-12 text-white">Bidang</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full max-w-[1450px]">
          {bidangData.map((bidang, i) => (
            <SpotlightCard 
              key={i} 
              className="p-8 flex flex-col justify-between group cursor-pointer h-full bg-white/20 border-white/30 shadow-[0_8px_32px_0_rgba(109,1,0,0.37)]" 
              spotlightColor="rgba(255, 255, 255, 0.25)"
              style={{
                backdropFilter: 'url(#liquid-glass) blur(16px)',
                WebkitBackdropFilter: 'url(#liquid-glass) blur(16px)'
              }}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined text-3xl text-white">{bidang.icon}</span>
                </div>
                <h3 className="text-2xl font-serif font-normal text-white mb-3">{bidang.name}</h3>
                <p className="text-white/90 font-light leading-relaxed">{bidang.desc}</p>
              </div>
              
              <div className="mt-8 flex items-center text-white font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Detail</span>
                <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ========================
          DOKUMENTASI SECTION (White)
          ======================== */}
      <section id="dokumentasi" className="w-full min-h-[80vh] bg-white text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center overflow-hidden">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-12 text-[#6d0100] text-center">Dokumentasi</h2>
        
        <div className="w-full max-w-[1200px] mx-auto relative z-10 flex justify-center">
          <MagicBento 
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={15}
            glowColor="109, 1, 0"
          />
        </div>
      </section>

      {/* ========================
          BERITA SECTION (Gray)
          ======================== */}
      <section id="berita" className="w-full min-h-[70vh] bg-[#f8f9fa] text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-12 text-[#6d0100] text-center">Berita & Artikel</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px] relative z-10">
          {/* Card 1 */}
          <a 
            href="https://share.google/ldoJxY0qIybghHsc9"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full rounded-[24px] flex flex-col hover:scale-105 hover:shadow-2xl shadow-xl transition-all cursor-pointer overflow-hidden group"
            style={{ 
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'url(#liquid-glass) blur(16px)',
              WebkitBackdropFilter: 'url(#liquid-glass) blur(16px)',
              border: '1px solid rgba(255, 255, 255, 1)'
            }}
          >
            <div className="w-full h-48 relative overflow-hidden bg-gray-200">
              <img src="/berita/berita-1.jpg" alt="Kompas Profetik ISP" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs font-normal text-gray-500 tracking-wider mb-3">Kabar Muhammadiyah</div>
              <h3 className="text-xl font-serif text-[#280000] mb-3 line-clamp-2 leading-snug">Menata Ulang Kompas Profetik: Penyusunan Alat Ukur Implementasi ISP dalam Grand Design PK IMM FAI UMY</h3>
              <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-6 font-normal">
                Agenda penyusunan alat ukur implementasi Ideologi, Strategi, dan Taktik Perjuangan (ISP) dalam kerangka Grand Design pergerakan komisariat.
              </p>
              <div className="text-xs text-gray-500 font-normal flex items-center justify-between">
                <span>7 Juli 2026</span>
                <span>Baca</span>
              </div>
            </div>
          </a>

          {/* Card 2 */}
          <a 
            href="https://rri.co.id/yogyakarta/budaya/2590526/dahlan-culture-festival-2026-perkuat-dakwah-kultural-lewat-sastra-profetik?nocache=true"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full rounded-[24px] flex flex-col hover:scale-105 hover:shadow-2xl shadow-xl transition-all cursor-pointer overflow-hidden group"
            style={{ 
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'url(#liquid-glass) blur(16px)',
              WebkitBackdropFilter: 'url(#liquid-glass) blur(16px)',
              border: '1px solid rgba(255, 255, 255, 1)'
            }}
          >
            <div className="w-full h-48 relative overflow-hidden bg-gray-200">
              <img src="/berita/berita-2.webp" alt="Dahlan Culture Festival" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs font-normal text-gray-500 tracking-wider mb-3">RRI Budaya</div>
              <h3 className="text-xl font-serif text-[#280000] mb-3 line-clamp-2 leading-snug">Dahlan Culture Festival 2026 Perkuat Dakwah Kultural lewat Sastra Profetik</h3>
              <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-6 font-normal">
                IMM FAI UMY menggelar Dahlan Culture Festival 2026 sebagai ruang ekspresi bagi kader se-DIY untuk mengaktualisasikan kreativitas dan memperkuat dakwah kultural melalui sastra profetik.
              </p>
              <div className="text-xs text-gray-500 font-normal flex items-center justify-between">
                <span>23 Juli 2026</span>
                <span>Baca</span>
              </div>
            </div>
          </a>

          {/* Card 3 */}
          <a 
            href="https://wartaptm.id/imm-fai-umy-luncurkan-majalah-bahlil-angkat-isu-perempuan-lewat-studium-generale/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full rounded-[24px] flex flex-col hover:scale-105 hover:shadow-2xl shadow-xl transition-all cursor-pointer overflow-hidden group"
            style={{ 
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'url(#liquid-glass) blur(16px)',
              WebkitBackdropFilter: 'url(#liquid-glass) blur(16px)',
              border: '1px solid rgba(255, 255, 255, 1)'
            }}
          >
            <div className="w-full h-48 relative overflow-hidden bg-gray-200">
              <img src="/berita/berita-3.jpg" alt="Majalah BAHL1L" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs font-normal text-gray-500 tracking-wider mb-3">Warta PTM</div>
              <h3 className="text-xl font-serif text-[#280000] mb-3 line-clamp-2 leading-snug">IMM FAI UMY Luncurkan Majalah BAHL1L, Angkat Isu Perempuan</h3>
              <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-6 font-normal">
                Peluncuran Majalah BAHL1L dan pelaksanaan studium generale yang mengangkat isu keperempuanan sebagai wujud nyata gerakan intelektual kader IMM FAI UMY.
              </p>
              <div className="text-xs text-gray-500 font-normal flex items-center justify-between">
                <span>28 April 2026</span>
                <span>Baca</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ========================
          KALENDER SECTION
          ======================== */}
      <section id="kalender" className="w-full min-h-[70vh] bg-[linear-gradient(145deg,#6d0100_0%,#a90a05_40%,#f92727_65%,#f8cf0f_100%)] text-white p-8 md:p-[60px] flex flex-col items-center justify-center relative overflow-hidden">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-12 text-white text-center drop-shadow-md">Kalender Kegiatan</h2>
        
        <div className="w-full max-w-[1400px] relative z-10">
          <IMMCalendar />
        </div>
      </section>

      {/* ========================
          KONTAK SECTION
          ======================== */}
      <section id="kontak" className="w-full bg-white text-[#280000] p-8 md:p-[60px] pt-16 md:pt-24 border-t border-gray-200">
        <div className="max-w-[1450px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Info & Socials */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="IMM Logo" className="w-[56px] h-[56px] object-contain drop-shadow-md" />
              <span className="font-serif text-2xl font-normal">PK IMM FAI UMY</span>
            </div>
            <p className="text-gray-600 font-normal text-sm md:text-base leading-relaxed mb-8">
              Wadah perkaderan mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta yang berlandaskan intelektualitas, religiusitas, dan humanitas.
            </p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="flex flex-col items-start">
            <h3 className="font-serif text-2xl font-normal mb-6 text-[#6d0100]">Navigasi</h3>
            <div className="flex flex-col gap-4">
              <a href="#profile" className="text-gray-600 hover:text-[#f92727] transition-colors font-normal">Profil</a>
              <a href="#bidang" className="text-gray-600 hover:text-[#f92727] transition-colors font-normal">Bidang</a>
              <a href="#dokumentasi" className="text-gray-600 hover:text-[#f92727] transition-colors font-normal">Dokumentasi</a>
              <a href="#berita" className="text-gray-600 hover:text-[#f92727] transition-colors font-normal">Berita</a>
            </div>
          </div>

          {/* Column 3: Tautan Cepat */}
          <div className="flex flex-col items-start">
            <h3 className="font-serif text-2xl font-normal mb-6 text-[#6d0100]">Tautan Cepat</h3>
            <div className="flex flex-col gap-4">
              <a href="#kalender" className="text-gray-600 hover:text-[#f92727] transition-colors font-normal">Kalender</a>
              <a href="#agenda" className="text-gray-600 hover:text-[#f92727] transition-colors font-normal">Agenda</a>
              <a href="#kontak" className="text-gray-600 hover:text-[#f92727] transition-colors font-normal">Kontak</a>
              <a href="#join" className="text-gray-600 hover:text-[#f92727] transition-colors font-normal">Join IMM</a>
            </div>
          </div>

          {/* Column 4: Sekretariat */}
          <div className="flex flex-col items-start">
            <h3 className="font-serif text-2xl font-normal mb-6 text-[#6d0100]">Sekretariat</h3>
            <a 
              href="https://maps.google.com/?q=Gedung+Ki+Bagus+Hadikusumo+UMY+Yogyakarta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#f92727] font-normal text-sm md:text-base leading-relaxed transition-colors hover:underline mb-4"
            >
              Gedung Ki Bagus Hadikusumo (G6), Kampus Terpadu UMY, Jl. Brawijaya, Kasihan, Bantul, Yogyakarta.
            </a>
            
            <div className="flex flex-col gap-2">
              <a href="mailto:immfaiumy25@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-[#f92727] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#f92727]/10 transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                </div>
                <span className="font-normal text-sm md:text-base">immfaiumy25@gmail.com</span>
              </a>
              
              <a href="https://instagram.com/imm.faiumy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-[#f92727] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#f92727]/10 transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <span className="font-normal text-sm md:text-base">@imm.faiumy</span>
              </a>
              
              <a href="https://wa.me/6282147020828" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-[#f92727] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#f92727]/10 transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="font-normal text-sm md:text-base">+62 821-4702-0828</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
