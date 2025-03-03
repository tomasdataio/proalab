import { supabase, supabaseAdmin } from "./supabase"

export async function getTendenciasOcupacionales(filters: any = {}) {
  let query = supabase.from("tendencias_ocupacionales").select("*")

  if (filters.fechaInicio) {
    query = query.gte("fecha", filters.fechaInicio)
  }
  if (filters.fechaFin) {
    query = query.lte("fecha", filters.fechaFin)
  }
  if (filters.ocupacion && filters.ocupacion !== "todas") {
    query = query.eq("ocupacion", filters.ocupacion)
  }
  if (filters.region && filters.region !== "todas") {
    query = query.eq("region", filters.region)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching tendencias ocupacionales:", error)
    return null
  }

  return data
}

export async function getDistribucionInstitucional(filters: any = {}) {
  let query = supabase.from("distribucion_institucional").select("*")

  if (filters.tipo && filters.tipo !== "todas") {
    query = query.eq("tipo", filters.tipo)
  }
  if (filters.acreditacion && filters.acreditacion !== "todos") {
    query = query.eq("acreditacion", filters.acreditacion)
  }
  if (filters.region && filters.region !== "todas") {
    query = query.eq("region", filters.region)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching distribución institucional:", error)
    return null
  }

  return data
}

// Función para obtener usuarios
export async function getUsers(filters: any = {}) {
  let query = supabase.from("users").select("*")

  if (filters.email) {
    query = query.eq("email", filters.email)
  }
  if (filters.id) {
    query = query.eq("id", filters.id)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching users:", error)
    return null
  }

  return data
}

// Función para crear un usuario
export async function createUser(userData: any) {
  const admin = supabaseAdmin()
  const { data, error } = await admin
    .from("users")
    .insert(userData)
    .select()

  if (error) {
    console.error("Error creating user:", error)
    return null
  }

  return data[0]
}

// Función para actualizar un usuario
export async function updateUser(id: string, userData: any) {
  const admin = supabaseAdmin()
  const { data, error } = await admin
    .from("users")
    .update(userData)
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error updating user:", error)
    return null
  }

  return data[0]
}

// Función para eliminar un usuario
export async function deleteUser(id: string) {
  const admin = supabaseAdmin()
  const { error } = await admin
    .from("users")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting user:", error)
    return false
  }

  return true
}
