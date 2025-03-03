import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uelfawlakixwmjxgmalp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlbGZhd2xha2l4d21qeGdtYWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMjAyMDMsImV4cCI6MjA1NTg5NjIwM30.oDWfXi8JRvLtmIqWjJeIMY3JFEYgJZwZsGepdn4e6Cw'
const supabase = createClient(supabaseUrl, supabaseKey)

async function listTables() {
  try {
    // Consulta directa para obtener las tablas
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (error) {
      console.error('Error al obtener tablas:', error)
    } else {
      console.log('Tablas en tu base de datos:')
      console.log(data)
    }
    
    // Intentemos también listar los usuarios como prueba
    const { data: users, error: usersError } = await supabase
      .from('auth.users')
      .select('*')
      .limit(5)
    
    if (usersError) {
      console.error('Error al obtener usuarios:', usersError)
    } else {
      console.log('Primeros 5 usuarios:')
      console.log(users)
    }
  } catch (e) {
    console.error('Error general:', e)
  }
}

listTables() 