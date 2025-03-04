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

// Ejecutar una consulta SQL directa
async function executeQuery(query) {
  const { data, error } = await supabase.rpc('execute_sql', { query })
  
  if (error) {
    // Si la función RPC no existe, intentar con un enfoque alternativo
    console.error('Error al ejecutar la consulta:', error.message)
    console.log('La función execute_sql no está disponible. Utilizando otro enfoque...')
    
    // En este punto, podríamos implementar un enfoque alternativo
    // Sin embargo, esto depende de las capacidades específicas de la API de Supabase
    
    return null
  }
  
  return data
}

async function listEmpleabilidadTables() {
  try {
    console.log('Listando tablas del esquema empleabilidad...\n')
    
    // Intentar obtener la tabla informalidad como prueba
    const { data: informalidadData, error: informalidadError } = await supabase
      .from('informalidad')
      .select('*')
      .limit(1)
    
    if (informalidadError) {
      console.error('Error al consultar la tabla informalidad:', informalidadError.message)
      console.log('Comprobando si necesitamos especificar el esquema...')
      
      // Intentar con esquema explícito
      const { data: schemaData, error: schemaError } = await supabase
        .from('empleabilidad.informalidad')
        .select('*')
        .limit(1)
      
      if (schemaError) {
        console.error('Error al consultar con esquema explícito:', schemaError.message)
      } else {
        console.log('Éxito al usar el esquema explícito. Datos de muestra:', schemaData)
      }
    } else {
      console.log('La tabla informalidad es accesible. Datos de muestra:', informalidadData)
    }
    
    // Consultar todas las tablas del esquema empleabilidad
    console.log('\nTablas disponibles en el esquema empleabilidad:')
    
    // Esta es la consulta para obtener las tablas
    const tablesQuery = `
      SELECT tablename 
      FROM pg_catalog.pg_tables 
      WHERE schemaname = 'empleabilidad' 
      ORDER BY tablename
    `
    
    // Intentar ejecutar la consulta SQL directamente
    // Nota: Esto depende de la disponibilidad de la función RPC execute_sql
    const tablesResult = await executeQuery(tablesQuery)
    
    if (tablesResult) {
      // Si obtuvimos resultados de la consulta SQL directa
      console.log(`Encontradas ${tablesResult.length} tablas:`)
      
      for (const table of tablesResult) {
        console.log(`📋 ${table.tablename}`)
      }
    } else {
      // Si la consulta directa falló, listar las tablas que ya sabemos que existen
      console.log('Listado manual de tablas del esquema empleabilidad:')
      const knownTables = [
        'informalidad', 
        'instituciones', 
        'log_categorias_faltantes',
        'mapeo_carr_generica',
        'mapeo_sin_duplicados', 
        'mapeo_temp',
        'matricula_2021', 
        'matricula_2022', 
        'matricula_2023', 
        'matricula_2024',
        'panel_region_sector',
        'pares_con_origen',
        'pares_unicos',
        'poblacion'
      ]
      
      for (const tableName of knownTables) {
        console.log(`📋 ${tableName}`)
        
        // Intentar obtener un registro de muestra
        const { data: sample, error: sampleError } = await supabase
          .from(tableName)
          .select('*')
          .limit(1)
        
        if (sampleError) {
          console.log(`  - Error al obtener muestra: ${sampleError.message}`)
        } else if (sample && sample.length > 0) {
          console.log(`  - Ejemplo de columnas: ${Object.keys(sample[0]).join(', ')}`)
        } else {
          console.log(`  - La tabla parece estar vacía`)
        }
      }
    }
    
    // Análisis básico de relaciones entre tablas basado en nombres de columnas comunes
    console.log('\nAnálisis de posibles relaciones entre tablas:')
    
    // Relaciones por región
    console.log('1. Relaciones por región (region_id, region_codigo):')
    console.log('   - informalidad ⟷ panel_region_sector ⟷ poblacion')
    console.log('   - matricula_20XX ⟷ informalidad (a través de region_id)')
    
    // Relaciones por instituciones
    console.log('2. Relaciones por instituciones:')
    console.log('   - instituciones ⟷ matricula_20XX (a través de inst_codigo)')
    
    // Relaciones por carreras
    console.log('3. Relaciones por carreras:')
    console.log('   - mapeo_carr_generica ⟷ matricula_20XX (a través de carr_nombre y carr_generica)')
    console.log('   - pares_unicos, pares_con_origen ⟷ matricula_20XX (mapeos de carreras)')
    
  } catch (error) {
    console.error('Error general:', error)
  }
}

listEmpleabilidadTables() 