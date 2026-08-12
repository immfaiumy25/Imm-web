import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email harus diisi' }, { status: 400 });
    }

    // 1. Cek apakah email terdaftar
    const user = await prisma.user.findFirst({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Email tidak terdaftar.' }, { status: 404 });
    }

    // 2. Cek limit harian dan jeda waktu
    const existingOtp = await prisma.otpVerification.findUnique({
      where: { email }
    });

    const now = new Date();
    let newRequestCount = 1;

    if (existingOtp) {
      const lastRequestDate = new Date(existingOtp.lastRequestAt);
      
      const isSameDay = 
        now.getFullYear() === lastRequestDate.getFullYear() &&
        now.getMonth() === lastRequestDate.getMonth() &&
        now.getDate() === lastRequestDate.getDate();

      if (isSameDay) {
        // Cooldown check (30 seconds)
        const diffSeconds = (now.getTime() - lastRequestDate.getTime()) / 1000;
        
        // Hanya terapkan cooldown jika selisih waktu wajar (>= 0 dan < 30)
        // Jika diffSeconds negatif (misal karena perbedaan zona waktu DB saat penambahan kolom baru), abaikan cooldown
        if (diffSeconds >= 0 && diffSeconds < 30) {
          return NextResponse.json({ message: `Tunggu ${Math.ceil(30 - diffSeconds)} detik sebelum meminta OTP lagi.` }, { status: 429 });
        }

        // Daily limit check (max 3x)
        if (existingOtp.requestCount >= 3) {
          return NextResponse.json({ message: 'Batas permintaan OTP harian telah habis (Maks. 3x sehari).' }, { status: 429 });
        }
        
        newRequestCount = existingOtp.requestCount + 1;
      }
    }

    // 3. Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // Valid for 5 minutes

    // 4. Simpan ke database
    await prisma.otpVerification.upsert({
      where: { email },
      update: { otp, expiresAt, requestCount: newRequestCount, lastRequestAt: now },
      create: { email, otp, expiresAt, requestCount: 1, lastRequestAt: now }
    });

    // 4. Kirim email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'immfaiumy25@gmail.com',
        pass: 'nxlt cftn tudi pxpd', 
      },
    });

    const mailOptions = {
      from: 'immfaiumy25@gmail.com',
      to: email,
      subject: 'Kode OTP Login IMM',
      text: `Kode OTP Anda adalah: ${otp}. Kode ini berlaku selama 5 menit.`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #6d0100; text-align: center;">Login PK IMM FAI UMY</h2>
          <p>Halo,</p>
          <p>Anda mencoba login ke sistem administrasi PK IMM FAI UMY. Berikut adalah kode OTP Anda:</p>
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px solid #ddd;">
            <h1 style="margin: 0; color: #333; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>Kode ini hanya berlaku selama <strong>5 menit</strong>. Jangan berikan kode ini kepada siapa pun.</p>
          <br/>
          <p style="font-size: 12px; color: #888;">Jika Anda tidak merasa meminta OTP ini, abaikan saja email ini.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'OTP berhasil dikirim' }, { status: 200 });

  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
