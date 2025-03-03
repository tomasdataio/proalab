import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Cargar variables de entorno desde .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

// Crear cliente de Supabase con la clave de servicio para operaciones administrativas
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function applyMigrations() {
  try {
    console.log('Iniciando migración...')
    const usersMigration = fs.readFileSync(
      path.join(process.cwd(), 'supabase/migrations/20250303_check_and_create_users_if_not_exists.sql'),
      'utf8'
    )
    // Verificar si la tabla users existe
    let checkError = null
    try {
      const { error } = await supabase
        .from('users')
        .select('id')
        .limit(1)
      checkError = error
    } catch (error) {
      checkError = error
    }
    
    if (checkError && checkError.message && checkError.message.includes('relation "public.users" does not exist')) {
      console.log('La tabla users no existe, creándola...')
      
      // La tabla no existe, vamos a crearla usando SQL regular
      const { error: createError } = await supabase.rpc('exec_sql', { sql: usersMigration })
      
      if (createError) {
        console.error('Error al crear la tabla users:', createError)
        return
      }
      
      console.log('Tabla users creada exitosamente')
    } else if (checkError) {
      console.error('Error al verificar la tabla users:', checkError)
      return
    } else {
      console.log('La tabla users ya existe')
    }

    // Aplicar la migración para crear la función get_tables_info
    try {
      const tablesInfoMigration = fs.readFileSync(
        path.join(process.cwd(), 'supabase/migrations/20250303_create_tables_info_function.sql'),
        'utf8'
      )
      
      // Usar la API de Supabase para ejecutar SQL directamente
      const { error: tablesInfoError } = await supabase.rpc('exec_sql', { sql: tablesInfoMigration })
      
      if (tablesInfoError) {
        console.error('Error applying tables info migration:', tablesInfoError)
      } else {
        console.log('Tables info function migration applied successfully')
      }
    } catch (error) {
      console.error('Error reading or applying tables info migration:', error)
    }

    // Aplicar la migración para agregar la política de inserción
    try {
      const insertPolicyMigration = fs.readFileSync(
        path.join(process.cwd(), 'supabase/migrations/20250303_add_insert_policy.sql'),
        'utf8'
      )
      
      // Ejecutar SQL directamente
      const { data, error } = await supabase.rpc('exec_sql', { sql: insertPolicyMigration })
      
      if (error) {
        console.error('Error applying insert policy migration:', error)
      } else {
        console.log('Insert policy migration applied successfully')
      }
    } catch (error) {
      console.error('Error reading or applying insert policy migration:', error)
    }

    console.log('Migrations applied successfully')
  } catch (error) {
    console.error('Error applying migrations:', error)
  }
}

// Ejecutar las migraciones
applyMigrations()
