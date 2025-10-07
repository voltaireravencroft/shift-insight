import { prisma } from "@/lib/db"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Factory, Boxes, Activity } from "lucide-react"

export default async function Page() {
  const [shiftCount, stationCount, eventCount] = await Promise.all([
    prisma.shift.count(),
    prisma.station.count(),
    prisma.event.count(),
  ])

  const Stat = ({
    title, value, Icon,
  }: {
    title: string
    value: number | string
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }) => (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
        <Icon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-extrabold">{value}</div>
      </CardContent>
    </Card>
  )

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Shift Insight</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat title="Shifts" value={shiftCount} Icon={Factory} />
        <Stat title="Stations" value={stationCount} Icon={Boxes} />
        <Stat title="Events" value={eventCount} Icon={Activity} />
      </div>
    </main>
  )
}
