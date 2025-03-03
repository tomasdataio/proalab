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
  },
  global: {
    headers: {
      'X-Supabase-Auth-Override': 'service_role',
    },
  },
})

async function getSchemaInfo() {
  try {
    // Obtener información sobre todas las tablas
    console.log('Obteniendo información sobre todas las tablas...')
    
    // Obtener todas las tablas únicas
    const { data: tables, error: tablesError } = await supabase
      .from('schema_columns')
      .select('table_name')
      .order('table_name')
      
    if (tablesError) {
      console.error('Error al obtener tablas:', tablesError)
      return
    }
    
    // Eliminar duplicados
    const uniqueTables = [...new Set(tables.map(t => t.table_name))]
    
    console.log(`Se encontraron ${uniqueTables.length} tablas en la base de datos:`)
    
    // Para cada tabla, obtener sus columnas
    for (const tableName of uniqueTables) {
      console.log(`\n📋 Tabla: ${tableName}`)
      
      const { data: columns, error: columnsError } = await supabase
        .from('schema_columns')
        .select('*')
        .eq('table_name', tableName)
        .order('column_name')
      
      if (columnsError) {
        console.error(`  Error al obtener columnas para ${tableName}:`, columnsError)
        continue
      }
      
      console.log('  Columnas:')
      columns.forEach(column => {
        console.log(`    • ${column.column_name}: ${column.data_type} ${column.is_nullable === 'YES' ? '' : 'NOT NULL'}`)
      })
      
      // Intentar obtener algunos datos de la tabla
      const { data: rows, error: rowsError } = await supabase
        .from(tableName)
        .select('*')
        .limit(2)
      
      if (rowsError) {
        console.log(`  No se pudieron obtener datos de la tabla: ${rowsError.message}`)
      } else if (rows && rows.length > 0) {
        console.log(`  Datos de muestra (${rows.length} filas):`)
        rows.forEach((row, index) => {
          console.log(`    Fila ${index + 1}:`, JSON.stringify(row, null, 2))
        })
      } else {
        console.log('  No hay datos en la tabla')
      }
    }
    
  } catch (error) {
    console.error('Error general:', error)
  }
}

getSchemaInfo()
