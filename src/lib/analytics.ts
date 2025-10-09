// src/lib/analytics.ts
import { prisma } from '@/lib/db'
import { startOfDay } from 'date-fns'

/** Sum THROUGHPUT values bucketed by hour for "today" */
export async function getThroughputByHourToday() {
  const start = startOfDay(new Date())

  const rows = await prisma.event.findMany({
    where: { kind: 'THROUGHPUT', happenedAt: { gte: start } },
    select: { happenedAt: true, value: true },
    orderBy: { happenedAt: 'asc' },
  })

  const buckets = new Map<string, number>()
  for (const r of rows) {
    const d = new Date(r.happenedAt)
    const hour = String(d.getHours()).padStart(2, '0') // "06", "14", ...
    buckets.set(hour, (buckets.get(hour) ?? 0) + (r.value ?? 0))
  }

  return Array.from(buckets.entries()).map(([hour, value]) => ({ hour, value }))
}

/** Sum DELAY minutes by station for "today" */
export async function getDelayByStationToday() {
  const start = startOfDay(new Date())

  const grouped = await prisma.event.groupBy({
    by: ['stationId'],
    where: { kind: 'DELAY', happenedAt: { gte: start } },
    _sum: { value: true },
  })

  const stationIds = grouped.map(g => g.stationId!).filter(Boolean)
  const stations = await prisma.station.findMany({
    where: { id: { in: stationIds } },
    select: { id: true, name: true },
  })
  const nameMap = new Map(stations.map(s => [s.id, s.name] as const))

  return grouped.map(g => ({
    station: nameMap.get(g.stationId!) ?? 'Unknown',
    minutes: g._sum.value ?? 0,
  }))
}
