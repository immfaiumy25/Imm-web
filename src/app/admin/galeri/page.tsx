"use client";
import { useState, useEffect } from "react";
import { getDokumentasiSettings, updateDokumentasiSettings } from "@/app/actions/dokumentasiSettings";

export default function GaleriPage() {
  const [data, setData] = useState<any[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getDokumentasiSettings().then(d => setData(d));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await updateDokumentasiSettings(JSON.stringify(data));
    setIsSaving(false);
    alert("Perubahan Dokumentasi berhasil disimpan!");
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
          {isSaving ? "Menyimpan..." : "Simpan Dokumentasi"}
        </button>
      </div>

      <style>{`
        /* Utility class for transparent editable inputs */
        .editable-text {
          background: rgba(255, 255, 255, 0.1);
          border-bottom: 2px dashed rgba(255, 255, 255, 0.4);
          outline: none;
          width: 100%;
          transition: all 0.3s;
          color: white;
        }
        .editable-text:focus {
          background: rgba(255, 255, 255, 0.2);
          border-bottom: 2px solid rgba(255, 255, 255, 0.9);
        }
      `}</style>

      {/* ========================
          WYSIWYG DOKUMENTASI SECTION (Matched to Landing Page)
          ======================== */}
      <section className="relative w-full min-h-[80vh] text-[#280000] p-8 md:p-[60px] flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden pt-24 bg-gray-50">
        <h2 className="relative z-10 font-serif text-4xl md:text-6xl font-normal mb-12 text-[#6d0100] text-center">Edit Dokumentasi</h2>
        
        <div className="w-full max-w-[1200px] mx-auto relative z-10 flex justify-center">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {data.map((card, i) => (
              <div
                key={i}
                className="relative rounded-[24px] overflow-hidden group border border-white/20 shadow-xl"
                style={{ backgroundColor: card.color, minHeight: '320px' }}
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  {card.image && (
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />
                </div>

                {/* Image Edit Overlay */}
                <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition-all text-xs font-bold flex items-center gap-1 shadow-lg">
                    <span className="material-symbols-outlined text-sm">image</span>
                    Ganti Foto
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(i, e)} />
                  </label>
                </div>

                {/* Content */}
                <div className="relative z-20 flex flex-col justify-end h-full p-6 text-white pt-16">
                  
                  {/* Label/Category */}
                  <div className="mb-3">
                    <input
                      type="text"
                      value={card.label}
                      onChange={(e) => updateCard(i, "label", e.target.value)}
                      className="editable-text text-xs uppercase tracking-widest font-medium opacity-80"
                      placeholder="Label (Contoh: Kaderisasi)"
                    />
                  </div>

                  {/* Title */}
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => updateCard(i, "title", e.target.value)}
                    className="editable-text text-2xl font-serif font-bold mb-2"
                    placeholder="Judul Kegiatan"
                  />
                  
                  {/* Description */}
                  <textarea
                    value={card.description}
                    onChange={(e) => updateCard(i, "description", e.target.value)}
                    className="editable-text text-sm text-white/80 leading-relaxed resize-none mt-2"
                    rows={3}
                    placeholder="Deskripsi kegiatan..."
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
