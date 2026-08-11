import FadeUp from "./FadeUp";

export default function CTASection() {
  return (
    <section id="join" className="py-[var(--spacing-section-gap)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4B2025] to-[#C92B1E]"></div>
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
      <FadeUp className="relative z-10 max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] text-center text-white">
        <h2 className="font-display-lg text-display-lg mb-8">
          Siap Menjadi Bagian dari Sejarah?
        </h2>
        <p className="font-body-lg text-body-lg mb-12 max-w-2xl mx-auto opacity-90">
          Bergabunglah bersama ribuan kader lainnya untuk bertransformasi menjadi
          insan kamil yang bermanfaat bagi umat dan bangsa. Perjalanan
          intelektualmu dimulai di sini.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <button className="bg-tertiary text-on-tertiary px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-xl">
            Daftar Sekarang
          </button>
          <button className="bg-transparent border-2 border-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all">
            Hubungi Kami
          </button>
        </div>
      </FadeUp>
    </section>
  );
}
