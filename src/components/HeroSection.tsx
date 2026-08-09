import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-container)] via-[#C92B1E] to-[#D4B100] opacity-90"></div>
        <Image
          alt="A cinematic, high-quality photograph of a vibrant university campus"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0fSSmWIjgEUzujaVP_EgM4cASDehFGA-UZs34nvQZEheVX1fOl1pJYW4V5VX4JFqlSoCwh0622ItTDL6V31KZBPUVN_8FW9MetSAcVYVYC1MofTkkr-HSdK-Hs7_UHBHlfRh__iYK2MV3JrWvO1-kz3iLgroaNVTE7dGwjYRNuZO8l7v9EOOpUMAFdCh6HqJpiaJhcffnpeQkrOK84i5qHF_g665wHSk6cBZjVrWsVJod57xdMl1h"
          fill
          priority
        />
      </div>
      <div className="relative z-10 max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] text-white">
        <div className="max-w-3xl">
          <h1 className="font-display-lg text-display-lg mb-6 leading-tight">
            PK IMM FAI UMY: Bergerak Bersama, Berkarya untuk Peradaban
          </h1>
          <p className="font-body-lg text-body-lg mb-10 opacity-90">
            Pimpinan Komisariat Ikatan Mahasiswa Muhammadiyah Fakultas Agama Islam
            Universitas Muhammadiyah Yogyakarta adalah wadah perkaderan yang
            progresif, mengintegrasikan intelektualitas, spiritualitas, dan
            humanitas untuk membangun generasi emas masa depan.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <button className="bg-secondary text-white px-8 py-4 rounded-full font-label-md hover:scale-105 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">photo_library</span>{" "}
              Lihat Dokumentasi
            </button>
            <button className="bg-tertiary text-on-tertiary px-8 py-4 rounded-full font-label-md hover:scale-105 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">article</span> Baca
              Berita
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-white/20">
            <div>
              <div className="text-4xl font-bold">10</div>
              <div className="text-sm uppercase tracking-widest opacity-70">
                Bidang
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold">100+</div>
              <div className="text-sm uppercase tracking-widest opacity-70">
                Dokumentasi
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold">50+</div>
              <div className="text-sm uppercase tracking-widest opacity-70">
                Berita
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold">1000+</div>
              <div className="text-sm uppercase tracking-widest opacity-70">
                Kader
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
