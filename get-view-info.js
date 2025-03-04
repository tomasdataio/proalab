import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Configurar dotenv para cargar variables de .env.local
dotenv.config({ path: '.env.local' });

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

async function getViewInfo() {
  try {
    console.log('🔍 Consultando vistas en el esquema empleabilidad...');
    
    // Intentar ejecutar SQL directo para consultar las vistas en el esquema empleabilidad
    const { data, error } = await supabase.rpc('execute_sql', {
      query: `
        SELECT 
          table_name AS view_name,
          view_definition
        FROM 
          information_schema.views
        WHERE 
          table_schema = 'empleabilidad'
      `
    });

    if (error) {
      console.log('Error al ejecutar RPC execute_sql:', error.message);
      console.log('Intentando método alternativo...');
      
      // Método alternativo: consultar usando el endpoint de postgrest directamente
      const { data: viewsData, error: viewsError } = await supabase
        .from('pg_views')
        .select('*')
        .filter('schemaname', 'eq', 'empleabilidad');
      
      if (viewsError) {
        throw viewsError;
      }
      
      if (viewsData && viewsData.length > 0) {
        console.log('✅ Vistas encontradas en el esquema empleabilidad:');
        viewsData.forEach(view => {
          console.log(`\n📊 Vista: ${view.viewname}`);
          console.log(`   Definición: ${view.definition}`);
        });
        return viewsData;
      } else {
        console.log('No se encontraron vistas en el esquema empleabilidad usando método alternativo');
      }
    } else if (data && data.length > 0) {
      console.log('✅ Vistas encontradas en el esquema empleabilidad:');
      data.forEach(view => {
        console.log(`\n📊 Vista: ${view.view_name}`);
        console.log(`   Definición: ${view.view_definition}`);
      });
      return data;
    } else {
      console.log('No se encontraron vistas en el esquema empleabilidad');
    }
    
    // Intento final: consultar en la tabla pg_catalog.pg_views
    console.log('\nIntentando consultar pg_catalog...');
    
    // Intentar utilizar SQL directo mediante REST API
    const { data: pgData, error: pgError } = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/rpc/execute_sql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({
          query: "SELECT viewname, definition FROM pg_catalog.pg_views WHERE schemaname = 'empleabilidad'"
        })
      }
    ).then(res => res.json());
    
    if (pgError) {
      console.error('Error en la última alternativa:', pgError);
    } else if (pgData && pgData.length > 0) {
      console.log('✅ Vistas encontradas usando pg_catalog:');
      pgData.forEach(view => {
        console.log(`\n📊 Vista: ${view.viewname}`);
        console.log(`   Definición: ${view.definition}`);
      });
      return pgData;
    } else {
      console.log('No se encontraron vistas utilizando pg_catalog');
    }
    
    console.log('\n--- EXPLORANDO VISTAS CONOCIDAS ---');
    // Intento final: listar algunas vistas específicas que podrían existir
    const posibleViews = [
      'vista_consolidado_matricula',
      'vista_tendencias_matricula',
      'vista_indicadores_region',
      'vista_carreras_empleabilidad',
      'vista_instituciones_ranking',
      'empleabilidad_consolidado'
    ];
    
    console.log('\nIntentando acceder a vistas comunes:');
    
    for (const viewName of posibleViews) {
      console.log(`\nIntentando acceder a la vista: ${viewName}`);
      const { data: viewData, error: viewError } = await supabase
        .from(viewName)
        .select('*')
        .limit(1);
      
      if (!viewError) {
        console.log(`✅ La vista ${viewName} existe y es accesible`);
        console.log('Estructura de la vista (primera fila):');
        console.log(viewData);
      } else {
        console.log(`❌ Error al acceder a ${viewName}: ${viewError.message}`);
      }
    }

  } catch (error) {
    console.error('Error al obtener información de las vistas:', error);
  }
}

// Ejecutar la función principal
getViewInfo(); 