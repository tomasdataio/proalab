import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Datos de ejemplo para market_trends
    await supabase.from("market_trends").insert([
      {
        sector: "Tecnología",
        trend_data: {
          data: [
            { date: "2023-01", value: 100 },
            { date: "2023-02", value: 120 },
            { date: "2023-03", value: 150 },
          ],
        },
        forecast: {
          prediction: [
            { date: "2023-04", value: 180 },
            { date: "2023-05", value: 200 },
          ],
        },
        period: "2023-Q1",
      },
    ])

    // Datos de ejemplo para skills_demand
    await supabase.from("skills_demand").insert([
      {
        skill_name: "Python",
        demand_score: 95,
        industry_relevance: {
          tech: 0.9,
          finance: 0.8,
          healthcare: 0.6,
        },
        trend_direction: "increasing",
      },
      {
        skill_name: "Data Analysis",
        demand_score: 90,
        industry_relevance: {
          tech: 0.8,
          finance: 0.9,
          healthcare: 0.7,
        },
        trend_direction: "increasing",
      },
    ])

    // Datos de ejemplo para career_insights
    await supabase.from("career_insights").insert([
      {
        career_name: "Data Science",
        employment_rate: 95,
        average_salary: 85000,
        growth_rate: 15,
        required_skills: ["Python", "SQL", "Machine Learning"],
        industry_demand: {
          tech: 0.9,
          finance: 0.8,
          healthcare: 0.7,
        },
        location_data: {
          regions: {
            "us-east": 0.8,
            "us-west": 0.9,
            europe: 0.7,
          },
        },
      },
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Error seeding database" }, { status: 500 })
  }
}

