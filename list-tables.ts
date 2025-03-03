import * as dotenv from 'dotenv'
import { createClient } from './utils/supabase/server.ts'

// Cargar variables de entorno desde .env.local
dotenv.config({ path: '.env.local' })

async function listTables() {
  try {
    const supabase = await createClient()
    
    // Usar una consulta raw SQL para obtener la información
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_type', 'BASE TABLE')

    if (error) throw error

    if (!data || data.length === 0) {
      console.log('No se encontraron tablas en el esquema public')
      return
    }

    console.log('\nTablas disponibles en el esquema public:\n')

    // Para cada tabla, obtener sus columnas
    for (const table of data) {
      console.log(`📋 Tabla: ${table.table_name}`)
      
      const { data: columns, error: columnsError } = await supabase
        .from('information_schema.columns')
        .select(`
          column_name,
          data_type,
          is_nullable,
          column_default,
          character_maximum_length,
          udt_name,
          is_identity
        `)
        .eq('table_schema', 'public')
        .eq('table_name', table.table_name)
        .order('ordinal_position')

      if (columnsError) throw columnsError

      if (columns && columns.length > 0) {
        console.log('Columnas:')
        columns.forEach(col => {
          let type = col.data_type
          if (col.character_maximum_length) {
            type += `(${col.character_maximum_length})`
          }
          if (col.data_type === 'ARRAY') {
            type = `${col.udt_name.replace('_', '')}[]`
          }
          const defaultValue = col.column_default ? ` DEFAULT ${col.column_default}` : ''
          const identity = col.is_identity === 'YES' ? ' GENERATED ALWAYS AS IDENTITY' : ''
          console.log(`  • ${col.column_name}: ${type}${col.is_nullable === 'NO' ? ' NOT NULL' : ''}${defaultValue}${identity}`)
        })
      }
      console.log('')
    }
  } catch (error) {
    console.error('Error listing tables:', error)
  }
}

listTables()
