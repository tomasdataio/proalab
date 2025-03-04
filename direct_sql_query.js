import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env.local' });

// Verificar variables de entorno necesarias
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: Se requieren las variables de entorno SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Crear cliente de Supabase con la clave de rol de servicio
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runQuery() {
  try {
    // Consultar vistas en el esquema 'empleabilidad'
    console.log('Consultando vistas en el esquema empleabilidad...');
    const { data: views, error: viewsError } = await supabase
      .from('_views_info')
      .select('*')
      .filter('schemaname', 'eq', 'empleabilidad');

    if (viewsError) {
      console.log('Error consultando vistas:', viewsError.message);
      console.log('Intentando consulta alternativa...');
    } else {
      console.log('Vistas encontradas en el esquema empleabilidad:');
      if (views && views.length > 0) {
        views.forEach(view => {
          console.log(`📊 Vista: ${view.viewname}`);
        });
      } else {
        console.log('No se encontraron vistas en el esquema empleabilidad');
      }
    }

    // Consultar columnas compartidas entre las tablas de matrícula
    console.log('\nConsultando columnas compartidas entre tablas de matrícula...');
    
    // Usar la API de SQL para una consulta directa
    const { data: columns, error: columnsError } = await supabase
      .rpc('pg_query', {
        query: `
          SELECT column_name
          FROM information_schema.columns
          WHERE table_schema = 'empleabilidad'
            AND table_name = 'matricula_2021'
          INTERSECT
          SELECT column_name
          FROM information_schema.columns
          WHERE table_schema = 'empleabilidad'
            AND table_name = 'matricula_2024'
          ORDER BY column_name;
        `
      });

    if (columnsError) {
      console.log('Error consultando columnas compartidas:', columnsError.message);
      
      if (columnsError.message.includes('function pg_query() does not exist')) {
        console.log('La función pg_query no existe. Consultando la lista de funciones disponibles...');
        
        // Intentamos obtener una lista de funciones RPC disponibles
        const { data: functions, error: functionsError } = await supabase
          .rpc('get_available_functions');
          
        if (functionsError) {
          console.log('Error consultando funciones disponibles:', functionsError.message);
        } else if (functions) {
          console.log('\nFunciones RPC disponibles:');
          functions.forEach(func => {
            console.log(`- ${func.function_name}`);
          });
        }
      }
    } else if (columns) {
      console.log('Columnas compartidas entre matricula_2021 y matricula_2024:');
      columns.forEach(col => {
        console.log(`- ${col.column_name}`);
      });
    }
    
    // Consultar tablas en el esquema
    console.log('\nConsultando tablas en el esquema empleabilidad...');
    const { data: tables, error: tablesError } = await supabase
      .from('_tables_info')
      .select('*')
      .filter('schemaname', 'eq', 'empleabilidad');
      
    if (tablesError) {
      console.log('Error consultando tablas:', tablesError.message);
      console.log('Intentando consulta directa a pg_tables...');
      
      // Intentar una consulta directa a pg_tables usando la API .from()
      const { data: pgTables, error: pgTablesError } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'empleabilidad');
        
      if (pgTablesError) {
        console.log('Error consultando pg_tables:', pgTablesError.message);
      } else if (pgTables) {
        console.log('Tablas en el esquema empleabilidad:');
        pgTables.forEach(table => {
          console.log(`- ${table.tablename}`);
        });
      }
    } else if (tables) {
      console.log('Tablas en el esquema empleabilidad:');
      tables.forEach(table => {
        console.log(`- ${table.tablename}`);
      });
    }

  } catch (error) {
    console.error('Error general:', error);
  }
}

runQuery(); 