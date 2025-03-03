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

async function getUsersTableInfo() {
  try {
    // Obtener información sobre la tabla users
    console.log('Obteniendo información sobre la tabla users...')
    
    // Intentar obtener la estructura de la tabla usando la función get_table_columns
    const { data: columnsData, error: columnsError } = await supabase
      .rpc('get_table_columns', { table_name: 'users' })
    
    if (columnsError) {
      console.error('Error al obtener columnas:', columnsError)
    } else if (columnsData) {
      console.log('Columnas de la tabla users:')
      columnsData.forEach(column => {
        console.log(`  • ${column.column_name}: ${column.data_type} ${column.is_nullable === 'NO' ? 'NOT NULL' : ''}`)
      })
    }
    
    // Intentar obtener datos de la tabla
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5)
    
    if (usersError) {
      console.error('Error al obtener datos de users:', usersError)
      return
    }
    
    if (users && users.length > 0) {
      console.log('\nDatos de la tabla users:')
      console.log('Registros:')
      users.forEach(user => {
        console.log(JSON.stringify(user, null, 2))
      })
    } else {
      console.log('\nNo hay datos en la tabla users')
    }
    
    // Intentar obtener información sobre todas las tablas
    console.log('\nObteniendo información sobre todas las tablas...')
    const { data: tablesData, error: tablesError } = await supabase
      .rpc('list_schema_tables')
    
    if (tablesError) {
      console.error('Error al obtener información de tablas:', tablesError)
    } else if (tablesData) {
      console.log('Tablas disponibles:')
      tablesData.forEach(tableName => {
        console.log(`  • ${tableName}`)
      })
    }
    
    // Intentar obtener información de la vista schema_columns
    console.log('\nObteniendo información de la vista schema_columns...')
    const { data: schemaColumns, error: schemaError } = await supabase
      .from('schema_columns')
      .select('*')
      .limit(10)
    
    if (schemaError) {
      console.error('Error al obtener información de schema_columns:', schemaError)
    } else if (schemaColumns && schemaColumns.length > 0) {
      console.log('Primeras 10 columnas de la vista schema_columns:')
      schemaColumns.forEach(column => {
        console.log(`  • ${column.table_name}.${column.column_name}: ${column.data_type}`)
      })
    } else {
      console.log('No hay datos en la vista schema_columns')
    }
    
  } catch (error) {
    console.error('Error general:', error)
  }
}

getUsersTableInfo()
