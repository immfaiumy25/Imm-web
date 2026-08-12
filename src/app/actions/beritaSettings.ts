"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBeritaSettings(dataStr: string) {
  await prisma.siteSetting.upsert({
    where: { key: "berita_page_data" },
    update: { value: dataStr },
    create: { key: "berita_page_data", value: dataStr },
  });

  revalidatePath("/admin/berita");
  revalidatePath("/");
}

export async function getBeritaSettings() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "berita_page_data" }
  });

  if (setting && setting.value) {
    try {
      return JSON.parse(setting.value);
    } catch (e) {
      console.error("Failed to parse berita settings");
    }
  }

  // Default values based on the original HTML
  return [
    {
      href: "https://share.google/ldoJxY0qIybghHsc9",
      image: "/berita/berita-1.jpg",
      source: "Kabar Muhammadiyah",
      title: "Menata Ulang Kompas Profetik: Penyusunan Alat Ukur Implementasi ISP dalam Grand Design PK IMM FAI UMY",
      description: "Agenda penyusunan alat ukur implementasi Ideologi, Strategi, dan Taktik Perjuangan (ISP) dalam kerangka Grand Design pergerakan komisariat.",
      date: "7 Juli 2026"
    },
    {
      href: "https://rri.co.id/yogyakarta/budaya/2590526/dahlan-culture-festival-2026-perkuat-dakwah-kultural-lewat-sastra-profetik?nocache=true",
      image: "/berita/berita-2.webp",
      source: "RRI Budaya",
      title: "Dahlan Culture Festival 2026 Perkuat Dakwah Kultural lewat Sastra Profetik",
      description: "IMM FAI UMY menggelar Dahlan Culture Festival 2026 sebagai ruang ekspresi bagi kader se-DIY untuk mengaktualisasikan kreativitas dan memperkuat dakwah kultural melalui sastra profetik.",
      date: "23 Juli 2026"
    },
    {
      href: "https://wartaptm.id/imm-fai-umy-luncurkan-majalah-bahlil-angkat-isu-perempuan-lewat-studium-generale/",
      image: "/berita/berita-3.jpg",
      source: "Warta PTM",
      title: "IMM FAI UMY Luncurkan Majalah BAHL1L, Angkat Isu Perempuan",
      description: "Peluncuran Majalah BAHL1L dan pelaksanaan studium generale yang mengangkat isu keperempuanan sebagai wujud nyata gerakan intelektual kader IMM FAI UMY.",
      date: "28 April 2026"
    }
  ];
}
