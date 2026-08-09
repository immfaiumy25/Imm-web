import FadeUp from "./FadeUp";

export default function DivisionsSection() {
  const bidang = [
    { name: "Organisasi", icon: "account_tree", desc: "Penguatan sistem manajemen internal." },
    { name: "Kaderisasi", icon: "groups", desc: "Pusat pengembangan kader unggul." },
    { name: "RPK", icon: "science", desc: "Riset dan Pengembangan Keilmuan." },
    { name: "Hikmah", icon: "policy", desc: "Gerakan politik dan advokasi sosial." },
    { name: "TKK", icon: "mosque", desc: "Tabligh dan Kajian Keislaman." },
    { name: "SPM", icon: "volunteer_activism", desc: "Sosial Pemberdayaan Masyarakat." },
    { name: "SBO", icon: "palette", desc: "Seni, Budaya, dan Olahraga." },
    { name: "IMMawati", icon: "woman", desc: "Pemberdayaan dan isu perempuan." },
    { name: "Ekonomi", icon: "payments", desc: "Kewirausahaan dan kemandirian." },
    { name: "Medkom", icon: "podcasts", desc: "Media, Komunikasi, dan Informasi." },
  ];

  return (
    <section className="py-[var(--spacing-section-gap)] bg-[#F9EAEA]">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)]">
        <FadeUp className="text-center mb-16">
          <span className="text-secondary font-label-md uppercase tracking-widest mb-4 block">
            Struktur Organisasi
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">
            Bidang PK IMM FAI UMY
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {bidang.map((item, index) => (
            <FadeUp
              key={index}
              className="glass-card p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-primary mb-3">{item.name}</h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                {item.desc}
              </p>
              <button className="mt-auto text-secondary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
