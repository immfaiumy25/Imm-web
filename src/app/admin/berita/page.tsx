"use client";
import { useState, useEffect } from "react";
import { getBeritaSettings, updateBeritaSettings } from "@/app/actions/beritaSettings";

export default function BeritaPage() {
  const [data, setData] = useState<any[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getBeritaSettings().then(d => setData(d));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await updateBeritaSettings(JSON.stringify(data));
    setIsSaving(false);
    alert("Perubahan Berita berhasil disimpan!");
  };

  const updateCard = (index: number, field: string, value: string) => {
    if (!data) return;
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const MAX = 1000;
          if (width > height && width > MAX) {
            height *= MAX / width;
            width = MAX;
          } else if (height > MAX) {
            width *= MAX / height;
            height = MAX;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          updateCard(index, "image", canvas.toDataURL("image/webp", 0.7));
        };
        img.src = ev.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  if (!data) return <div className="text-white p-8">Loading visual editor...</div>;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[#280000]/20 shadow-2xl bg-white">
      {/* Floating Save Button */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-[#6d0100] text-white px-6 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-2 hover:bg-[#a90a05] transition-colors border border-white/20"
        >
          <span className="material-symbols-outlined">{isSaving ? "sync" : "save"}</span>
          {isSaving ? "Menyimpan..." : "Simpan Berita"}
        </button>
      </div>

      <style>{`
        /* Utility class for transparent editable inputs */
        .editable-text-dark {
          background: rgba(0, 0, 0, 0.05);
          border-bottom: 2px dashed rgba(0, 0, 0, 0.3);
          outline: none;
          width: 100%;
          transition: all 0.3s;
          color: #280000;
        }
        .editable-text-dark:focus {
          background: rgba(0, 0, 0, 0.1);
          border-bottom: 2px solid rgba(109, 1, 0, 0.9);
        }
      `}</style>

      {/* ========================
          WYSIWYG BERITA SECTION (Matched to Landing Page)
          ======================== */}
      <section className="relative w-full min-h-[80vh] text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden pt-24 bg-gray-50">
        <h2 className="relative z-10 font-serif text-4xl md:text-6xl font-normal mb-12 text-[#6d0100] text-center">Edit Berita & Artikel</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px] relative z-10">
          {data.map((berita, i) => (
            <div 
              key={i}
              className="w-full h-full rounded-[24px] flex flex-col shadow-xl overflow-hidden group relative"
              style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Image Edit Overlay */}
              <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <label className="bg-black/50 backdrop-blur-md border border-white/30 text-white px-3 py-2 rounded-xl cursor-pointer hover:bg-black/70 transition-all text-xs font-bold flex items-center gap-1 shadow-lg">
                  <span className="material-symbols-outlined text-sm">image</span>
                  Ganti Foto
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(i, e)} />
                </label>
              </div>

              <div className="w-full h-48 relative overflow-hidden bg-gray-200">
                <img src={berita.image} alt={berita.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                {/* Source */}
                <input
                  type="text"
                  value={berita.source}
                  onChange={(e) => updateCard(i, "source", e.target.value)}
                  className="editable-text-dark text-xs font-normal text-gray-500 tracking-wider mb-3"
                  placeholder="Sumber (Contoh: Kabar Muhammadiyah)"
                />

                {/* Title */}
                <textarea
                  value={berita.title}
                  onChange={(e) => updateCard(i, "title", e.target.value)}
                  className="editable-text-dark text-xl font-serif text-[#280000] mb-3 leading-snug resize-none"
                  rows={2}
                  placeholder="Judul Berita"
                />

                {/* Description */}
                <textarea
                  value={berita.description}
                  onChange={(e) => updateCard(i, "description", e.target.value)}
                  className="editable-text-dark text-gray-600 text-sm flex-grow mb-6 font-normal resize-none"
                  rows={4}
                  placeholder="Cuplikan berita..."
                />

                {/* Date & Link */}
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="text"
                    value={berita.date}
                    onChange={(e) => updateCard(i, "date", e.target.value)}
                    className="editable-text-dark text-xs text-gray-500 font-normal w-1/3"
                    placeholder="Tanggal"
                  />
                  <input
                    type="text"
                    value={berita.href}
                    onChange={(e) => updateCard(i, "href", e.target.value)}
                    className="editable-text-dark text-xs text-blue-600 font-normal w-2/3 text-right"
                    placeholder="Link URL Artikel (https://...)"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
