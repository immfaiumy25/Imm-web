"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const eventDateStr = formData.get("eventDate") as string;
  const eventDate = new Date(eventDateStr);

  await prisma.event.create({
    data: {
      title,
      location,
      description,
      eventDate,
    },
  });

  revalidatePath("/admin/agenda");
  revalidatePath("/");
}

export async function deleteEvent(id: number) {
  await prisma.event.delete({
    where: { id },
  });

  revalidatePath("/admin/agenda");
  revalidatePath("/");
}
