"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBidangSettings(dataStr: string) {
  await prisma.siteSetting.upsert({
    where: { key: "bidang_page_data" },
    update: { value: dataStr },
    create: { key: "bidang_page_data", value: dataStr },
  });

  revalidatePath("/admin/bidang");
  revalidatePath("/");
}

export async function getBidangSettings() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "bidang_page_data" }
  });

  if (setting && setting.value) {
    try {
      return JSON.parse(setting.value);
    } catch (e) {
      console.error("Failed to parse bidang settings");
    }
  }

  // Default values
  return [
    { name: "Organisasi", desc: "Penguatan sistem manajemen internal.", icon: "account_tree" },
    { name: "Kader", desc: "Fokus pada pengembangan anggota.", icon: "group_add" },
    { name: "Hikmah", desc: "Kajian isu strategis keumatan.", icon: "auto_stories" },
    { name: "Riset & Keilmuan", desc: "Pengembangan budaya literasi.", icon: "science" },
    { name: "Media & Komunikasi", desc: "Publikasi dan penyebaran syiar.", icon: "campaign" },
    { name: "Ekonomi & Kewirausahaan", desc: "Kemandirian finansial kader.", icon: "storefront" },
    { name: "Immawati", desc: "Pemberdayaan kader perempuan.", icon: "face_3" },
    { name: "Tabligh & Kajian Keislaman", desc: "Penguatan nilai religiusitas.", icon: "mosque" },
    { name: "Seni Budaya & Olahraga", desc: "Fasilitasi minat dan bakat.", icon: "sports_basketball" },
    { name: "Sosial Pemberdayaan Masyarakat", desc: "Pengabdian untuk umat.", icon: "volunteer_activism" },
  ];
}
