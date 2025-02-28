import { notFound } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"
import { DashboardContainer } from "@/components/ui/dashboard-container"
import { Skeleton } from "@/components/ui/skeleton"
import { supabase } from "@/lib/supabase"

async function getCareerInsights(id: string) {
  const { data, error } = await supabase.from("career_insights").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching career insights:", error)
    return null
  }

  return data
}

export default async function CareerPage({ params }: { params: { id: string } }) {
  const careerData = await getCareerInsights(params.id)

  if (!careerData) {
    notFound()
  }

  return (
    <DashboardContainer className="py-10">
      <h1 className="text-3xl font-bold mb-6">{careerData.career_name}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<Skeleton className="h-[200px]" />}>
          <EmploymentRateCard data={careerData} />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[200px]" />}>
          <SalaryTrendCard data={careerData} />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[200px]" />}>
          <TopSkillsCard data={careerData} />
        </Suspense>
      </div>
    </DashboardContainer>
  )
}

function EmploymentRateCard({ data }: { data: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasa de Empleo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center text-[#FF7B7B]">{data.employment_rate}%</div>
      </CardContent>
    </Card>
  )
}

function SalaryTrendCard({ data }: { data: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendencia Salarial</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart data={data.salary_trend} xKey="year" yKey="salary" />
      </CardContent>
    </Card>
  )
}

function TopSkillsCard({ data }: { data: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Habilidades Requeridas</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data.required_skills.map((skill: string, index: number) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-[#FF7B7B] rounded-full mr-2"></span>
              {skill}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

