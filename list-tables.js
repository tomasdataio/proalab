
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

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

async function listTables() {
  try {
    // Intentar usar la función get_tables_info
    const { data, error } = await supabase.rpc('get_tables_info', { schema_name: 'public' })
    
    if (error) {
      console.error('Error al obtener información de tablas:', error)
      
      // Si la función no existe, intentar listar tablas directamente
      console.log('Intentando listar tablas directamente...')
      
      // Intentar obtener la tabla users como prueba
      const { data: usersData, error: usersError } = await supabase.from('users').select('*').limit(1)
      
      if (usersError) {
        if (usersError.message.includes('relation "public.users" does not exist')) {
          console.log('La tabla users no existe. Es posible que necesites aplicar las migraciones primero.')
        } else {
          console.error('Error al consultar la tabla users:', usersError)
        }
      } else {
        console.log('La tabla users existe y contiene datos.')
      }
      
      return
    }
    
    if (!data || data.length === 0) {
      console.log('No se encontraron tablas en el esquema public')
      return
    }
    
    console.log('\nTablas disponibles en el esquema public:\n')
    
    // Mostrar las tablas y sus columnas
    data.forEach(tableInfo => {
      console.log(`📋 Tabla: ${tableInfo.table_name}`)
      
      // Intentar obtener información detallada de las columnas
      supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable')
        .eq('table_schema', 'public')
        .eq('table_name', tableInfo.table_name)
        .order('ordinal_position')
        .then(({ data: columns, error }) => {
          if (error) {
            console.error(`  Error al obtener columnas para ${tableInfo.table_name}:`, error)
            return
          }
          
          if (columns && columns.length > 0) {
            console.log('  Columnas:')
            columns.forEach(column => {
              console.log(`    • ${column.column_name}: ${column.data_type} ${column.is_nullable === 'NO' ? 'NOT NULL' : ''}`)
            })
          } else {
            console.log('  No hay información de columnas disponible')
          }
          
          console.log('')
        })
    })
    
    // Esperar a que todas las consultas terminen
    await new Promise(resolve => setTimeout(resolve, 5000))
  } catch (error) {
    console.error('Error general:', error)
  }
}

listTables()
