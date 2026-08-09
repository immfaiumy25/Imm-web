import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [newsCount, eventsCount, galleryCount] = await Promise.all([
    prisma.news.count(),
    prisma.event.count(),
    prisma.gallery.count(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">article</span>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Berita</p>
            <p className="text-3xl font-bold text-gray-900">{newsCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">event</span>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Agenda</p>
            <p className="text-3xl font-bold text-gray-900">{eventsCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">photo_library</span>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Foto Galeri</p>
            <p className="text-3xl font-bold text-gray-900">{galleryCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold mb-4">Selamat Datang di Admin Panel</h2>
        <p className="text-gray-600 leading-relaxed">
          Gunakan menu di sebelah kiri untuk mengelola konten website PK IMM FAI UMY. 
          Anda dapat menambah, mengubah, dan menghapus berita, agenda kegiatan, galeri foto, serta mengatur konfigurasi umum website.
        </p>
      </div>
    </div>
  );
}
