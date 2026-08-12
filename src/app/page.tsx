"use client";

import { useState, useEffect, useRef } from "react";
import { DisableZoom } from "@/components/DisableZoom";
import SpotlightCard from "@/components/SpotlightCard";

import MagicBento from "@/components/MagicBento";
import BorderGlow from "@/components/BorderGlow";
import IMMCalendar from "@/components/IMMCalendar";
import TypewriterText from "@/components/TypewriterText";
import Link from 'next/link';
import { getHomeSettings } from "@/app/actions/homeSettings";
import { getProfileSettings } from "@/app/actions/profileSettings";
import { getBidangSettings } from "@/app/actions/bidangSettings";
import { getDokumentasiSettings } from "@/app/actions/dokumentasiSettings";
import { getBeritaSettings } from "@/app/actions/beritaSettings";
import { getEvents } from "@/app/actions/eventActions";
import { getSettings } from "@/app/actions/settings";

export default function Home() {
  const [navbarTheme, setNavbarTheme] = useState('dark');
  const [activeSectionTitle, setActiveSectionTitle] = useState('PK IMM FAI UMY');
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const [homeText, setHomeText] = useState({
    title1: "Bergerak Bersama ",
    title2: "Berkarya untuk Peradaban",
    desc: "Pimpinan Komisariat Ikatan Mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta adalah wadah perkaderan yang progresif, mengintegrasikan intelektualitas, spiritualitas, dan humanitas untuk membangun generasi emas masa depan."
  });
  
  const [profileData, setProfileData] = useState<any>(null);
  const [bidangData, setBidangData] = useState<any[]>([]);
  const [dokumentasiData, setDokumentasiData] = useState<any[]>([]);
  const [beritaData, setBeritaData] = useState<any[]>([]);
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});

  const isIntroLockedRef = useRef(false);

  useEffect(() => {
    getHomeSettings().then(data => {
      setHomeText({
        title1: data.hero_title_1,
        title2: data.hero_title_2,
        desc: data.hero_description
      });
    });
    
    getProfileSettings().then(data => setProfileData(data));
    getBidangSettings().then(data => setBidangData(data || []));
    getDokumentasiSettings().then(data => setDokumentasiData(data || []));
    getBeritaSettings().then(data => setBeritaData(data || []));
    getEvents().then(data => setEventsData(data || []));
    getSettings().then(data => setSiteSettings(data));
  }, []);

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
          
          <div className="flex items-center gap-4 pointer-events-auto">
            {/* Desktop Join Button */}
            <a href={siteSettings?.cta_registration_url || "#"} target="_blank" rel="noopener noreferrer" className={`hidden md:block rounded-[10px] px-[16px] py-[8px] text-sm font-normal backdrop-blur-md shadow-lg transition-all duration-300 ${navbarTheme === 'light' ? 'bg-[#280000] text-white hover:bg-[#6d0100]' : 'bg-white/20 border border-white/40 text-white hover:bg-white/30 drop-shadow-md'}`}>
              Join IMM
            </a>
            
            {/* Mobile Hamburger */}
            <button 
              className={`md:hidden p-1 focus:outline-none transition-colors ${navbarTheme === 'light' ? 'text-[#280000]' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden pointer-events-auto absolute top-[76px] left-4 right-4 rounded-[26px] border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}
          style={{ 
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'url(#liquid-glass) blur(24px)', 
            WebkitBackdropFilter: 'url(#liquid-glass) blur(24px)' 
          }}
        >
          <div className="flex flex-col p-6 gap-4 text-[#280000] font-medium text-lg">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6d0100] transition-colors">Home</a>
            <a href="#profile" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6d0100] transition-colors">Profile</a>
            <a href="#bidang" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6d0100] transition-colors">Bidang</a>
            <a href="#dokumentasi" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6d0100] transition-colors">Dokumentasi</a>
            <a href="#berita" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6d0100] transition-colors">Berita</a>
            <a href="#kalender" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6d0100] transition-colors">Kalender</a>
            <Link href="/creative-minority" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6d0100] transition-colors">Creative Minority</Link>
            <a href="#kontak" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#6d0100] transition-colors">Kontak</a>
            <hr className="border-[#280000]/10 my-2" />
            <a href={siteSettings?.cta_registration_url || "#"} target="_blank" rel="noopener noreferrer" className="bg-[#6d0100] text-white py-3 rounded-xl font-normal hover:bg-[#a90a05] transition-colors w-full text-center">
              Join IMM
            </a>
          </div>
        </div>
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
                <TypewriterText text={homeText.title1} />
                <br className="hidden md:block"/>
                <TypewriterText text={homeText.title2} />
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-[700px] font-light mb-10 min-h-[150px] md:min-h-[120px]">
                <TypewriterText text={homeText.desc} />
              </p>

            </div>

          </div>
        </div>
        </div>
      </section>

      {/* ========================
          PROFILE SECTION (White)
          ======================== */}
      <section id="profile" className="relative w-full bg-white text-[#280000] p-8 md:px-[60px] pb-[100px] md:pb-[200px] flex flex-col items-center justify-start pt-24 md:pt-32 overflow-hidden">
        
        <style>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(40px, -50px) scale(1.1); }
            66% { transform: translate(-30px, 30px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 15s infinite alternate ease-in-out;
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          
          @keyframes sway {
            0% { transform: translateX(-10px); }
            100% { transform: translateX(10px); }
          }
          .animate-sway {
            animation: sway 8s ease-in-out infinite alternate;
          }
        `}</style>

        {/* Ambient Glows & Background Wavy Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          
          {/* Blobs */}
          <div className="absolute top-[5%] left-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#f92727] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[150px] opacity-15 animate-blob"></div>
          <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#f7aa09] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[150px] opacity-15 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-5%] left-[10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#6d0100] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[150px] opacity-10 animate-blob animation-delay-4000"></div>

          {/* SVG Line */}
          <div className="absolute inset-0 flex justify-center opacity-40 animate-sway">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 1000 3000" 
              preserveAspectRatio="none"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="wavy-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f92727" stopOpacity="0" />
                  <stop offset="10%" stopColor="#f92727" stopOpacity="1" />
                  <stop offset="50%" stopColor="#f7aa09" stopOpacity="1" />
                  <stop offset="90%" stopColor="#6d0100" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6d0100" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M 500,0 C 900,500 100,1000 500,1500 C 900,2000 100,2500 500,3000" 
                fill="none" 
                stroke="url(#wavy-gradient)" 
                strokeWidth="4" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[1450px] mx-auto text-center flex flex-col items-center gap-16 md:gap-24">
          
          <div className="flex flex-col items-center max-w-[1000px]">
            <h2 className="font-serif text-4xl md:text-6xl font-normal leading-tight tracking-tight mb-6 text-[#6d0100]">
              {profileData?.mainTitle || "Menciptakan Kader Berintelektual Tinggi & Berakhlak Mulia"}
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-700">
              {profileData?.mainDesc || "Ikatan Mahasiswa Muhammadiyah (IMM) adalah organisasi otonom Muhammadiyah yang bergerak di bidang keagamaan, kemahasiswaan, dan kemasyarakatan."}
            </p>
          </div>
          
          <div className="w-full">
            <img 
              src={profileData?.mainImage || "/Profileimm.jpg"} 
              alt="Profile IMM FAI UMY" 
              className="w-full h-auto max-h-[80vh] object-cover rounded-[32px] shadow-2xl"
            />
          </div>

          <div className="w-full mt-10">
            <h3 className="font-serif text-3xl md:text-4xl font-normal mb-12 text-[#6d0100] text-center md:text-left">Pengurus Harian</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
              
              {(profileData?.pengurus || []).map((p: any, idx: number) => {
                const gradients = [
                  "bg-[linear-gradient(135deg,#6d0100,#f92727)]",
                  "bg-[linear-gradient(135deg,#f8cf0f,#f7aa09)]",
                  "bg-[linear-gradient(135deg,#6d0100,#f92727)]",
                  "bg-[linear-gradient(135deg,#ffcfcf,#f92727)]"
                ];
                const borders = [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "40% 60% 70% 30% / 40% 50% 60% 50%",
                  "50% 50% 40% 60% / 60% 40% 70% 50%",
                  "70% 30% 50% 50% / 30% 60% 40% 70%"
                ];
                
                return (
                  <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                    <div className="relative w-48 h-48 flex-shrink-0 flex items-end justify-center">
                      <div 
                        className={`absolute inset-0 ${gradients[idx % 4]} transition-all duration-500 group-hover:scale-105`}
                        style={{ borderRadius: borders[idx % 4] }}
                      ></div>
                      <div className="relative z-10 w-[90%] h-[120%] flex items-end justify-center">
                        <img 
                          src={p.img} 
                          alt={`Foto ${p.name}`} 
                          className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-8">
                      <h4 className="font-serif text-2xl font-normal text-[#280000]">{p.name}</h4>
                      <p className={`${idx % 2 === 0 ? "text-[#6d0100]" : "text-[#f7aa09]"} font-medium text-lg`}>
                        {p.role} <span className="text-sm font-normal text-gray-500">({p.batch})</span>
                      </p>
                      <p className="text-gray-500 mt-2 text-sm max-w-[250px]">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          <div className="w-full mt-20">
            <h3 className="font-serif text-3xl md:text-4xl font-normal mb-12 text-[#6d0100] text-center">Visi dan Misi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow border border-white/50 flex flex-col items-center">
                <h4 className="font-serif text-2xl font-normal text-[#280000] mb-6">Visi</h4>
                <p className="text-gray-700 font-normal leading-relaxed text-center">
                  {profileData?.visi || "\"Revitalisasi gerakan IMM FAI UMY yang mengutamakan perkaderan dan pergerakan berbasis nilai-nilai sehingga terciptanya gerakan yang inklusif dan adaptif\"."}
                </p>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow border border-white/50 flex flex-col items-center">
                <h4 className="font-serif text-2xl font-normal text-[#280000] mb-6">Misi</h4>
                <ul className="text-gray-700 font-normal leading-relaxed list-disc list-outside ml-4 space-y-3">
                  {(profileData?.misi || "").split('\n').filter((m: string) => m.trim() !== "").map((misi: string, idx: number) => (
                    <li key={idx}>{misi}</li>
                  ))}
                </ul>
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
        
        <div className="grid grid-flow-col auto-cols-[calc(50%-8px)] md:auto-cols-auto md:grid-flow-row md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 w-full max-w-[1450px] overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-6 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {bidangData.map((bidang, i) => (
            <SpotlightCard 
              key={i} 
              className="snap-start p-6 md:p-8 flex flex-col justify-between group cursor-pointer h-full bg-white/20 border-white/30 shadow-[0_8px_32px_0_rgba(109,1,0,0.37)]" 
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
          DOKUMENTASI & BERITA CANVAS
          ======================== */}
      <div 
        className="group relative w-full bg-[#f8f9fa] overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
          e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
        }}
      >
        {/* Unified Mouse Spotlight */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249, 39, 39, 0.08), transparent 40%)'
          }}
        />
        
        {/* Unified Background Effects (Grid + Noise) */}
        <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_2px,transparent_2px)] [background-size:32px_32px] opacity-50 z-0 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        {/* ========================
            DOKUMENTASI SECTION
            ======================== */}
        <section id="dokumentasi" className="relative w-full min-h-[80vh] text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center">
          <h2 className="relative z-10 font-serif text-4xl md:text-6xl font-normal mb-12 text-[#6d0100] text-center">Dokumentasi</h2>
          
          <div className="w-full max-w-[1200px] mx-auto relative z-10 flex justify-center">
            <MagicBento 
              data={dokumentasiData}
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
            BERITA SECTION
            ======================== */}
        <section id="berita" className="relative w-full min-h-[70vh] text-[#280000] p-8 md:p-[60px] pb-[100px] flex flex-col items-center justify-center">
          <h2 className="relative z-10 font-serif text-4xl md:text-6xl font-normal mb-12 text-[#6d0100] text-center">Berita & Artikel</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px] relative z-10">
          {beritaData.map((berita, i) => (
            <a 
              key={i}
              href={berita.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full rounded-[24px] flex flex-col hover:scale-105 hover:shadow-2xl shadow-xl transition-all cursor-pointer overflow-hidden group"
              style={{ 
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 1)'
              }}
            >
              <div className="w-full h-48 relative overflow-hidden bg-gray-200">
                <img src={berita.image} alt={berita.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-normal text-gray-500 tracking-wider mb-3">{berita.source}</div>
                <h3 className="text-xl font-serif text-[#280000] mb-3 line-clamp-2 leading-snug">{berita.title}</h3>
                <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-6 font-normal">
                  {berita.description}
                </p>
                <div className="text-xs text-gray-500 font-normal flex items-center justify-between">
                  <span>{berita.date}</span>
                  <span>Baca</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      </div> {/* End of DOKUMENTASI & BERITA CANVAS */}

      {/* ========================
          KALENDER SECTION
          ======================== */}
      <section id="kalender" className="w-full min-h-[70vh] bg-[linear-gradient(145deg,#6d0100_0%,#a90a05_40%,#f92727_65%,#f8cf0f_100%)] text-white p-8 md:p-[60px] flex flex-col items-center justify-center relative overflow-hidden">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-12 text-white text-center drop-shadow-md">Kalender Kegiatan</h2>
        
        <div className="w-full max-w-[1400px] relative z-10">
          <IMMCalendar events={eventsData} />
        </div>
      </section>

      {/* ========================
          CALL TO ACTION SECTION
          ======================== */}
      <section className="relative w-full bg-[#6d0100] text-white py-24 md:py-32 px-8 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        <div className="relative z-10 max-w-[800px] text-center flex flex-col items-center gap-8">
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight tracking-tight">
            Siap Menjadi Bagian dari Sejarah?
          </h2>
          <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed max-w-[700px]">
            Bergabunglah bersama ribuan kader lainnya untuk bertransformasi menjadi insan kamil yang bermanfaat bagi umat dan bangsa. Perjalanan intelektualmu dimulai di sini.
          </p>
          <a 
            href={siteSettings?.cta_registration_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-4 bg-white text-[#6d0100] rounded-full font-normal text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300"
          >
            Join IMM
          </a>
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
            <p className="text-gray-600 font-normal text-sm md:text-base leading-relaxed mb-8 whitespace-pre-line">
              {siteSettings?.footer_description || "Wadah perkaderan mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta yang berlandaskan intelektualitas, religiusitas, dan humanitas."}
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
              <a href={siteSettings?.cta_registration_url || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#f92727] transition-colors font-normal">Join IMM</a>
              <a href="/login" className="text-gray-600 hover:text-[#f92727] transition-colors font-normal">Login</a>
            </div>
          </div>

          {/* Column 4: Sekretariat */}
          <div className="flex flex-col items-start">
            <h3 className="font-serif text-2xl font-normal mb-6 text-[#6d0100]">Sekretariat</h3>
            <a 
              href="https://maps.google.com/?q=Gedung+Ki+Bagus+Hadikusumo+UMY+Yogyakarta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#f92727] font-normal text-sm md:text-base leading-relaxed transition-colors hover:underline mb-4 whitespace-pre-line"
            >
              {siteSettings?.footer_address || "Gedung Ki Bagus Hadikusumo (G6), Kampus Terpadu UMY, Jl. Brawijaya, Kasihan, Bantul, Yogyakarta."}
            </a>
            
            <div className="flex flex-col gap-2">
              <a href={siteSettings?.contact_email ? `mailto:${siteSettings.contact_email}` : "#"} className="flex items-center gap-3 text-gray-600 hover:text-[#f92727] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#f92727]/10 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-sm">mail</span>
                </div>
                <span className="font-normal text-sm md:text-base">{siteSettings?.contact_email || "Belum ada email"}</span>
              </a>
              
              <a href={siteSettings?.contact_instagram || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-[#f92727] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#f92727]/10 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-sm">public</span>
                </div>
                <span className="font-normal text-sm md:text-base">Instagram</span>
              </a>
              
              <a href={siteSettings?.contact_whatsapp || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-[#f92727] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#f92727]/10 transition-colors shrink-0">
                  <span className="material-symbols-outlined text-sm">phone</span>
                </div>
                <span className="font-normal text-sm md:text-base">Hubungi Kami</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
