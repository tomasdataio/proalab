export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      market_trends: {
        Row: {
          id: string
          created_at: string
          sector: string
          trend_data: Json
          forecast: Json
          period: string
        }
        Insert: {
          id?: string
          created_at?: string
          sector: string
          trend_data: Json
          forecast: Json
          period: string
        }
        Update: {
          id?: string
          created_at?: string
          sector?: string
          trend_data?: Json
          forecast?: Json
          period?: string
        }
      }
      skills_demand: {
        Row: {
          id: string
          created_at: string
          skill_name: string
          demand_score: number
          industry_relevance: Json
          trend_direction: "increasing" | "stable" | "decreasing"
        }
        Insert: {
          id?: string
          created_at?: string
          skill_name: string
          demand_score: number
          industry_relevance: Json
          trend_direction: "increasing" | "stable" | "decreasing"
        }
        Update: {
          id?: string
          created_at?: string
          skill_name?: string
          demand_score?: number
          industry_relevance?: Json
          trend_direction?: "increasing" | "stable" | "decreasing"
        }
      }
      career_insights: {
        Row: {
          id: string
          created_at: string
          career_name: string
          employment_rate: number
          average_salary: number
          growth_rate: number
          required_skills: string[]
          industry_demand: Json
          location_data: Json
        }
        Insert: {
          id?: string
          created_at?: string
          career_name: string
          employment_rate: number
          average_salary: number
          growth_rate: number
          required_skills: string[]
          industry_demand: Json
          location_data: Json
        }
        Update: {
          id?: string
          created_at?: string
          career_name?: string
          employment_rate?: number
          average_salary?: number
          growth_rate?: number
          required_skills?: string[]
          industry_demand?: Json
          location_data?: Json
        }
      }
    }
  }
}

