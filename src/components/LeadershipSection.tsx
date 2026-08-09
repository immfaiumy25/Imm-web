import Image from "next/image";
import FadeUp from "./FadeUp";

export default function LeadershipSection() {
  return (
    <section className="py-[var(--spacing-section-gap)] bg-surface">
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)]">
        <FadeUp className="text-center mb-16">
          <span className="text-secondary font-label-md uppercase tracking-widest mb-4 block">
            Nakhoda Organisasi
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">
            Pengurus Harian Utama
          </h2>
        </FadeUp>
        <FadeUp className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="relative mb-8 mx-auto w-64 h-64">
              <div className="absolute inset-0 bg-tertiary rounded-full scale-105 group-hover:rotate-12 transition-transform duration-500"></div>
              <Image
                alt="Ahmad Fauzi - Ketua Umum"
                className="object-cover rounded-full relative z-10 border-4 border-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFKpvW0Nav5v6s03Srx3RmvcvTeyx2u8SRNxp-meLUfDxVZNoE9AjiUYnslrOQwlUf04kz3CQS7gvowwnUWxManB-g0P4wALO7asPAkHbwuUQd6_FdLHfNcA04jnc8DKLh_AyI4qQWQFgKIsCeOfeSi6DiAFzQN7CkjcoDXyh6VScwBRdazmkXxoq3TMTjQT0VrE-Ii1Jb-kS3cS_UiLrOJhc0yHVsdqZWrSJ1KtXyeYB-eXTyzQ16"
                fill
              />
            </div>
            <h3 className="text-2xl font-bold text-primary">Ahmad Fauzi</h3>
            <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">
              Ketua Umum
            </p>
            <div className="flex justify-center gap-4 text-on-surface-variant">
              <span className="material-symbols-outlined cursor-pointer hover:text-primary">
                alternate_email
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary">
                link
              </span>
            </div>
          </div>
          <div className="text-center group">
            <div className="relative mb-8 mx-auto w-64 h-64">
              <div className="absolute inset-0 bg-primary rounded-full scale-105 group-hover:rotate-12 transition-transform duration-500"></div>
              <Image
                alt="Ridho Alfian - Sekretaris Umum"
                className="object-cover rounded-full relative z-10 border-4 border-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF_xF_A-WjeeCom1R2uGIKyXugWrih6EDVuc4kDfAbyMVz_URB6dbzgl-0Zq8GixR1uDjN_iDYA7VZ8_wUE9bPtclJs1vlFgTu8i8jXWjbyi763y_jE2QFdrldcrAoObiMmgrqlxyZHUl24ihLtBL3ccpWoIMlHKkcw9zfCfIfwhwu-C4Zv1P6KKYKvXNHFP_ddq53cSwmxv8UqOufvjXFRq1GFlzCn0EK4AHKEc1loKTdQilgu6dP"
                fill
              />
            </div>
            <h3 className="text-2xl font-bold text-primary">Ridho Alfian</h3>
            <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">
              Sekretaris Umum
            </p>
            <div className="flex justify-center gap-4 text-on-surface-variant">
              <span className="material-symbols-outlined cursor-pointer hover:text-primary">
                alternate_email
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary">
                link
              </span>
            </div>
          </div>
          <div className="text-center group">
            <div className="relative mb-8 mx-auto w-64 h-64">
              <div className="absolute inset-0 bg-secondary rounded-full scale-105 group-hover:rotate-12 transition-transform duration-500"></div>
              <Image
                alt="Siti Nurhaliza - Bendahara Umum"
                className="object-cover rounded-full relative z-10 border-4 border-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2pnkqdWAuDgdLEybjuB4rftkD_9t-DyEmYdoOWhflt2WEc9fPaZZcPO8xyGLgXHU8KldukcJmFfQxLvY5r2c2inIjYpKJHlL8hkFhf4YykhjKC9rHL0JZjoT19XuQkd0i7PyvweJhRmuUTwF7CsMY5L66angaNG1J502HpFY6QRIs2oPabOSCWcdr1mLnHMTdbo9aBEHAhOHaYEOLX98CysBz_O92F_6qSyi-doPNJbn12CPcxLSU"
                fill
              />
            </div>
            <h3 className="text-2xl font-bold text-primary">Siti Nurhaliza</h3>
            <p className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">
              Bendahara Umum
            </p>
            <div className="flex justify-center gap-4 text-on-surface-variant">
              <span className="material-symbols-outlined cursor-pointer hover:text-primary">
                alternate_email
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-primary">
                link
              </span>
            </div>
          </div>
        </FadeUp>
        <FadeUp className="text-center mt-16">
          <button className="bg-primary text-white px-10 py-4 rounded-full font-label-md hover:bg-[#4B2025] transition-all">
            Lihat Struktur Organisasi Lengkap
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
