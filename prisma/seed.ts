// prisma/seed.ts
import { PrismaClient, EventType } from "@prisma/client";
import { startOfDay } from "date-fns";

const prisma = new PrismaClient();
const todayStart = startOfDay(new Date());

async function main() {
  // --- Stations ---
  const inbound = await prisma.station.upsert({
    where: { name: "Inbound-1" },
    update: {},
    create: { name: "Inbound-1" },
  });

  const pack = await prisma.station.upsert({
    where: { name: "Pack-2" },
    update: {},
    create: { name: "Pack-2" },
  });

  // --- Workers ---
  const avery = await prisma.worker.upsert({
    where: { name: "Avery" },
    update: {},
    create: { name: "Avery", role: "associate" },
  });

  const rin = await prisma.worker.upsert({
    where: { name: "Rin" },
    update: {},
    create: { name: "Rin", role: "associate" },
  });

  // --- Shift ---
  const shift = await prisma.shift.create({
    data: {
      name: "Night A",
      date: new Date(),
      startedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      workers: {
        create: [{ workerId: avery.id }, { workerId: rin.id }],
      },
    },
  });

  // --- Random throughput / delay events for "today" (drives charts) ---

  function atHour(base: Date, hour: number, minute: number) {
    const d = new Date(base);
    d.setHours(hour, minute, 0, 0);
    return d;
  }

  const stations = await prisma.station.findMany({ select: { id: true } });
  // Hours 07:00 .. 18:00 (change the 7/12 if you want a wider range)
  const hours = Array.from({ length: 12 }, (_, i) => 7 + i);

  // Strongly typed createMany data array
  const events: Parameters<typeof prisma.event.createMany>[0]["data"] = [];

  for (const s of stations) {
    for (const h of hours) {
      // 1–3 throughput points per hour
      const throughputPoints = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < throughputPoints; i++) {
        const minute = Math.floor(Math.random() * 60);
        events.push({
          shiftId: shift.id,
          stationId: s.id,
          kind: EventType.THROUGHPUT,
          value: 100 + Math.floor(Math.random() * 150), // 100–250 units
          happenedAt: atHour(todayStart, h, minute),
        });
      }

      // ~30% chance of a small delay in this hour
      if (Math.random() < 0.3) {
        const minute = Math.floor(Math.random() * 60);
        events.push({
          shiftId: shift.id,
          stationId: s.id,
          kind: EventType.DELAY,
          value: 5 + Math.floor(Math.random() * 25), // 5–30 minutes
          happenedAt: atHour(todayStart, h, minute),
        });
      }
    }
  }

  await prisma.event.createMany({ data: events });
  console.log(`Seeded ${events.length} random events.`);
}

// Run
main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
