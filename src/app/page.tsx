export default function Home() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      
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
          HOME SECTION (Gradient)
          ======================= */}
      <section id="home" className="relative w-full min-h-screen flex flex-col bg-[linear-gradient(145deg,#6d0100_0%,#a90a05_40%,#f92727_65%,#f8cf0f_100%)] text-white">
        
        {/* Navbar Wrapper */}
        <div className="w-full px-4 md:px-[26px] mt-4 md:mt-6 mb-2 sticky top-4 z-50">
          <nav 
            className="h-[60px] px-8 md:px-[60px] flex items-center justify-between max-w-[1450px] w-full mx-auto rounded-[26px] border border-white/20 shadow-lg"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'url(#liquid-glass) blur(12px)', 
              WebkitBackdropFilter: 'url(#liquid-glass) blur(12px)' 
            }}
          >
            <div className="flex items-center gap-[8px] font-black tracking-[-0.04em] text-base md:text-lg text-white">
              <i className="w-[24px] h-[24px] rounded-[7px_7px_7px_2px] bg-white/40 -rotate-8 border border-white/50 backdrop-blur-md"></i>
              Organisasi
            </div>
            
            {/* Navbar Links */}
            <div className="hidden md:flex items-center gap-6 font-normal text-sm tracking-wide">
              <a href="#home" className="hover:text-white/70 transition-colors">Home</a>
              <a href="#profile" className="hover:text-white/70 transition-colors">Profile</a>
              <a href="#bidang" className="hover:text-white/70 transition-colors">Bidang</a>
              <a href="#dokumentasi" className="hover:text-white/70 transition-colors">Dokumentasi</a>
              <a href="#berita" className="hover:text-white/70 transition-colors">Berita</a>
              <a href="#kalender" className="hover:text-white/70 transition-colors">Kalender</a>
              <a href="#kontak" className="hover:text-white/70 transition-colors">Kontak</a>
            </div>
            
            <button className="bg-white/20 border border-white/30 text-white rounded-[10px] px-[16px] py-[8px] text-sm font-extrabold hover:bg-white/30 transition-colors backdrop-blur-md">
              Explore
            </button>
          </nav>
        </div>

        {/* Liquid Glass Hero Card */}
        <div className="flex-1 w-full p-4 md:p-[26px] flex items-center justify-center relative z-10">
          <div 
            className="w-full max-w-[1450px] mx-auto min-h-[400px] md:min-h-[600px] p-8 md:p-12 rounded-[32px] border border-white/20 shadow-2xl flex flex-col justify-center items-center text-center"
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'url(#liquid-glass) blur(16px)', 
              WebkitBackdropFilter: 'url(#liquid-glass) blur(16px)' 
            }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
              Bergerak Bersama <br className="hidden md:block"/> Berkarya untuk Peradaban
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-[700px] font-light mb-10">
              Pimpinan Komisariat Ikatan Mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta adalah wadah perkaderan yang progresif, mengintegrasikan intelektualitas, spiritualitas, dan humanitas untuk membangun generasi emas masa depan.
            </p>
            <button className="bg-white text-[#6d0100] rounded-full px-8 py-4 font-bold hover:scale-105 transition-transform shadow-xl">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* ========================
          PROFILE SECTION (White)
          ======================== */}
      <section id="profile" className="relative w-full bg-white text-[#280000] p-8 md:px-[60px] pb-[100px] md:pb-[200px] flex flex-col items-center justify-start pt-24 md:pt-32">
        <div className="relative z-10 w-full max-w-[1450px] mx-auto text-center flex flex-col items-center gap-16 md:gap-24">
          
          <div className="flex flex-col items-center max-w-[1000px]">
            <h2 className="font-serif text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-[#6d0100]">
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
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-[#6d0100] text-center md:text-left">Anggota & Pengurus</h3>
            
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
                  <h4 className="font-serif text-2xl font-bold text-[#280000]">Nama Pengurus</h4>
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
                  <h4 className="font-serif text-2xl font-bold text-[#280000]">Nama Pengurus</h4>
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
                  <h4 className="font-serif text-2xl font-bold text-[#280000]">Nama Pengurus</h4>
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
                  <h4 className="font-serif text-2xl font-bold text-[#280000]">Nama Pengurus</h4>
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
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-[#6d0100]">Bidang</h2>
        <p className="text-lg text-gray-600 max-w-[800px] text-center">
          Daftar bidang-bidang dalam organisasi beserta program kerja dan susunan pengurusnya.
        </p>
      </section>

      {/* ========================
          DOKUMENTASI SECTION (White)
          ======================== */}
      <section id="dokumentasi" className="w-full min-h-[70vh] bg-white text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-[#6d0100]">Dokumentasi</h2>
        <p className="text-lg text-gray-600 max-w-[800px] text-center">
          Galeri foto dan video dari berbagai kegiatan serta program kerja IMM FAI UMY.
        </p>
      </section>

      {/* ========================
          BERITA SECTION (Gray)
          ======================== */}
      <section id="berita" className="w-full min-h-[70vh] bg-gray-50 text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-[#6d0100]">Berita & Artikel</h2>
        <p className="text-lg text-gray-600 max-w-[800px] text-center">
          Informasi terkini, opini, dan publikasi kajian yang diangkat oleh para kader IMM FAI UMY.
        </p>
      </section>

      {/* ========================
          KALENDER SECTION (White)
          ======================== */}
      <section id="kalender" className="w-full min-h-[70vh] bg-white text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-[#6d0100]">Kalender Kegiatan</h2>
        <p className="text-lg text-gray-600 max-w-[800px] text-center">
          Jadwal program kerja, kajian rutin, dan event-event penting komisariat.
        </p>
      </section>

      {/* ========================
          KONTAK SECTION (Dark)
          ======================== */}
      <section id="kontak" className="w-full min-h-[50vh] bg-[#280000] text-white p-8 md:p-[60px] flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">Kontak Kami</h2>
        <p className="text-lg text-white/70 max-w-[800px] text-center mb-8">
          Silakan hubungi kami untuk informasi pendaftaran, kerjasama, maupun pertanyaan lainnya.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-[#280000] px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
            Email Kami
          </button>
          <button className="bg-transparent border border-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
            Instagram
          </button>
        </div>
      </section>

    </main>
  );
}
