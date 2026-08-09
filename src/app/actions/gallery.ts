"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteGallery(id: number) {
  await prisma.gallery.delete({
    where: { id },
  });

  revalidatePath("/admin/galeri");
  revalidatePath("/");
}

// Creation is typically handled via a client form that uploads via API first,
// then calls a server action or API to save the DB record.
export async function createGalleryRecord(imageUrl: string, caption?: string) {
  await prisma.gallery.create({
    data: {
      imageUrl,
      caption,
    },
  });

  revalidatePath("/admin/galeri");
  revalidatePath("/");
}
