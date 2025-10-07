// prisma/seed.ts
import { PrismaClient, EventType } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  // Stations
  const inbound = await prisma.station.upsert({
    where: { name: "Inbound-1" },
    update: {},
    create: { name: "Inbound-1" },
  })
  const pack = await prisma.station.upsert({
    where: { name: "Pack-2" },
    update: {},
    create: { name: "Pack-2" },
  })

  // Workers
  const avery = await prisma.worker.upsert({
    where: { name: "Avery" },
    update: {},
    create: { name: "Avery", role: "associate" },
  })
  const rin = await prisma.worker.upsert({
    where: { name: "Rin" },
    update: {},
    create: { name: "Rin", role: "associate" },
  })

  // Shift
  const shift = await prisma.shift.create({
    data: {
      name: "Night A",
      date: new Date(),
      startedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      workers: {
        create: [{ workerId: avery.id }, { workerId: rin.id }],
      },
    },
  })

  // Events (some throughput + a delay)
  await prisma.event.createMany({
    data: [
      { shiftId: shift.id, stationId: pack.id, kind: EventType.THROUGHPUT, value: 120, happenedAt: new Date(Date.now() - 3*60*60*1000) },
      { shiftId: shift.id, stationId: pack.id, kind: EventType.DELAY,      value: 15,  happenedAt: new Date(Date.now() - 2*60*60*1000) },
      { shiftId: shift.id, stationId: inbound.id, kind: EventType.THROUGHPUT, value: 200, happenedAt: new Date(Date.now() - 60*60*1000) },
    ],
  })
}

main().then(() => prisma.$disconnect()).catch((e) => {
  console.error(e)
  return prisma.$disconnect().finally(() => process.exit(1))
})
