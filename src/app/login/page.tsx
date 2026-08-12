"use client";

import { useState, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const isSubmitting = useRef(false);
  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengirim OTP");
      }

      setStep("OTP");
      setCooldown(30);
      // Auto-focus OTP input after a short delay to allow render
      setTimeout(() => otpInputRef.current?.focus(), 100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    setLoading(true);
    setError("");

    if (otp.length < 6) {
      setError("Masukkan 6 digit kode OTP");
      setLoading(false);
      isSubmitting.current = false;
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        otp,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(-45deg, #6d0100, #a90a05, #f92727, #f8cf0f)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite"
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/10 blur-[100px] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-400/20 blur-[120px] pointer-events-none mix-blend-overlay"></div>
      
      {/* SVG Filters for Liquid Glass */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-glass-login">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
            <feBlend in="SourceGraphic" in2="liquid" />
          </filter>
        </defs>
      </svg>

      {/* Back to Home */}
      <Link href="/" className="absolute top-8 left-8 text-white/80 hover:text-white flex items-center gap-2 transition-colors z-20">
        <span className="material-symbols-outlined">arrow_back</span>
        <span className="font-medium tracking-wide">Kembali</span>
      </Link>

      {/* Login Card */}
      <div 
        className="w-full max-w-sm relative z-10 p-8 rounded-[32px] border border-white/30 shadow-[0_8px_32px_0_rgba(109,1,0,0.37)] flex flex-col items-center"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'url(#liquid-glass-login) blur(20px)',
          WebkitBackdropFilter: 'url(#liquid-glass-login) blur(20px)'
        }}
      >
        <div className="w-16 h-16 mb-6 drop-shadow-xl">
          <img 
            src="/logo.png" 
            alt="Logo IMM" 
            className="object-contain w-full h-full"
          />
        </div>

        <h1 className="text-2xl font-serif text-white mb-2 text-center drop-shadow-md">
          Portal Admin
        </h1>
        <p className="text-white/80 text-center mb-6 font-light text-xs">
          PK IMM FAI UMY
        </p>

        {error && (
          <div className="w-full bg-red-500/20 border border-red-500/50 text-white px-4 py-2.5 rounded-xl mb-5 text-xs text-center">
            {error}
          </div>
        )}

        {step === "EMAIL" ? (
          <form onSubmit={handleSendOtp} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-white/90 text-xs font-medium tracking-wide">
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email terdaftar"
                className="w-full bg-white/10 border border-white/20 focus:border-white/50 text-white placeholder-white/50 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full bg-white text-[#6d0100] hover:bg-gray-100 text-sm font-medium py-2.5 rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Mengirim OTP..." : "Kirim OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="otp" className="text-white/90 text-xs font-medium tracking-wide">
                Kode OTP
              </label>
              <p className="text-white/70 text-[10px] mb-2 leading-tight">
                Kode telah dikirim ke <strong>{email}</strong>
              </p>
              
              <div 
                className="relative flex justify-between gap-2 mt-1 cursor-text"
                onClick={() => otpInputRef.current?.focus()}
              >
                <input
                  id="otp"
                  ref={otpInputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-text"
                  required
                />
                
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`w-12 h-14 flex items-center justify-center bg-white/10 border ${
                      otp.length === index ? 'border-white/60 shadow-[0_0_12px_rgba(255,255,255,0.3)]' : 'border-white/20'
                    } text-white rounded-xl text-xl font-medium transition-all`}
                  >
                    {otp[index] || ""}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-[#6d0100] hover:bg-gray-100 text-sm font-medium py-2.5 rounded-xl shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Verifikasi..." : "Masuk"}
              </button>

              <button 
                type="button" 
                disabled={cooldown > 0 || loading}
                onClick={() => handleSendOtp()}
                className="w-full bg-transparent border border-white/50 text-white hover:bg-white/10 text-sm font-medium py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cooldown > 0 ? `Kirim Ulang OTP (${cooldown}s)` : "Kirim Ulang OTP"}
              </button>
            </div>

            <button 
              type="button"
              onClick={() => { setStep("EMAIL"); setOtp(""); setError(""); setCooldown(0); }}
              className="text-white/70 hover:text-white text-xs text-center mt-1 transition-colors"
            >
              Kembali
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
