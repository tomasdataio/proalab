import { getOccupationalTrends } from "@/lib/data"
import { PieChartComponent, AreaChartComponent, BarChartComponent } from "@/components/ui/charts"

export async function TendenciasOcupacionalesContent() {
  const data = await getOccupationalTrends()

  return (
    <div className="grid gap-6 mt-6">
      <PieChartComponent data={data.pieChartData} />
      <AreaChartComponent data={data.areaChartData} />
      <BarChartComponent data={data.barChartData} />
    </div>
  )
}

