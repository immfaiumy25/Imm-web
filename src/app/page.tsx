"use client";

import { useState, useEffect, useRef } from "react";
import { DisableZoom } from "@/components/DisableZoom";
import SpotlightCard from "@/components/SpotlightCard";
import CardSwap, { Card } from "@/components/CardSwap";
import MagicBento from "@/components/MagicBento";
import BorderGlow from "@/components/BorderGlow";
import IMMCalendar from "@/components/IMMCalendar";

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // 1. Intro Animation Logic
      const introMaxScroll = window.innerHeight * 0.65;
      let progress = scrollY / introMaxScroll;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
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
        { id: 'kontak', theme: 'dark', title: 'Kontak Kami' },
        { id: 'creative-minority', theme: 'light', title: 'Creative Minority' },
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
            <a href="#creative-minority" className="hover:opacity-70 transition-opacity">Creative Minority</a>
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
                Bergerak Bersama <br className="hidden md:block"/> Berkarya untuk Peradaban
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-[700px] font-light mb-10">
                Pimpinan Komisariat Ikatan Mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta adalah wadah perkaderan yang progresif, mengintegrasikan intelektualitas, spiritualitas, dan humanitas untuk membangun generasi emas masa depan.
              </p>
              <button className="bg-white text-[#6d0100] rounded-full px-8 py-4 font-normal hover:scale-105 transition-transform shadow-xl">
                Get Started
              </button>
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
            className="w-full h-full rounded-[24px] flex flex-col hover:scale-105 transition-transform cursor-pointer overflow-hidden group"
            style={{ 
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'url(#liquid-glass) blur(16px)',
              WebkitBackdropFilter: 'url(#liquid-glass) blur(16px)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(255, 255, 255, 1)'
            }}
          >
            <div className="w-full h-48 relative overflow-hidden bg-gray-200">
              <img src="/berita/berita-1.jpg" alt="Kompas Profetik ISP" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs font-bold text-[#f92727] tracking-wider mb-3">KABAR MUHAMMADIYAH</div>
              <h3 className="text-xl font-serif text-[#280000] mb-3 line-clamp-2 leading-snug">Menata Ulang Kompas Profetik: Penyusunan Alat Ukur Implementasi ISP dalam Grand Design PK IMM FAI UMY</h3>
              <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-6 font-normal">
                Agenda penyusunan alat ukur implementasi Ideologi, Strategi, dan Taktik Perjuangan (ISP) dalam kerangka Grand Design pergerakan komisariat.
              </p>
              <div className="text-xs text-gray-500 font-medium flex items-center justify-between">
                <span>7 Juli 2026</span>
                <span className="text-[#f92727] group-hover:translate-x-1 transition-transform">Baca &rarr;</span>
              </div>
            </div>
          </a>

          {/* Card 2 */}
          <a 
            href="https://rri.co.id/yogyakarta/budaya/2590526/dahlan-culture-festival-2026-perkuat-dakwah-kultural-lewat-sastra-profetik?nocache=true"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full rounded-[24px] flex flex-col hover:scale-105 transition-transform cursor-pointer overflow-hidden group"
            style={{ 
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'url(#liquid-glass) blur(16px)',
              WebkitBackdropFilter: 'url(#liquid-glass) blur(16px)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(255, 255, 255, 1)'
            }}
          >
            <div className="w-full h-48 relative overflow-hidden bg-gray-200">
              <img src="/berita/berita-2.webp" alt="Dahlan Culture Festival" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs font-bold text-[#f92727] tracking-wider mb-3">RRI BUDAYA</div>
              <h3 className="text-xl font-serif text-[#280000] mb-3 line-clamp-2 leading-snug">Dahlan Culture Festival 2026 Perkuat Dakwah Kultural lewat Sastra Profetik</h3>
              <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-6 font-normal">
                IMM FAI UMY menggelar Dahlan Culture Festival 2026 sebagai ruang ekspresi bagi kader se-DIY untuk mengaktualisasikan kreativitas dan memperkuat dakwah kultural melalui sastra profetik.
              </p>
              <div className="text-xs text-gray-500 font-medium flex items-center justify-between">
                <span>23 Juli 2026</span>
                <span className="text-[#f92727] group-hover:translate-x-1 transition-transform">Baca &rarr;</span>
              </div>
            </div>
          </a>

          {/* Card 3 */}
          <a 
            href="https://wartaptm.id/imm-fai-umy-luncurkan-majalah-bahlil-angkat-isu-perempuan-lewat-studium-generale/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full rounded-[24px] flex flex-col hover:scale-105 transition-transform cursor-pointer overflow-hidden group"
            style={{ 
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'url(#liquid-glass) blur(16px)',
              WebkitBackdropFilter: 'url(#liquid-glass) blur(16px)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(255, 255, 255, 1)'
            }}
          >
            <div className="w-full h-48 relative overflow-hidden bg-gray-200">
              <img src="/berita/berita-3.jpg" alt="Majalah BAHL1L" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs font-bold text-[#f92727] tracking-wider mb-3">WARTA PTM</div>
              <h3 className="text-xl font-serif text-[#280000] mb-3 line-clamp-2 leading-snug">IMM FAI UMY Luncurkan Majalah BAHL1L, Angkat Isu Perempuan</h3>
              <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-6 font-normal">
                Peluncuran Majalah BAHL1L dan pelaksanaan studium generale yang mengangkat isu keperempuanan sebagai wujud nyata gerakan intelektual kader IMM FAI UMY.
              </p>
              <div className="text-xs text-gray-500 font-medium flex items-center justify-between">
                <span>28 April 2026</span>
                <span className="text-[#f92727] group-hover:translate-x-1 transition-transform">Baca &rarr;</span>
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
          CREATIVE MINORITY SECTION (Gray)
          ======================== */}
      <section id="creative-minority" className="w-full min-h-[70vh] bg-gray-50 text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-6 text-[#6d0100] text-center">Creative Minority</h2>
        <p className="text-lg text-gray-600 max-w-[800px] text-center mb-12">
          Sebagai agen perubahan intelektual dan sosial, kami mewujudkan visi Creative Minority dalam mengurai masalah umat dan bangsa melalui pendekatan kreatif, kritis, dan solutif.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1200px]">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 text-[#f8cf0f] rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-2xl">lightbulb</span>
            </div>
            <h3 className="text-xl font-serif text-[#6d0100] mb-3">Inovasi</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Mendorong kader untuk selalu berinovasi dalam memecahkan masalah dengan cara-cara baru yang efektif dan berdaya guna.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 text-[#f92727] rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
            <h3 className="text-xl font-serif text-[#6d0100] mb-3">Kritis</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Membangun budaya berpikir kritis yang berbasis pada nilai-nilai dasar perjuangan IMM dan analisis yang tajam.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 text-[#280000] rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-2xl">handshake</span>
            </div>
            <h3 className="text-xl font-serif text-[#6d0100] mb-3">Solutif</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Hadir di tengah masyarakat dengan menawarkan solusi konkret, bukan sekadar kritik atau wacana tanpa tindakan.</p>
          </div>
        </div>
      </section>

      {/* ========================
          KONTAK SECTION (Dark)
          ======================== */}
      <section id="kontak" className="w-full min-h-[50vh] bg-[#280000] text-white p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-6">Kontak Kami</h2>
        <p className="text-lg text-white/70 max-w-[800px] text-center mb-8">
          Silakan hubungi kami untuk informasi pendaftaran, kerjasama, maupun pertanyaan lainnya.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-[#280000] px-6 py-3 rounded-full font-normal hover:bg-gray-200 transition-colors">
            Email Kami
          </button>
          <button className="bg-transparent border border-white px-6 py-3 rounded-full font-normal hover:bg-white/10 transition-colors">
            Instagram
          </button>
        </div>
      </section>

    </main>
  );
}
