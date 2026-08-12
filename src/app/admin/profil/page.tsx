"use client";
import { useState, useEffect } from "react";
import { getProfileSettings, updateProfileSettings } from "@/app/actions/profileSettings";

export default function ProfilPage() {
  const [data, setData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getProfileSettings().then(d => setData(d));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await updateProfileSettings(JSON.stringify(data));
    setIsSaving(false);
    alert("Perubahan Profil berhasil disimpan!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
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
          const MAX = 800;
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
          callback(canvas.toDataURL("image/webp", 0.7));
        };
        img.src = ev.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  if (!data) return <div className="text-white p-8">Loading visual editor...</div>;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
      {/* Floating Save Button */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-[#6d0100] text-white px-6 py-3 rounded-xl shadow-2xl font-medium flex items-center gap-2 hover:bg-[#a90a05] transition-colors border border-white/20"
        >
          <span className="material-symbols-outlined">{isSaving ? "sync" : "save"}</span>
          {isSaving ? "Menyimpan..." : "Simpan Profil"}
        </button>
      </div>

      {/* ========================
          WYSIWYG PROFILE SECTION (Copied exactly from Landing Page)
          ======================== */}
      <section className="relative w-full bg-white text-[#280000] p-8 md:px-[60px] pb-[100px] md:pb-[200px] flex flex-col items-center justify-start pt-24 md:pt-32 overflow-hidden h-[80vh] overflow-y-auto">
        
        <style>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(40px, -50px) scale(1.1); }
            66% { transform: translate(-30px, 30px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 15s infinite alternate ease-in-out;
          }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          
          @keyframes sway {
            0% { transform: translateX(-10px); }
            100% { transform: translateX(10px); }
          }
          .animate-sway {
            animation: sway 8s ease-in-out infinite alternate;
          }
          
          /* Utility class for transparent editable inputs */
          .editable-text {
            background: rgba(249, 39, 39, 0.05);
            border-bottom: 2px dashed rgba(249, 39, 39, 0.3);
            outline: none;
            width: 100%;
            transition: all 0.3s;
          }
          .editable-text:focus {
            background: rgba(249, 39, 39, 0.1);
            border-bottom: 2px solid rgba(249, 39, 39, 0.8);
          }
        `}</style>

        {/* Ambient Glows & Background Wavy Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[5%] left-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[#f92727] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[150px] opacity-15 animate-blob"></div>
          <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#f7aa09] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[150px] opacity-15 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-5%] left-[10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#6d0100] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[150px] opacity-10 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 flex justify-center opacity-40 animate-sway">
            <svg width="100%" height="100%" viewBox="0 0 1000 3000" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="wavy-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f92727" stopOpacity="0" />
                  <stop offset="10%" stopColor="#f92727" stopOpacity="1" />
                  <stop offset="50%" stopColor="#f7aa09" stopOpacity="1" />
                  <stop offset="90%" stopColor="#6d0100" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6d0100" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 500,0 C 900,500 100,1000 500,1500 C 900,2000 100,2500 500,3000" fill="none" stroke="url(#wavy-gradient)" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[1450px] mx-auto text-center flex flex-col items-center gap-16 md:gap-24">
          
          <div className="flex flex-col items-center w-full max-w-[1000px]">
            <input
              type="text"
              value={data.mainTitle}
              onChange={(e) => setData({ ...data, mainTitle: e.target.value })}
              className="editable-text font-serif text-4xl md:text-6xl font-normal leading-tight tracking-tight mb-6 text-[#6d0100] text-center px-4 py-2"
              placeholder="Judul Utama"
            />
            <textarea
              value={data.mainDesc}
              onChange={(e) => setData({ ...data, mainDesc: e.target.value })}
              className="editable-text text-lg md:text-xl font-light text-gray-700 text-center resize-none w-full px-4 py-2"
              rows={4}
              placeholder="Deskripsi Utama"
            />
          </div>
          
          <div className="w-full relative group">
            <img 
              src={data.mainImage} 
              alt="Profile IMM FAI UMY" 
              className="w-full h-auto max-h-[80vh] object-cover rounded-[32px] shadow-2xl transition-opacity group-hover:opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <label className="bg-black/50 text-white px-6 py-3 rounded-xl cursor-pointer pointer-events-auto hover:bg-black/70 flex items-center gap-2">
                <span className="material-symbols-outlined">photo_camera</span>
                Ubah Gambar Utama
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e, (base64) => setData({ ...data, mainImage: base64 }))} 
                />
              </label>
            </div>
          </div>

          <div className="w-full mt-10">
            <h3 className="font-serif text-3xl md:text-4xl font-normal mb-12 text-[#6d0100] text-center md:text-left">Pengurus Harian</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
              
              {data.pengurus.map((p: any, idx: number) => {
                const gradients = [
                  "bg-[linear-gradient(135deg,#6d0100,#f92727)]",
                  "bg-[linear-gradient(135deg,#f8cf0f,#f7aa09)]",
                  "bg-[linear-gradient(135deg,#6d0100,#f92727)]",
                  "bg-[linear-gradient(135deg,#ffcfcf,#f92727)]"
                ];
                const borders = [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "40% 60% 70% 30% / 40% 50% 60% 50%",
                  "50% 50% 40% 60% / 60% 40% 70% 50%",
                  "70% 30% 50% 50% / 30% 60% 40% 70%"
                ];

                const updatePengurus = (field: string, val: string) => {
                  const newPengurus = [...data.pengurus];
                  newPengurus[idx][field] = val;
                  setData({ ...data, pengurus: newPengurus });
                };

                return (
                  <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 group">
                    <div className="relative w-48 h-48 flex-shrink-0 flex items-end justify-center group/img">
                      <div 
                        className={`absolute inset-0 ${gradients[idx % 4]} transition-all duration-500`}
                        style={{ borderRadius: borders[idx % 4] }}
                      ></div>
                      <div className="relative z-10 w-[90%] h-[120%] flex items-end justify-center">
                        <img 
                          src={p.img} 
                          className="w-full h-full object-contain object-bottom drop-shadow-2xl transition-opacity group-hover/img:opacity-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <label className="bg-black/60 text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">edit</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(e, (base64) => updatePengurus("img", base64))} 
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center text-center sm:text-left mt-4 sm:mt-8 w-full">
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => updatePengurus("name", e.target.value)}
                        className="editable-text font-serif text-2xl font-normal text-[#280000] px-2 py-1"
                        placeholder="Nama Pengurus"
                      />
                      <div className="flex flex-col gap-1 mt-2 w-full">
                        <input
                          type="text"
                          value={p.role}
                          onChange={(e) => updatePengurus("role", e.target.value)}
                          className={`editable-text font-medium text-lg px-2 py-1 w-full ${idx % 2 === 0 ? "text-[#6d0100]" : "text-[#f7aa09]"}`}
                          placeholder="Jabatan"
                        />
                        <div className="w-fit">
                          <input
                            type="text"
                            value={p.batch}
                            onChange={(e) => updatePengurus("batch", e.target.value)}
                            className="editable-text text-sm font-normal text-gray-500 px-2 py-1 w-24 text-left"
                            placeholder="Angkatan"
                          />
                        </div>
                      </div>
                      <textarea
                        value={p.desc}
                        onChange={(e) => updatePengurus("desc", e.target.value)}
                        className="editable-text text-gray-500 mt-2 text-sm w-full resize-none px-2 py-1"
                        rows={3}
                        placeholder="Deskripsi tugas..."
                      />
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          <div className="w-full mt-20">
            <h3 className="font-serif text-3xl md:text-4xl font-normal mb-12 text-[#6d0100] text-center">Visi dan Misi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow border border-white/50 flex flex-col items-center">
                <h4 className="font-serif text-2xl font-normal text-[#280000] mb-6">Visi</h4>
                <textarea
                  value={data.visi}
                  onChange={(e) => setData({ ...data, visi: e.target.value })}
                  className="editable-text text-gray-700 font-normal leading-relaxed text-center resize-none w-full px-4 py-2"
                  rows={5}
                />
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow border border-white/50 flex flex-col items-center w-full">
                <h4 className="font-serif text-2xl font-normal text-[#280000] mb-6">Misi</h4>
                <p className="text-xs text-gray-400 mb-2 w-full text-left">Gunakan baris baru (Enter) untuk memisahkan setiap poin misi.</p>
                <textarea
                  value={data.misi}
                  onChange={(e) => setData({ ...data, misi: e.target.value })}
                  className="editable-text text-gray-700 font-normal leading-relaxed resize-none w-full px-4 py-2"
                  rows={8}
                />
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
