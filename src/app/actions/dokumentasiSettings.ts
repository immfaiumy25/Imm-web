"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateDokumentasiSettings(dataStr: string) {
  await prisma.siteSetting.upsert({
    where: { key: "dokumentasi_page_data" },
    update: { value: dataStr },
    create: { key: "dokumentasi_page_data", value: dataStr },
  });

  revalidatePath("/admin/galeri");
  revalidatePath("/");
}

export async function getDokumentasiSettings() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "dokumentasi_page_data" }
  });

  if (setting && setting.value) {
    try {
      return JSON.parse(setting.value);
    } catch (e) {
      console.error("Failed to parse dokumentasi settings");
    }
  }

  // Default values
  return [
    {
      color: '#120F17',
      title: 'Sekolah Kader',
      description: 'Dokumentasi kegiatan kaderisasi untuk mencetak kader unggul IMM FAI UMY.',
      label: 'Kaderisasi',
      image: '/dokumentasi/sekolah-kader.jpeg'
    },
    {
      color: '#120F17',
      title: 'BAHL1L',
      description: 'Bahas Literasi 1 Lembar, diskusi santai namun bermakna untuk mengasah intelektual.',
      label: 'Intelektual',
      image: '/dokumentasi/bahlil.jpeg'
    },
    {
      color: '#120F17',
      title: 'FURAB',
      description: 'Fun Run Bersama Warga Desa Ledhok Timoho. Membangun kedekatan sosial melalui olahraga.',
      label: 'Masyarakat',
      image: '/dokumentasi/furab.jpeg'
    },
    {
      color: '#120F17',
      title: 'Saur On The Road',
      description: 'Aksi sosial berbagi makanan sahur untuk masyarakat sekitar di bulan Ramadhan.',
      label: 'Sosial',
      image: '/dokumentasi/saur-on-the-road.jpeg'
    },
    {
      color: '#120F17',
      title: 'Sekolah Lentera',
      description: 'Program pengabdian masyarakat untuk memberikan akses pendidikan yang lebih baik.',
      label: 'Pengabdian',
      image: '/dokumentasi/sekolah-lentera.jpeg'
    },
    {
      color: '#120F17',
      title: 'Malam Keakraban',
      description: 'Merekatkan ukhuwah antar kader PK IMM FAI UMY melalui kegiatan keakraban.',
      label: 'Organisasi',
      image: '/dokumentasi/makrab.jpeg'
    }
  ];
}
