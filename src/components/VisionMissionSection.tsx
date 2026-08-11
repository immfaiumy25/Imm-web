import FadeUp from "./FadeUp";

export default function VisionMissionSection() {
  const misi = [
    "Menanamkan nilai-nilai dasar keislaman dan kemuhammadiyahan secara mendalam.",
    "Menciptakan budaya riset dan keilmuan yang progresif di lingkungan mahasiswa.",
    "Membangun jejaring sosial dan advokasi yang berdampak nyata bagi masyarakat.",
    "Mengembangkan potensi kepemimpinan kader yang adaptif terhadap era digital.",
    "Mewujudkan tata kelola organisasi yang transparan, akuntabel, dan profesional.",
  ];

  return (
    <section className="py-[var(--spacing-section-gap)] bg-white">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-primary/5">
              <span className="material-symbols-outlined text-[200px]">
                auto_awesome
              </span>
            </div>
            <span className="bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase mb-6 inline-block">
              Visi Kami
            </span>
            <h2 className="text-4xl font-extrabold text-primary mb-8 leading-tight">
              Terwujudnya Kader IMM yang Unggul dalam Intelektual, Spiritual, dan
              Humanitas demi Kemajuan Peradaban Bangsa.
            </h2>
            <div className="w-20 h-2 bg-tertiary"></div>
          </div>
        </FadeUp>
        <FadeUp>
          <span className="text-secondary font-label-md uppercase tracking-widest mb-4 block">
            Misi Kami
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
            Strategi Perjuangan
          </h2>
          <div className="space-y-6">
            {misi.map((m, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="font-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                  {m}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
