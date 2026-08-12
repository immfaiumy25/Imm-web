"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  const settings = await prisma.siteSetting.findMany();
  return settings.reduce((acc, cur) => {
    acc[cur.key] = cur.value;
    return acc;
  }, {} as Record<string, string>);
}

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
  const keys = [
    "footer_description",
    "cta_registration_url",
    "contact_instagram",
    "contact_email",
    "contact_whatsapp",
    "footer_address"
  ];

  for (const key of keys) {
    const value = formData.get(key);
    if (value !== null) {
      const valStr = value.toString();
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: valStr },
        create: { key, value: valStr },
      });
    }
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
