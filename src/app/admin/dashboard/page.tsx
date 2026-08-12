import { prisma } from "@/lib/prisma";
import { updateHomeSettings } from "@/app/actions/homeSettings";

export default async function DashboardPage() {
  const [newsCount, eventsCount, galleryCount, settings] = await Promise.all([
    prisma.news.count(),
    prisma.event.count(),
    prisma.gallery.count(),
    prisma.siteSetting.findMany({
      where: {
        key: {
          in: ["hero_title_1", "hero_title_2", "hero_description"]
        }
      }
    })
  ]);

  const getVal = (key: string, def: string) => settings.find(s => s.key === key)?.value || def;

  const heroTitle1 = getVal("hero_title_1", "Bergerak Bersama ");
  const heroTitle2 = getVal("hero_title_2", "Berkarya untuk Peradaban");
  const heroDesc = getVal("hero_description", "Pimpinan Komisariat Ikatan Mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta adalah wadah perkaderan yang progresif, mengintegrasikan intelektualitas, spiritualitas, dan humanitas untuk membangun generasi emas masa depan.");

  return (
    <div>


      <div className="mt-8 bg-white/15 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8 max-w-3xl">
        <h2 className="text-xl font-medium mb-6 text-white drop-shadow-md">Edit Konten Halaman Depan (Home)</h2>
        <form action={updateHomeSettings} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Judul Baris 1</label>
              <input 
                type="text" 
                name="hero_title_1"
                defaultValue={heroTitle1}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:ring-1 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Judul Baris 2</label>
              <input 
                type="text" 
                name="hero_title_2"
                defaultValue={heroTitle2}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:ring-1 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Deskripsi Paragraf</label>
            <textarea 
              name="hero_description"
              defaultValue={heroDesc}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-1 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" className="bg-white text-[#6d0100] px-6 py-2.5 rounded-xl hover:bg-white/90 transition-all font-medium shadow-sm">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
