'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

type Row = { station: string; minutes: number };

export function DelayByStation({ data }: { data: Row[] }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="station" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="minutes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
