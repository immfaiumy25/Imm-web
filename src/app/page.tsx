"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
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

      // 2. Navbar Transition Logic (scrolled past hero)
      const profileSection = document.getElementById('profile');
      if (profileSection && profileSection.getBoundingClientRect().top <= 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
          <div className={`flex items-center gap-3 font-normal tracking-[-0.04em] text-base md:text-lg transition-colors duration-300 ${isScrolled ? 'text-[#280000]' : 'text-white drop-shadow-md'}`}>
            <img src="/logo.png" alt="IMM Logo" className="w-[56px] h-[56px] object-contain drop-shadow-md" />
            PK IMM FAI UMY
          </div>
          
          {/* Navbar Links */}
          <div className={`hidden md:flex items-center gap-6 font-normal text-sm tracking-wide transition-colors duration-300 ${isScrolled ? 'text-[#280000] font-medium' : 'text-white drop-shadow-md'}`}>
            <a href="#home" className="hover:opacity-70 transition-opacity">Home</a>
            <a href="#profile" className="hover:opacity-70 transition-opacity">Profile</a>
            <a href="#bidang" className="hover:opacity-70 transition-opacity">Bidang</a>
            <a href="#dokumentasi" className="hover:opacity-70 transition-opacity">Dokumentasi</a>
            <a href="#berita" className="hover:opacity-70 transition-opacity">Berita</a>
            <a href="#kalender" className="hover:opacity-70 transition-opacity">Kalender</a>
            <a href="#kontak" className="hover:opacity-70 transition-opacity">Kontak</a>
          </div>
          
          <button className={`pointer-events-auto rounded-[10px] px-[16px] py-[8px] text-sm font-normal backdrop-blur-md shadow-lg transition-all duration-300 ${isScrolled ? 'bg-[#280000] text-white hover:bg-[#6d0100]' : 'bg-white/20 border border-white/40 text-white hover:bg-white/30 drop-shadow-md'}`}>
            Login
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
                      src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix&backgroundColor=transparent" 
                      alt="Foto Orang" 
                      className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-8">
                  <h4 className="font-serif text-2xl font-normal text-[#280000]">Nama Pengurus</h4>
                  <p className="text-[#6d0100] font-medium text-lg">Ketua Umum</p>
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
                      src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex&backgroundColor=transparent" 
                      alt="Foto Orang" 
                      className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-8">
                  <h4 className="font-serif text-2xl font-normal text-[#280000]">Nama Pengurus</h4>
                  <p className="text-[#f7aa09] font-medium text-lg">Sekretaris Jenderal</p>
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
                      src="https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah&backgroundColor=transparent" 
                      alt="Foto Orang" 
                      className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-8">
                  <h4 className="font-serif text-2xl font-normal text-[#280000]">Nama Pengurus</h4>
                  <p className="text-[#6d0100] font-medium text-lg">Bendahara</p>
                  <p className="text-gray-500 mt-2 text-sm max-w-[250px]">
                    Mengelola sirkulasi keuangan dan menyusun anggaran kegiatan kepanitiaan.
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
                      src="https://api.dicebear.com/9.x/avataaars/svg?seed=Leo&backgroundColor=transparent" 
                      alt="Foto Orang" 
                      className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-8">
                  <h4 className="font-serif text-2xl font-normal text-[#280000]">Nama Pengurus</h4>
                  <p className="text-[#f92727] font-medium text-lg">Ketua Bidang</p>
                  <p className="text-gray-500 mt-2 text-sm max-w-[250px]">
                    Merancang strategi perkaderan dan pengembangan sumber daya mahasiswa.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </section>

      {/* ========================
          BIDANG SECTION (Gray)
          ======================== */}
      <section id="bidang" className="w-full min-h-[70vh] bg-gray-50 text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-6 text-[#6d0100]">Bidang</h2>
        <p className="text-lg text-gray-600 max-w-[800px] text-center">
          Daftar bidang-bidang dalam organisasi beserta program kerja dan susunan pengurusnya.
        </p>
      </section>

      {/* ========================
          DOKUMENTASI SECTION (White)
          ======================== */}
      <section id="dokumentasi" className="w-full min-h-[70vh] bg-white text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-6 text-[#6d0100]">Dokumentasi</h2>
        <p className="text-lg text-gray-600 max-w-[800px] text-center">
          Galeri foto dan video dari berbagai kegiatan serta program kerja IMM FAI UMY.
        </p>
      </section>

      {/* ========================
          BERITA SECTION (Gray)
          ======================== */}
      <section id="berita" className="w-full min-h-[70vh] bg-gray-50 text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-6 text-[#6d0100]">Berita & Artikel</h2>
        <p className="text-lg text-gray-600 max-w-[800px] text-center">
          Informasi terkini, opini, dan publikasi kajian yang diangkat oleh para kader IMM FAI UMY.
        </p>
      </section>

      {/* ========================
          KALENDER SECTION (White)
          ======================== */}
      <section id="kalender" className="w-full min-h-[70vh] bg-white text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-normal mb-6 text-[#6d0100]">Kalender Kegiatan</h2>
        <p className="text-lg text-gray-600 max-w-[800px] text-center">
          Jadwal program kerja, kajian rutin, dan event-event penting komisariat.
        </p>
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
