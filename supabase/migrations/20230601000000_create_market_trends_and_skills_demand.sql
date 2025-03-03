-- Crear tabla de tendencias de mercado si no existe
CREATE TABLE IF NOT EXISTS public.market_trends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  sector TEXT NOT NULL,
  trend_data JSONB NOT NULL,
  forecast JSONB,
  period TEXT NOT NULL
);

-- Crear tabla de demanda de habilidades si no existe
CREATE TABLE IF NOT EXISTS public.skills_demand (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  skill_name TEXT NOT NULL,
  demand_score INTEGER NOT NULL,
  industry_relevance JSONB,
  trend_direction TEXT CHECK (trend_direction IN ('increasing', 'stable', 'decreasing'))
);

-- Crear índices para búsqueda si no existen
CREATE INDEX IF NOT EXISTS idx_market_trends_sector ON public.market_trends(sector);
CREATE INDEX IF NOT EXISTS idx_skills_demand_score ON public.skills_demand(demand_score DESC);

