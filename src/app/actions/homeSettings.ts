"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateHomeSettings(formData: FormData) {
  const heroTitle1 = formData.get("hero_title_1") as string;
  const heroTitle2 = formData.get("hero_title_2") as string;
  const heroDesc = formData.get("hero_description") as string;

  const updates = [
    { key: "hero_title_1", value: heroTitle1 },
    { key: "hero_title_2", value: heroTitle2 },
    { key: "hero_description", value: heroDesc },
  ].filter(item => item.value !== null);

  for (const item of updates) {
    await prisma.siteSetting.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: { key: item.key, value: item.value },
    });
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}

export async function getHomeSettings() {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: ["hero_title_1", "hero_title_2", "hero_description"]
      }
    }
  });

  const getVal = (key: string, def: string) => settings.find(s => s.key === key)?.value || def;

  return {
    hero_title_1: getVal("hero_title_1", "Bergerak Bersama "),
    hero_title_2: getVal("hero_title_2", "Berkarya untuk Peradaban"),
    hero_description: getVal("hero_description", "Pimpinan Komisariat Ikatan Mahasiswa Muhammadiyah Fakultas Agama Islam Universitas Muhammadiyah Yogyakarta adalah wadah perkaderan yang progresif, mengintegrasikan intelektualitas, spiritualitas, dan humanitas untuk membangun generasi emas masa depan.")
  };
}
