-- Crear tabla de tendencias de mercado
CREATE TABLE IF NOT EXISTS market_trends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  sector TEXT NOT NULL,
  trend_data JSONB NOT NULL,
  forecast JSONB,
  period TEXT NOT NULL
);

-- Crear tabla de demanda de habilidades
CREATE TABLE IF NOT EXISTS skills_demand (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  skill_name TEXT NOT NULL,
  demand_score INTEGER NOT NULL,
  industry_relevance JSONB,
  trend_direction TEXT CHECK (trend_direction IN ('increasing', 'stable', 'decreasing'))
);

-- Crear tabla de insights de carreras
CREATE TABLE IF NOT EXISTS career_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  career_name TEXT NOT NULL,
  employment_rate NUMERIC NOT NULL,
  average_salary NUMERIC NOT NULL,
  growth_rate NUMERIC NOT NULL,
  required_skills TEXT[] NOT NULL,
  industry_demand JSONB,
  location_data JSONB
);

-- Crear índices para búsqueda
CREATE INDEX IF NOT EXISTS idx_market_trends_sector ON market_trends(sector);
CREATE INDEX IF NOT EXISTS idx_skills_demand_score ON skills_demand(demand_score DESC);
CREATE INDEX IF NOT EXISTS idx_career_insights_name ON career_insights(career_name);

