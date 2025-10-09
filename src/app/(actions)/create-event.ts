'use server';

import { z } from 'zod';
import { prisma } from '@/lib/db'; // make sure this path matches your actual prisma helper
import { revalidatePath } from 'next/cache';

const EventSchema = z.object({
  stationId: z.string().min(1),
  kind: z.enum(['THROUGHPUT', 'DELAY']),
  value: z.coerce.number().int().positive(),
});

export async function createEvent(formData: FormData) {
  const parsed = EventSchema.safeParse({
    stationId: formData.get('stationId'),
    kind: formData.get('kind'),
    value: formData.get('value'),
  });

  if (!parsed.success) throw new Error('Invalid input');

  await prisma.event.create({
    data: {
      stationId: parsed.data.stationId,
      kind: parsed.data.kind as any,
      value: parsed.data.value,
      happenedAt: new Date(),
    },
  });

  // Refresh dashboard + events list if present
  revalidatePath('/');
  revalidatePath('/events');
}
