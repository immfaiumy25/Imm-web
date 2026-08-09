import { prisma } from "@/lib/prisma";
import { updateAllSettings } from "@/app/actions/settings";

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  
  // Helper to get value
  const getVal = (key: string) => settings.find(s => s.key === key)?.value || "";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Pengaturan Website</h1>
        <p className="text-gray-600 mt-2">Konfigurasi link pendaftaran dan kontak resmi organisasi.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <form action={updateAllSettings} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Link Pendaftaran (Daftar Sekarang)
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Tautan tujuan saat pengunjung menekan tombol Daftar (Bisa berupa link Google Form).
            </p>
            <input 
              type="url" 
              name="cta_registration_url"
              defaultValue={getVal("cta_registration_url")}
              placeholder="https://forms.gle/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nomor WhatsApp Admin
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Tautan WhatsApp untuk tombol Hubungi Kami (Contoh: https://wa.me/628123456789).
            </p>
            <input 
              type="url" 
              name="contact_whatsapp"
              defaultValue={getVal("contact_whatsapp")}
              placeholder="https://wa.me/628..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-[#4B2025] font-medium">
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
