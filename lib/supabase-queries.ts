// export async function getTendenciasOcupacionales(filters: any = {}) {
//   let query = supabase.from("tendencias_ocupacionales").select("*")
//
//   if (filters.fechaInicio) {
//     query = query.gte("fecha", filters.fechaInicio)
//   }
//   if (filters.fechaFin) {
//     query = query.lte("fecha", filters.fechaFin)
//   }
//   if (filters.ocupacion && filters.ocupacion !== "todas") {
//     query = query.eq("ocupacion", filters.ocupacion)
//   }
//   if (filters.region && filters.region !== "todas") {
//     query = query.eq("region", filters.region)
//   }
//
//   const { data, error } = await query
//
//   if (error) {
//     console.error("Error fetching tendencias ocupacionales:", error)
//     return null
//   }
//
//   return data
// }

// export async function getDistribucionInstitucional(filters: any = {}) {
//   let query = supabase.from("distribucion_institucional").select("*")
//
//   if (filters.tipo && filters.tipo !== "todas") {
//     query = query.eq("tipo", filters.tipo)
//   }
//   if (filters.acreditacion && filters.acreditacion !== "todos") {
//     query = query.eq("acreditacion", filters.acreditacion)
//   }
//   if (filters.region && filters.region !== "todas") {
//     query = query.eq("region", filters.region)
//   }
//
//   const { data, error } = await query
//
//   if (error) {
//     console.error("Error fetching distribución institucional:", error)
//     return null
//   }
//
//   return data
// }

// Añade más funciones para otras tablas y consultas según sea necesario

