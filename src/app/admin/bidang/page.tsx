"use client";
import { useState, useEffect } from "react";
import { getBidangSettings, updateBidangSettings } from "@/app/actions/bidangSettings";
import SpotlightCard from "@/components/SpotlightCard";

export default function BidangPage() {
  const [data, setData] = useState<any[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getBidangSettings().then(d => setData(d));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await updateBidangSettings(JSON.stringify(data));
    setIsSaving(false);
    alert("Perubahan Bidang berhasil disimpan!");
  };

  const updateBidang = (index: number, field: string, value: string) => {
    if (!data) return;
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  if (!data) return <div className="text-white p-8">Loading visual editor...</div>;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
      {/* Floating Save Button */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-white text-[#c71212] px-6 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors border border-white/20"
        >
          <span className="material-symbols-outlined">{isSaving ? "sync" : "save"}</span>
          {isSaving ? "Menyimpan..." : "Simpan Bidang"}
        </button>
      </div>

      <style>{`
        /* Utility class for transparent editable inputs */
        .editable-text-white {
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 2px dashed rgba(255, 255, 255, 0.4);
          outline: none;
          width: 100%;
          transition: all 0.3s;
          color: white;
        }
        .editable-text-white:focus {
          background: rgba(255, 255, 255, 0.15);
          border-bottom: 2px solid rgba(255, 255, 255, 0.9);
        }
        
        /* For overriding width if needed */
        .editable-text-white.w-auto {
          width: auto;
        }
      `}</style>

      {/* ========================
          WYSIWYG BIDANG SECTION (Copied exactly from Landing Page)
          ======================== */}
      <section 
        className="relative w-full min-h-[80vh] text-white p-8 md:p-[60px] flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden pt-24"
        style={{ background: 'linear-gradient(135deg, #f8cf0f 0%, #f7aa09 15%, #f92727 55%, #c71212 100%)' }}
      >
        <h2 className="relative z-10 font-serif text-4xl md:text-6xl font-normal mb-12 text-white">Edit Bidang</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 w-full max-w-[1450px]">
          {data.map((bidang, i) => (
            <div 
              key={i} 
              className="p-6 md:p-8 flex flex-col justify-between group cursor-pointer h-full bg-white/20 border border-white/30 shadow-[0_8px_32px_0_rgba(109,1,0,0.37)] rounded-[32px]" 
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined text-3xl text-white">{bidang.icon}</span>
                </div>

                <input
                  type="text"
                  value={bidang.name}
                  onChange={(e) => updateBidang(i, "name", e.target.value)}
                  className="editable-text-white text-2xl font-serif font-normal text-white mb-3"
                  placeholder="Nama Bidang"
                />
                
                <textarea
                  value={bidang.desc}
                  onChange={(e) => updateBidang(i, "desc", e.target.value)}
                  className="editable-text-white text-white/90 font-light leading-relaxed resize-none"
                  rows={4}
                  placeholder="Deskripsi..."
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
