"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSetting(key: string, value: string) {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export async function updateAllSettings(formData: FormData) {
  const ctaLink = formData.get("cta_registration_url") as string;
  const contactWa = formData.get("contact_whatsapp") as string;

  if (ctaLink !== null) {
    await prisma.siteSetting.upsert({
      where: { key: "cta_registration_url" },
      update: { value: ctaLink },
      create: { key: "cta_registration_url", value: ctaLink },
    });
  }

  if (contactWa !== null) {
    await prisma.siteSetting.upsert({
      where: { key: "contact_whatsapp" },
      update: { value: contactWa },
      create: { key: "contact_whatsapp", value: contactWa },
    });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
