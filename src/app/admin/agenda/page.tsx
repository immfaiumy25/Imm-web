import { prisma } from "@/lib/prisma";
import { deleteEvent, createEvent } from "@/app/actions/events";

export default async function AgendaPage() {
  const events = await prisma.event.findMany({
    orderBy: { eventDate: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Kelola Agenda</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-[#4B2025]">
          + Tambah Agenda
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Nama Agenda</th>
              <th className="p-4 font-medium">Tanggal</th>
              <th className="p-4 font-medium">Lokasi</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Belum ada agenda.
                </td>
              </tr>
            ) : (
              events.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">{item.title}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(item.eventDate).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-4 text-gray-600">{item.location}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <form action={deleteEvent.bind(null, item.id)}>
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
