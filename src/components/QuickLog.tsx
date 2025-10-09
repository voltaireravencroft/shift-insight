'use client';

import { useTransition, useState } from 'react';
import { createEvent } from '@/app/(actions)/create-event';

type Option = { id: string; name: string };
export function QuickLog({ stations }: { stations: Option[] }) {
  const [stationId, setStationId] = useState(stations[0]?.id ?? '');
  const [isPending, start] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          await createEvent({
            stationId,
            kind: 'THROUGHPUT',
            value: 50, // simple demo value
          });
        });
      }}
      className="flex gap-2 items-center"
    >
      <select
        value={stationId}
        onChange={(e) => setStationId(e.target.value)}
        className="rounded border bg-transparent px-2 py-1"
      >
        {stations.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button
        disabled={isPending}
        className="rounded bg-white/10 px-3 py-1 hover:bg-white/20 disabled:opacity-50"
      >
        {isPending ? 'Logging…' : 'Quick Log'}
      </button>
    </form>
  );
}
