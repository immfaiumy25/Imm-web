

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-white">
      <div className="relative z-10 max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] text-primary">
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
        </div>
      </div>
    </section>
  );
}
