import Image from "next/image";
import Link from "next/link";
import FadeUp from "./FadeUp";

export default function NewsSection() {
  const news = Array.from({ length: 6 }).map((_, i) => i);

  return (
    <section id="berita" className="py-[var(--spacing-section-gap)] bg-white">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)]">
        <FadeUp className="text-center mb-16">
          <span className="text-secondary font-label-md uppercase tracking-widest mb-4 block">
            Warta IMM
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">
            Berita & Artikel Terbaru
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <FadeUp key={item} className="glass-card overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-56 overflow-hidden relative bg-gray-200">
                <div className="absolute top-4 left-4 z-10 bg-secondary text-white text-xs px-3 py-1 rounded-full uppercase font-bold">
                  Pendidikan
                </div>
                {/* We use a placeholder div or you can put an actual Image if a URL exists */}
                <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500 text-sm group-hover:scale-110 transition-transform duration-500">
                  News Thumbnail {item + 1}
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-on-surface-variant mb-3">
                  12 Januari 2026
                </div>
                <h3 className="font-headline-md text-primary mb-4 line-clamp-2 hover:text-secondary transition-colors cursor-pointer">
                  Langkah Strategis PK IMM FAI UMY dalam Menyongsong Indonesia Emas 2045
                </h3>
                <p className="text-on-surface-variant line-clamp-3 mb-6">
                  Organisasi kemahasiswaan dituntut untuk terus beradaptasi dengan
                  perkembangan zaman...
                </p>
                <Link
                  href="#"
                  className="text-primary font-bold inline-flex items-center gap-2 border-b-2 border-primary/20 hover:border-primary transition-all"
                >
                  Baca Selengkapnya <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp className="text-center mt-16">
          <button className="border-2 border-primary text-primary px-10 py-4 rounded-full font-label-md hover:bg-primary hover:text-white transition-all">
            Lihat Semua Berita
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
