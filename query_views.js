import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Configurar dotenv para cargar variables de .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env.local') });

// Verificar que las variables de entorno necesarias estén definidas
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: Se requieren las variables de entorno SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Crear cliente de Supabase con la clave de rol de servicio
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getViews() {
  try {
    // Consultar vistas en el esquema 'empleabilidad' usando SQL directo
    console.log('Consultando vistas en el esquema empleabilidad...');
    const { data: viewsData, error: viewsError } = await supabase
      .from('information_schema.views')
      .select('*')
      .eq('table_schema', 'empleabilidad');

    if (viewsError) {
      throw viewsError;
    }

    console.log('Vistas encontradas en el esquema empleabilidad:');
    if (viewsData && viewsData.length > 0) {
      viewsData.forEach(view => {
        console.log(`📊 Vista: ${view.table_name}`);
        console.log(`   Definición: ${view.view_definition}`);
      });
    } else {
      console.log('No se encontraron vistas en el esquema empleabilidad');
    }

    // Consultar relaciones entre tablas
    console.log('\nConsultando relaciones entre tablas...');
    const { data: relationsData, error: relationsError } = await supabase
      .from('information_schema.key_column_usage')
      .select(`
        constraint_name,
        table_name,
        column_name,
        referenced_table_name,
        referenced_column_name
      `)
      .eq('table_schema', 'empleabilidad')
      .not('referenced_table_name', 'is', null);

    if (relationsError) {
      throw relationsError;
    }

    console.log('Relaciones entre tablas:');
    if (relationsData && relationsData.length > 0) {
      relationsData.forEach(relation => {
        console.log(`🔗 ${relation.table_name}.${relation.column_name} -> ${relation.referenced_table_name}.${relation.referenced_column_name}`);
      });
    } else {
      console.log('No se encontraron relaciones explícitas (foreign keys) entre tablas');
    }

    // Intentar ejecutar una consulta SQL personalizada para obtener las columnas comunes
    console.log('\nAnalizando columnas comunes entre tablas de matrícula...');
    const { data: commonColumnsData, error: commonColumnsError } = await supabase.rpc(
      'execute_sql',
      {
        sql_query: `
          SELECT column_name
          FROM information_schema.columns
          WHERE table_schema = 'empleabilidad'
            AND table_name = 'matricula_2021'
          INTERSECT
          SELECT column_name
          FROM information_schema.columns
          WHERE table_schema = 'empleabilidad'
            AND table_name = 'matricula_2024'
        `
      }
    );

    if (commonColumnsError) {
      console.log('No se pudo ejecutar la función RPC para obtener columnas comunes.');
      console.log('Error:', commonColumnsError.message);
    } else if (commonColumnsData) {
      console.log('Columnas comunes entre matricula_2021 y matricula_2024:');
      commonColumnsData.forEach(col => {
        console.log(`- ${col.column_name}`);
      });
    }

  } catch (error) {
    console.error('Error al obtener información de la base de datos:', error);
  }
}

// Ejecutar la función principal
getViews(); 