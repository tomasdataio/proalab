import { supabase } from "./supabase"

export async function getOccupationalTrends() {
  // Implementa la lógica para obtener datos de Supabase
  const { data, error } = await supabase.from("occupational_trends").select("*")

  if (error) {
    console.error("Error fetching occupational trends:", error)
    return null
  }

  // Procesa los datos para los diferentes tipos de gráficos
  return {
    pieChartData: processPieChartData(data),
    areaChartData: processAreaChartData(data),
    barChartData: processBarChartData(data),
  }
}

interface ChartItem {
  [key: string]: any;
}

function processPieChartData(data: ChartItem[] | null) {
  // Si no hay datos, devolver datos de ejemplo
  if (!data || data.length === 0) {
    return [
      { name: "Categoría 1", value: 30, fill: "hsl(var(--chart-1))" },
      { name: "Categoría 2", value: 25, fill: "hsl(var(--chart-2))" },
      { name: "Categoría 3", value: 20, fill: "hsl(var(--chart-3))" },
      { name: "Categoría 4", value: 15, fill: "hsl(var(--chart-4))" },
      { name: "Categoría 5", value: 10, fill: "hsl(var(--chart-5))" },
    ]
  }

  // Agrupar datos por alguna categoría (por ejemplo, ocupación)
  const groupedData = data.reduce((acc: { [key: string]: number }, item: ChartItem) => {
    const key = item.occupation || item.category || "Otros"
    if (!acc[key]) {
      acc[key] = 0
    }
    acc[key] += 1
    return acc
  }, {})

  // Convertir a formato para gráfico de torta
  return Object.entries(groupedData).map(([name, value], index) => ({
    name,
    value,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`
  }))
}

function processAreaChartData(data: ChartItem[] | null) {
  // Si no hay datos, devolver datos de ejemplo
  if (!data || data.length === 0) {
    return [
      { month: "Enero", value1: 100, value2: 80 },
      { month: "Febrero", value1: 120, value2: 90 },
      { month: "Marzo", value1: 140, value2: 100 },
      { month: "Abril", value1: 160, value2: 110 },
      { month: "Mayo", value1: 180, value2: 120 },
      { month: "Junio", value1: 200, value2: 130 },
    ]
  }

  // Agrupar datos por fecha
  const groupedData = data.reduce((acc: { [key: string]: { month: string, value1: number, value2: number } }, item: ChartItem) => {
    const date = new Date(item.date || item.created_at || new Date())
    const month = date.toLocaleDateString('es-ES', { month: 'long' })
    
    if (!acc[month]) {
      acc[month] = { month, value1: 0, value2: 0 }
    }
    
    acc[month].value1 += item.value1 || item.demand_index || 1
    acc[month].value2 += item.value2 || item.growth_rate || 0
    
    return acc
  }, {})

  // Convertir a array y ordenar por mes
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  return Object.values(groupedData).sort((a: { month: string }, b: { month: string }) => {
    return months.indexOf(a.month.toLowerCase()) - months.indexOf(b.month.toLowerCase())
  })
}

function processBarChartData(data: ChartItem[] | null) {
  // Si no hay datos, devolver datos de ejemplo
  if (!data || data.length === 0) {
    return [
      { category: "Categoría 1", value: 100 },
      { category: "Categoría 2", value: 200 },
      { category: "Categoría 3", value: 150 },
      { category: "Categoría 4", value: 300 },
      { category: "Categoría 5", value: 250 },
    ]
  }

  // Agrupar datos por alguna categoría (por ejemplo, región)
  const groupedData = data.reduce((acc: { [key: string]: { category: string, value: number, count: number } }, item: ChartItem) => {
    const key = item.region || item.category || "Otros"
    if (!acc[key]) {
      acc[key] = { category: key, value: 0, count: 0 }
    }
    acc[key].value += item.value || item.avg_salary || 1
    acc[key].count += 1
    return acc
  }, {})

  // Calcular promedios y convertir a formato para gráfico de barras
  return Object.values(groupedData).map((item: { category: string, value: number, count: number }) => ({
    category: item.category,
    value: Math.round(item.value / item.count)
  }))
}

// Implementa funciones similares para otros dashboards
