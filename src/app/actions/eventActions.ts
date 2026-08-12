"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getEvents() {
  const events = await prisma.event.findMany({
    orderBy: { eventDate: "asc" }
  });
  return events;
}

export async function createEvent(data: { title: string; date: string; time?: string; location?: string; description?: string }) {
  await prisma.event.create({
    data: {
      title: data.title,
      eventDate: new Date(data.date),
      location: data.location || "",
      description: data.time || "", // We use description to store "time" for simplicity since it's just a text field
      status: "Upcoming",
    }
  });
  revalidatePath("/admin/kalender");
  revalidatePath("/");
}

export async function deleteEvent(id: number) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/kalender");
  revalidatePath("/");
}

export async function bulkImportEvents(events: { title: string; date: string }[]) {
  // Fetch existing events to check for duplicates
  const existingEvents = await prisma.event.findMany();
  const newEventsToInsert = [];

  for (const e of events) {
    const eDate = new Date(e.date);
    
    // Check if an event with exactly the same title and date exists
    const isDuplicate = existingEvents.some(
      (ex: any) => ex.title === e.title && ex.eventDate.getTime() === eDate.getTime()
    );
    
    if (!isDuplicate) {
      const newEvt = {
        title: e.title,
        eventDate: eDate,
        location: "",
        description: "", // No default time
        status: "Upcoming"
      };
      
      newEventsToInsert.push(newEvt);
      // Push to existingEvents to prevent duplicates within the CSV itself
      existingEvents.push({ ...newEvt, id: 0, createdAt: new Date(), updatedAt: new Date() } as any);
    }
  }

  if (newEventsToInsert.length > 0) {
    await prisma.event.createMany({
      data: newEventsToInsert
    });
  }
  
  revalidatePath("/admin/kalender");
  revalidatePath("/");
}
