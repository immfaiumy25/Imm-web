import FadeUp from "./FadeUp";

export default function AgendaSection() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const daysArray = Array.from({ length: 31 }).map((_, i) => i + 1);

  return (
    <section className="py-[var(--spacing-section-gap)] bg-surface">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] grid grid-cols-1 lg:grid-cols-2 gap-16">
        <FadeUp>
          <span className="text-secondary font-label-md uppercase tracking-widest mb-4 block">
            Agenda Terdekat
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
            Jangan Lewatkan!
          </h2>
          <div className="bg-gradient-to-br from-primary to-[#4B2025] rounded-[var(--radius-glass)] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-[120px]">
                event_available
              </span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-tertiary text-on-tertiary px-4 py-1 rounded-full text-xs font-bold uppercase">
                  Akan Datang
                </span>
                <span className="text-white/60 text-sm italic">
                  Sisa 3 Hari Lagi
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-6">Musyawarah Komisariat XXVIII</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary">
                    location_on
                  </span>
                  <span>Ruang Sidang Utama FAI UMY</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary">
                    schedule
                  </span>
                  <span>08.00 - Selesai, 15 Maret 2026</span>
                </div>
              </div>
              <p className="text-white/80 mb-8 leading-relaxed">
                Membangun kepemimpinan yang berintegritas dan visioner untuk
                membawa PK IMM FAI UMY ke arah yang lebih progresif dan
                berkemajuan.
              </p>
              <button className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-tertiary hover:text-on-tertiary transition-all">
                Daftar Sekarang
              </button>
            </div>
          </div>
        </FadeUp>
        <FadeUp>
          <span className="text-secondary font-label-md uppercase tracking-widest mb-4 block">
            Kalender Organisasi
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">
            Timeline Kegiatan
          </h2>
          <div className="glass-card p-8">
            <div className="grid grid-cols-7 gap-4 mb-8">
              {days.map((d) => (
                <div key={d} className="text-center font-bold text-on-surface-variant text-xs uppercase">
                  {d}
                </div>
              ))}
              {daysArray.map((i) => {
                const active =
                  i === 15
                    ? "bg-secondary text-white ring-4 ring-secondary/20"
                    : "hover:bg-primary/5";
                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-full text-sm cursor-pointer transition-all ${active}`}
                  >
                    {i}
                  </div>
                );
              })}
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-primary/5">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-secondary">MAR</span>
                  <span className="text-lg font-bold">15</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Musyawarah Komisariat</h4>
                  <p className="text-xs text-on-surface-variant">
                    08:00 WIB • R. Sidang FAI
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl border border-outline-variant">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-secondary">MAR</span>
                  <span className="text-lg font-bold">20</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary">Kajian Rutin Pekanan</h4>
                  <p className="text-xs text-on-surface-variant">
                    15:30 WIB • Masjid KH Ahmad Dahlan
                  </p>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-3 border-2 border-primary/20 text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all">
              Lihat Kalender Lengkap
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
