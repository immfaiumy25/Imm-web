import Link from 'next/link';

export default function CreativeMinorityPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-12 px-4 md:px-8">
      {/* Simple Navigation */}
      <div className="max-w-[1450px] mx-auto w-full mb-12 flex items-center">
        <Link href="/" className="text-[#6d0100] hover:underline flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined">arrow_back</span>
          Kembali ke Beranda
        </Link>
      </div>

      <section className="w-full flex-grow flex flex-col items-center justify-center">
        <h1 className="font-serif text-4xl md:text-6xl font-normal mb-6 text-[#6d0100] text-center">Creative Minority</h1>
        <p className="text-lg text-gray-600 max-w-[800px] text-center mb-12 font-normal">
          Sebagai agen perubahan intelektual dan sosial, kami mewujudkan visi Creative Minority dalam mengurai masalah umat dan bangsa melalui pendekatan kreatif, kritis, dan solutif.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1200px]">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 text-[#f8cf0f] rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-2xl font-normal">lightbulb</span>
            </div>
            <h3 className="text-xl font-serif text-[#6d0100] mb-3 font-normal">Inovasi</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-normal">Mendorong kader untuk selalu berinovasi dalam memecahkan masalah dengan cara-cara baru yang efektif dan berdaya guna.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 text-[#f92727] rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-2xl font-normal">psychology</span>
            </div>
            <h3 className="text-xl font-serif text-[#6d0100] mb-3 font-normal">Kritis</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-normal">Membangun budaya berpikir kritis yang berbasis pada nilai-nilai dasar perjuangan IMM dan analisis yang tajam.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-100 text-[#280000] rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-2xl font-normal">handshake</span>
            </div>
            <h3 className="text-xl font-serif text-[#6d0100] mb-3 font-normal">Solutif</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-normal">Hadir di tengah masyarakat dengan menawarkan solusi konkret, bukan sekadar kritik atau wacana tanpa tindakan.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
