import { prisma } from "@/lib/prisma";
import { deleteNews, createNews } from "@/app/actions/news";
import Image from "next/image";

export default async function BeritaPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Kelola Berita</h1>
        {/* Placeholder for Add button that would open a modal in a real app */}
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-[#4B2025]">
          + Tambah Berita
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Judul</th>
              <th className="p-4 font-medium">Penulis</th>
              <th className="p-4 font-medium">Tanggal</th>
              <th className="p-4 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {news.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Belum ada berita.
                </td>
              </tr>
            ) : (
              news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">{item.title}</td>
                  <td className="p-4 text-gray-600">{item.author?.username || "Admin"}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-4">
                    <form action={deleteNews.bind(null, item.id)}>
                      <button type="submit" className="text-red-500 hover:text-red-700 font-medium text-sm">
                        Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
