"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from "@/app/actions/adminActions";
import { createPortal } from "react-dom";

export default function AdminManagementPage() {
  const { data: session } = useSession();
  const currentUserEmail = session?.user?.email;

  const [admins, setAdmins] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setPortalNode(document.body);
  }, []);

  const loadAdmins = async () => {
    setIsLoading(true);
    const data = await getAdmins();
    setAdmins(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setUsername("");
    setEmail("");
    setIsModalOpen(true);
  };

  const openEditModal = (admin: any) => {
    setEditingId(admin.id);
    setUsername(admin.username);
    setEmail(admin.email || "");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email) return alert("Username dan Email wajib diisi!");
    
    setIsLoading(true);
    try {
      if (editingId) {
        await updateAdmin(editingId, { username, email });
        alert("Admin berhasil diupdate!");
      } else {
        await createAdmin({ username, email });
        alert("Admin berhasil ditambahkan!");
      }
      setIsModalOpen(false);
      await loadAdmins();
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan.");
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, email: string) => {
    if (email === currentUserEmail) {
      alert("Anda tidak bisa menghapus diri sendiri!");
      return;
    }
    if (!confirm("Yakin ingin menghapus admin ini?")) return;
    
    setIsLoading(true);
    try {
      await deleteAdmin(id);
      await loadAdmins();
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-medium text-white drop-shadow-md">Kelola Admin</h1>
        <button 
          onClick={openAddModal}
          className="bg-white/20 text-white border border-white/30 px-6 py-2.5 rounded-xl hover:bg-white/30 transition-all font-medium shadow-sm"
        >
          + Tambah Admin
        </button>
      </div>

      {isModalOpen && portalNode && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent backdrop-blur-md p-4">
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-6 md:p-8 w-full max-w-lg text-white relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-2xl font-serif font-medium mb-6">{editingId ? "Edit Admin" : "Tambah Admin"}</h3>
            <form onSubmit={handleSave} className="flex flex-col gap-5">
              <div>
                <label className="text-sm text-white/80 font-light mb-1 block">Username *</label>
                <input 
                  type="text" 
                  value={username} onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-white/50 transition-colors text-white placeholder-white/30"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-white/80 font-light mb-1 block">Email *</label>
                <input 
                  type="email" 
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-white/50 transition-colors text-white placeholder-white/30"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-medium border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-[#f8cf0f] text-[#280000] px-8 py-2.5 rounded-xl font-semibold hover:bg-yellow-400 transition-colors shadow-sm"
                >
                  {isLoading ? "Memproses..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        portalNode
      )}

      <div className="bg-white/10 backdrop-blur-md rounded-[24px] border border-white/20 p-6 flex-1 overflow-auto">
        {isLoading && admins.length === 0 ? (
          <div className="text-white text-center py-20">Memuat data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admins.map((admin) => {
              const isMe = admin.email === currentUserEmail;
              return (
                <div key={admin.id} className="bg-white/5 border border-white/10 p-5 rounded-[20px] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-medium text-white">{admin.username}</h4>
                      {isMe && <span className="text-xs bg-[#f8cf0f] text-[#280000] px-2 py-1 rounded-lg font-bold">Anda</span>}
                    </div>
                    <p className="text-white/70 text-sm mb-4">{admin.email}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditModal(admin)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(admin.id, admin.email)}
                      className={\`flex-1 py-2 rounded-xl text-sm transition-colors \${isMe ? 'bg-red-500/20 text-red-300 opacity-50 cursor-not-allowed' : 'bg-red-500/20 text-red-300 hover:bg-red-500/40'}\`}
                      disabled={isMe}
                      title={isMe ? "Anda tidak bisa menghapus akun Anda sendiri" : "Hapus admin ini"}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
