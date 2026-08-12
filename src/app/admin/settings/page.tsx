import { prisma } from "@/lib/prisma";
import { updateAllSettings } from "@/app/actions/settings";

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  
  // Helper to get value with a fallback
  const getVal = (key: string, defaultVal: string = "") => settings.find(s => s.key === key)?.value || defaultVal;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-white drop-shadow-md">Pengaturan Website</h1>
        <p className="text-white/80 mt-2 font-light">Konfigurasi teks, link, dan kontak resmi organisasi.</p>
      </div>

      <div className="bg-white/15 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-8 max-w-2xl">
        <form action={updateAllSettings} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Deskripsi Singkat (Footer)
            </label>
            <p className="text-sm text-white/70 mb-2 font-light">
              Teks penjelasan singkat tentang organisasi di bagian bawah web.
            </p>
            <textarea 
              name="footer_description"
              defaultValue={getVal("footer_description", "Wadah perkaderan mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta yang berlandaskan intelektualitas, religiusitas, dan humanitas.")}
              rows={3}
              placeholder="Wadah perkaderan mahasiswa..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:ring-1 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Link Pendaftaran (Daftar Sekarang)
            </label>
            <input 
              type="url" 
              name="cta_registration_url"
              defaultValue={getVal("cta_registration_url")}
              placeholder="https://forms.gle/..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:ring-1 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Link Instagram
            </label>
            <input 
              type="url" 
              name="contact_instagram"
              defaultValue={getVal("contact_instagram")}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:ring-1 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Resmi
            </label>
            <input 
              type="email" 
              name="contact_email"
              defaultValue={getVal("contact_email")}
              placeholder="email@contoh.com"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:ring-1 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Nomor WhatsApp / Kontak Telepon
            </label>
            <input 
              type="url" 
              name="contact_whatsapp"
              defaultValue={getVal("contact_whatsapp")}
              placeholder="https://wa.me/628..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:ring-1 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Alamat Sekretariat
            </label>
            <textarea 
              name="footer_address"
              defaultValue={getVal("footer_address", "Gedung Ki Bagus Hadikusumo (G6), Kampus Terpadu UMY, Jl. Brawijaya, Kasihan, Bantul, Yogyakarta.")}
              rows={2}
              placeholder="Gedung Ki Bagus Hadikusumo..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:ring-1 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 outline-none transition-all"
            />
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button type="submit" className="bg-white text-[#6d0100] px-6 py-2.5 rounded-xl hover:bg-white/90 transition-all font-medium shadow-sm">
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
