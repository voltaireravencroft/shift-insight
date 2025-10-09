import { QuickLog } from '@/components/QuickLog';
import { ThroughputByHour } from '@/components/charts/ThroughputByHour';
import { DelayByStation } from '@/components/charts/DelayByStation';
import { prisma } from '@/lib/db';
import { getThroughputByHourToday, getDelayByStationToday } from '@/lib/analytics'

export default async function Page() {
  const [stations, tByHour, dByStation] = await Promise.all([
    prisma.station.findMany({ select: { id: true, name: true } }),
    getThroughputByHourToday(),
    getDelayByStationToday(),
  ]);

  return (
    <div className="space-y-6">
      {/* existing KPI cards… make them links to /shifts, /stations, /events */}

      <section className="rounded-2xl border p-4">
        <h3 className="mb-3 text-sm font-medium">Quick Log</h3>
        <QuickLog stations={stations} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-4">
          <h3 className="mb-3 text-sm font-medium">Throughput by Hour (today)</h3>
          <ThroughputByHour data={tByHour} />
        </div>
        <div className="rounded-2xl border p-4">
          <h3 className="mb-3 text-sm font-medium">Delay Minutes by Station (today)</h3>
          <DelayByStation data={dByStation} />
        </div>
      </section>
    </div>
  );
}
