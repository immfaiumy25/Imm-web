"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const username = session?.user?.name || "Admin";
  const initial = username.charAt(0).toUpperCase();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Home", href: "/admin/dashboard", icon: "dashboard" },
    { name: "Profil", href: "/admin/profil", icon: "badge" },
    { name: "Bidang", href: "/admin/bidang", icon: "work" },
    { name: "Dokumentasi", href: "/admin/galeri", icon: "photo_library" },
    { name: "Berita", href: "/admin/berita", icon: "article" },
    { name: "Kalender", href: "/admin/agenda", icon: "event" },
    { name: "Kontak", href: "/admin/settings", icon: "contacts" },
    { name: "Kelola Admin", href: "/admin/admins", icon: "manage_accounts" },
  ];

  return (
    <div 
      className="flex h-screen w-full relative overflow-hidden p-2 sm:p-4 md:p-6 gap-0 md:gap-6"
      style={{
        background: "linear-gradient(-45deg, #6d0100, #a90a05, #f92727, #f8cf0f)",
        backgroundSize: "400% 400%",
        animation: "adminGradientBG 15s ease infinite"
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes adminGradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
      
      {/* Background Blobs for Glass Effect */}
      <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-white/10 blur-[80px] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[25%] h-[25%] rounded-full bg-yellow-400/20 blur-[100px] pointer-events-none mix-blend-overlay"></div>

      {/* Liquid Glass Sidebar (Card Form) */}
      <aside 
        className={`w-64 flex flex-col absolute md:relative z-[60] rounded-[32px] border border-white/30 shadow-[0_8px_32px_0_rgba(109,1,0,0.37)] overflow-hidden h-[calc(100%-16px)] sm:h-[calc(100%-32px)] md:h-full transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-[120%] md:translate-x-0'}`}
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div className="h-24 flex flex-col items-center justify-center border-b border-white/10">
          <span className="font-medium text-lg text-white">PK IMM FAI UMY</span>
          <span className="text-xs text-white/60 font-light">Portal Admin</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-normal ${
                  isActive
                    ? "bg-white/25 text-white shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] border border-white/40"
                    : "text-white/70 hover:bg-white/10 hover:text-white border border-transparent"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl text-white/70 hover:bg-white/20 hover:text-white w-full transition-all font-normal"
          >
            <span className="material-symbols-outlined">logout</span>
            Keluar
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[50] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main 
        className="flex-1 flex flex-col relative z-10 rounded-[32px] border border-white/30 shadow-[0_8px_32px_0_rgba(109,1,0,0.37)] overflow-hidden h-full"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-4 sm:px-8 bg-white/5">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="text-white font-medium truncate hidden sm:block">Dashboard</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-normal text-white/80 text-sm">Hai, {username}</span>
            <div className="w-10 h-10 rounded-full bg-white text-[#6d0100] flex items-center justify-center font-medium shadow-md">
              {initial}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
