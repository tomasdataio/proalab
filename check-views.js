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

// Lista de posibles vistas en el esquema
const possibleViews = [
  'vista_consolidado_matricula',
  'vista_tendencias_matricula',
  'vista_indicadores_region',
  'vista_carreras_empleabilidad',
  'vista_empleabilidad_carrera',
  'vista_instituciones_ranking',
  'empleabilidad_consolidado',
  'vista_matricula_anual',
  'vista_informalidad_region',
  'vista_carreras_riesgo',
  'vista_carreras_demanda',
  'vista_analisis_sectorial'
];

async function checkViews() {
  console.log('🔍 Verificando vistas en el esquema empleabilidad...\n');
  
  const viewsInfo = [];

  // Intentar acceder a cada vista
  for (const viewName of possibleViews) {
    try {
      console.log(`Intentando acceder a: ${viewName}`);
      const { data, error } = await supabase
        .from(viewName)
        .select('*')
        .limit(3);
      
      if (error) {
        console.log(`❌ La vista "${viewName}" no existe o no es accesible: ${error.message}\n`);
      } else {
        console.log(`✅ La vista "${viewName}" existe y es accesible`);
        
        if (data && data.length > 0) {
          const columns = Object.keys(data[0]);
          console.log(`   Columnas detectadas (${columns.length}): ${columns.join(', ')}`);
          console.log(`   Total filas obtenidas: ${data.length}\n`);
          
          // Guardar información de la vista
          viewsInfo.push({
            name: viewName,
            columns: columns,
            sampleData: data.slice(0, 2), // Incluir muestra de hasta 2 filas
            description: inferViewPurpose(viewName, columns)
          });
        } else {
          console.log('   La vista existe pero no contiene datos\n');
          viewsInfo.push({
            name: viewName,
            columns: [],
            sampleData: [],
            description: inferViewPurpose(viewName, [])
          });
        }
      }
    } catch (err) {
      console.error(`Error al verificar la vista ${viewName}:`, err);
    }
  }
  
  // Resumen de vistas encontradas
  console.log('\n----- RESUMEN DE VISTAS ENCONTRADAS -----');
  const foundViews = viewsInfo.filter(v => v.columns.length > 0);
  console.log(`Total de vistas detectadas: ${foundViews.length}/${possibleViews.length}`);
  
  foundViews.forEach(view => {
    console.log(`\n📊 ${view.name}:`);
    console.log(`  Propósito: ${view.description}`);
    console.log(`  Columnas (${view.columns.length}): ${view.columns.join(', ')}`);
  });
  
  return viewsInfo;
}

// Función para inferir el propósito de una vista basado en su nombre y columnas
function inferViewPurpose(viewName, columns) {
  // Mapeo de vistas a descripciones
  const viewDescriptions = {
    'vista_consolidado_matricula': 'Consolidado de datos de matrícula a través de los años',
    'vista_tendencias_matricula': 'Análisis de tendencias de matrícula en el tiempo',
    'vista_indicadores_region': 'Indicadores laborales agrupados por región',
    'vista_carreras_empleabilidad': 'Métricas de empleabilidad por carrera',
    'vista_empleabilidad_carrera': 'Análisis detallado de empleabilidad por carrera',
    'vista_instituciones_ranking': 'Ranking de instituciones educativas',
    'empleabilidad_consolidado': 'Consolidado general de métricas de empleabilidad',
    'vista_matricula_anual': 'Datos de matrícula organizados por año',
    'vista_informalidad_region': 'Indicadores de informalidad laboral por región',
    'vista_carreras_riesgo': 'Análisis de carreras con riesgo de saturación',
    'vista_carreras_demanda': 'Análisis de carreras según su demanda laboral',
    'vista_analisis_sectorial': 'Análisis de sectores económicos y su relación con carreras'
  };
  
  // Retornar descripción predefinida o generar una basada en columnas
  return viewDescriptions[viewName] || 
         `Vista que proporciona datos relacionados con ${viewName.replace('vista_', '').replace(/_/g, ' ')}`;
}

// Ejecutar la verificación de vistas
checkViews()
  .then(viewsInfo => {
    console.log('\nProceso completado. Se ha recopilado información sobre las vistas disponibles.');
  })
  .catch(error => {
    console.error('Error durante la ejecución:', error);
  }); 