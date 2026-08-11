import Image from "next/image";
import FadeUp from "./FadeUp";

export default function AboutSection() {
  return (
    <section id="profil" className="py-[var(--spacing-section-gap)] bg-white">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] flex flex-col md:flex-row items-center gap-16">
        <FadeUp className="flex-1">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-tertiary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 w-full aspect-video rounded-[var(--radius-glass)] shadow-2xl overflow-hidden">
              <Image
                alt="A professional group photo of diverse Islamic student leaders sitting around a glass table"
                className="object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUowByrgBQ4Xd0cwt8Lqke6a7sHaVcOs9r-DZkC03YKevWBUCmPSvAXVyzGYDIsREaHh43fGS85jWhjn3LySXxrw3w2x1y1BZOio81G8m_oqZUsseelXPOwqS6yBfEPY-fH6fHmAGZhjQOjr2cmi03jVFxSj2op8xHeU7g3Cf7T6QvpGjD9xJ9zp0gGUuTDo1sWSinDUUx88-oOuzYTvnmfcdP6RuEuMKwQw0nBY7q5jElN7kCCjQN"
                fill
              />
            </div>
          </div>
        </FadeUp>
        <FadeUp className="flex-1">
          <span className="text-secondary font-label-md uppercase tracking-widest mb-4 block">
            Tentang Kami
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
            Menciptakan Kader Berintelektual Tinggi & Berakhlak Mulia
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Ikatan Mahasiswa Muhammadiyah (IMM) adalah organisasi otonom
            Muhammadiyah yang bergerak di bidang keagamaan, kemahasiswaan, dan
            kemasyarakatan. PK IMM FAI UMY berkomitmen untuk menjadi inkubator
            kepemimpinan yang berlandaskan Trilogi IMM: Keagamaan,
            Kemahasiswaan, dan Kemasyarakatan.
          </p>
          <button className="border-2 border-primary text-primary px-8 py-3 rounded-full font-label-md hover:bg-primary hover:text-white transition-all">
            Selengkapnya
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
