"use client";
import { useState, useEffect } from "react";
import { getEvents, createEvent, deleteEvent, bulkImportEvents } from "@/app/actions/eventActions";
import { createPortal } from "react-dom";
import IMMCalendar from "@/components/IMMCalendar";

export default function AgendaPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // State for portal container
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPortalNode(document.body);
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    const data = await getEvents();
    setEvents(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return alert("Judul dan Tanggal wajib diisi!");
    
    setIsLoading(true);
    await createEvent({ title, date, time, location });
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setIsAdding(false);
    await loadEvents();
    alert("Kegiatan berhasil ditambahkan!");
  };

  const handleSelectDate = (d: Date) => {
    setSelectedDate(d);
    // Format to YYYY-MM-DD for the date input
    const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    setDate(dateString);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus kegiatan ini?")) return;
    setIsLoading(true);
    await deleteEvent(id);
    await loadEvents();
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split('\n').map(line => line.trim());
      const extractedEvents: { title: string; date: string }[] = [];
      const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

      let currentColumnDates: { [colIndex: number]: string } = {};

      for (let i = 0; i < lines.length; i++) {
        const columns = lines[i].split(',');

        for (let col = 0; col < columns.length; col++) {
          const cell = columns[col].trim();
          if (!cell) continue;

          if (dateRegex.test(cell)) {
            currentColumnDates[col] = cell;
          } else {
            if (currentColumnDates[col]) {
              extractedEvents.push({
                title: cell,
                date: currentColumnDates[col]
              });
            }
          }
        }
      }

      if (extractedEvents.length === 0) {
        alert("Tidak ada kegiatan yang ditemukan di CSV dengan format tersebut.");
        return;
      }

      if (confirm(`Ditemukan ${extractedEvents.length} kegiatan dari CSV. Tambahkan ke kalender?`)) {
        setIsLoading(true);
        await bulkImportEvents(extractedEvents);
        await loadEvents();
        alert("Berhasil import CSV!");
      }
      
      e.target.value = '';
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-medium text-white drop-shadow-md">Kelola Agenda</h1>
        
        <div className="flex gap-3">
          <label className={`bg-[#107c41] text-white border border-white/30 px-6 py-2.5 rounded-xl hover:bg-[#0c5e31] transition-all font-medium shadow-sm cursor-pointer flex items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <span className="material-symbols-outlined text-sm">upload_file</span>
            {isLoading ? "Memproses..." : "Upload CSV"}
            <input type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} disabled={isLoading} />
          </label>
          <button 
            onClick={() => {
              setIsAdding(!isAdding);
              if (!isAdding) {
                // Ensure form date reflects current selectedDate when opening
                const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
                setDate(dateString);
              }
            }}
            className="bg-white/20 text-white border border-white/30 px-6 py-2.5 rounded-xl hover:bg-white/30 transition-all font-medium shadow-sm"
          >
            {isAdding ? "Batal Tambah" : "+ Tambah Agenda"}
          </button>
        </div>
      </div>

      {/* Popup Modal untuk Tambah Agenda */}
      {isAdding && portalNode && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent backdrop-blur-md p-4">
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 md:p-8 w-full max-w-2xl text-white relative">
            <button 
              onClick={() => setIsAdding(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-serif font-medium mb-6">Tambah Agenda Baru</h3>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-white/80 font-light mb-1 block">Judul Kegiatan *</label>
                <input 
                  type="text" 
                  value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-white/50 transition-colors text-white placeholder-white/30"
                  placeholder="Contoh: Darul Arqam Dasar"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/80 font-light mb-1 block">Tanggal *</label>
                <input 
                  type="date" 
                  value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-white/50 transition-colors text-white [color-scheme:dark]"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/80 font-light mb-1 block">Jam (Opsional)</label>
                <input 
                  type="text" 
                  value={time} onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-white/50 transition-colors text-white placeholder-white/30"
                  placeholder="Contoh: 08:00 WIB"
                />
              </div>
              <div>
                <label className="text-sm text-white/80 font-light mb-1 block">Lokasi (Opsional)</label>
                <input 
                  type="text" 
                  value={location} onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-white/50 transition-colors text-white placeholder-white/30"
                  placeholder="Contoh: Pusbang"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2.5 rounded-xl font-medium border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-[#f8cf0f] text-[#280000] px-8 py-2.5 rounded-xl font-semibold hover:bg-yellow-400 transition-colors shadow-sm"
                >
                  {isLoading ? "Memproses..." : "Simpan Kegiatan"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        portalNode
      )}

      <div className="w-full flex-grow">
        {isLoading && events.length === 0 ? (
          <div className="text-white text-center py-20">Memuat Kalender...</div>
        ) : (
          <IMMCalendar 
            events={events} 
            isAdmin={true} 
            onDeleteEvent={handleDelete} 
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
          />
        )}
      </div>
    </div>
  );
}
