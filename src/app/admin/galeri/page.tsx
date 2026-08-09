import { prisma } from "@/lib/prisma";
import { deleteGallery } from "@/app/actions/gallery";
import Image from "next/image";

export default async function GaleriPage() {
  const gallery = await prisma.gallery.findMany({
    orderBy: { uploadedAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Galeri Foto</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-[#4B2025]">
          + Upload Foto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
            Belum ada foto galeri.
          </div>
        ) : (
          gallery.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src={item.imageUrl}
                  alt={item.caption || "Dokumentasi"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-sm text-gray-600 truncate max-w-[150px]">
                  {item.caption || "Tanpa Keterangan"}
                </span>
                <form action={deleteGallery.bind(null, item.id)}>
                  <button type="submit" className="text-red-500 hover:text-red-700 p-1">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
