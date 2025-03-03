import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"

async function getMarketTrends() {
  const { data, error } = await supabase
    .from("market_trends")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching market trends:", error)
    return null
  }
  return data
}

async function getTopSkills() {
  const { data, error } = await supabase
    .from("skills_demand")
    .select("*")
    .order("demand_score", { ascending: false })
    .limit(5)

  if (error) {
    console.error("Error fetching top skills:", error)
    return []
  }
  return data
}

export default async function MercadoLaboral() {
  // Changed function name
  const [marketTrends, topSkills] = await Promise.all([getMarketTrends(), getTopSkills()])

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Dashboard de Mercado Laboral</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendencias del Mercado</CardTitle>
          </CardHeader>
          <CardContent>
            {marketTrends ? (
              <Chart data={marketTrends.trend_data.data} xKey="date" yKey="value" />
            ) : (
              <p>No se pudieron cargar los datos de tendencias del mercado.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Habilidades Demandadas</CardTitle>
          </CardHeader>
          <CardContent>
            {topSkills.length > 0 ? (
              <ul>
                {topSkills.map((skill) => (
                  <li key={skill.id} className="flex justify-between items-center mb-2">
                    <span>{skill.skill_name}</span>
                    <span className="font-bold">{skill.demand_score}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se pudieron cargar los datos de habilidades demandadas.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

