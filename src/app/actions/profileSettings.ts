"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfileSettings(dataStr: string) {
  await prisma.siteSetting.upsert({
    where: { key: "profile_page_data" },
    update: { value: dataStr },
    create: { key: "profile_page_data", value: dataStr },
  });

  revalidatePath("/admin/profil");
  revalidatePath("/");
}

export async function getProfileSettings() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "profile_page_data" }
  });

  if (setting && setting.value) {
    try {
      return JSON.parse(setting.value);
    } catch (e) {
      console.error("Failed to parse profile settings");
    }
  }

  // Default values
  return {
    mainTitle: "Menciptakan Kader Berintelektual Tinggi & Berakhlak Mulia",
    mainDesc: "Ikatan Mahasiswa Muhammadiyah (IMM) adalah organisasi otonom Muhammadiyah yang bergerak di bidang keagamaan, kemahasiswaan, dan kemasyarakatan. PK IMM FAI UMY berkomitmen untuk menjadi inkubator kepemimpinan yang berlandaskan Trilogi IMM: Keagamaan, Kemahasiswaan, dan Kemasyarakatan.",
    mainImage: "/Profileimm.jpg",
    pengurus: [
      {
        img: "/pengurus-4.png",
        name: "Agung Rezki",
        role: "Ketua Umum",
        batch: "PAI 23",
        desc: "Bertanggung jawab atas seluruh kegiatan manajerial dan operasional PK IMM FAI UMY."
      },
      {
        img: "/pengurus-3.png",
        name: "Zulfa Safinatun Najwa",
        role: "Sekretaris Umum",
        batch: "KPI 23",
        desc: "Mengurus administrasi, korespondensi, dan pengarsipan data organisasi."
      },
      {
        img: "/pengurus-1.png",
        name: "Safira Dewi Maharani",
        role: "Sekretaris Satu",
        batch: "Eksya 23",
        desc: "Membantu Sekretaris Umum dalam mengelola kesekretariatan dan pendataan."
      },
      {
        img: "/pengurus-2.png",
        name: "Alia Ghaza Partasti",
        role: "Bendahara Umum",
        batch: "Eksya 23",
        desc: "Mengelola sirkulasi keuangan organisasi dan pembukuan anggaran kepanitiaan."
      }
    ],
    visi: "\"Revitalisasi gerakan IMM FAI UMY yang mengutamakan perkaderan dan pergerakan berbasis nilai-nilai sehingga terciptanya gerakan yang inklusif dan adaptif\".",
    misi: "Reaktualisasi gerakan keilmuan sebagai basis terciptanya organisasi yang berintelektual.\nRevitalisasi metode perkaderan yang adaptif menyesuaikan modernisasi manusia.\nMengoptimalkan digitalisasi organisasi sebagai basis penguatan dakwah dan pergerakan.\nMembangun kepemimpinan yang berasaskan kolektif dan profesionalitas.\nMengusahakan pergerakan yang inklusif dengan top-down dan bottom-up.\nMemaksimalkan digitalisasi gerakan untuk memperluas jaringan dan penyebaran nilai profetik.\nInternalisasi pengembangan diri kader sehingga berdampak positif bagi lingkungan."
  };
}
