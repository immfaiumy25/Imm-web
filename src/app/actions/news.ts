"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNews(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  // Placeholder for author ID (in a real app, get from session)
  const authorId = 1; 

  await prisma.news.create({
    data: {
      title,
      content,
      imageUrl,
      slug,
      authorId,
    },
  });

  revalidatePath("/admin/berita");
  revalidatePath("/");
}

export async function deleteNews(id: number) {
  await prisma.news.delete({
    where: { id },
  });

  revalidatePath("/admin/berita");
  revalidatePath("/");
}
