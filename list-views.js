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

async function listAllViews() {
  console.log('🔍 Buscando todas las vistas disponibles en la base de datos...\n');
  
  try {
    // Intentar consultar directamente las vistas disponibles
    const { data: viewsData, error: viewsError } = await supabase
      .from('vista_brechas_salariales')
      .select('*')
      .limit(1);
    
    if (viewsError) {
      console.log(`❌ Error al acceder a vista_brechas_salariales: ${viewsError.message}`);
    } else {
      console.log('✅ Vista encontrada: vista_brechas_salariales');
      console.log('Estructura:', Object.keys(viewsData[0]));
      console.log('Muestra:', viewsData[0]);
    }
    
    // Probar con otras vistas mencionadas en la conversación anterior
    const viewsToCheck = [
      'vista_carreras_categorias',
      'vista_crecimiento_ingresos',
      'vista_distribucion_sectorial',
      'vista_estadisticas_carreras',
      'vista_estadisticas_por_sector',
      'vista_estadisticas_unificadas',
      'vista_fortaleza_demanda',
      'vista_integracion_region_sector',
      'vista_matricula_con_indicadores',
      'vista_matricula_empleo_sectorial',
      'vista_matricula_por_sector_region',
      'vista_riesgo_saturacion',
      'vista_tendencias_empleabilidad',
      'valores_uf'
    ];
    
    const accessibleViews = [];
    
    for (const viewName of viewsToCheck) {
      console.log(`\nVerificando vista: ${viewName}`);
      
      try {
        const { data, error } = await supabase
          .from(viewName)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ Error al acceder a ${viewName}: ${error.message}`);
        } else {
          console.log(`✅ Vista encontrada: ${viewName}`);
          if (data && data.length > 0) {
            console.log('Estructura:', Object.keys(data[0]));
            accessibleViews.push({
              name: viewName,
              columns: Object.keys(data[0]),
              sample: data[0]
            });
          } else {
            console.log('La vista existe pero no contiene datos');
            accessibleViews.push({
              name: viewName,
              columns: [],
              sample: null
            });
          }
        }
      } catch (err) {
        console.error(`Error al verificar la vista ${viewName}:`, err);
      }
    }
    
    console.log('\n----- RESUMEN DE VISTAS ACCESIBLES -----');
    console.log(`Total de vistas accesibles: ${accessibleViews.length}/${viewsToCheck.length + 1}`);
    
    if (accessibleViews.length > 0) {
      console.log('\nVistas accesibles:');
      accessibleViews.forEach(view => {
        console.log(`\n📊 ${view.name}:`);
        console.log(`  Columnas (${view.columns.length}): ${view.columns.join(', ')}`);
        console.log('  Lógica inferida: ' + inferViewLogic(view.name, view.columns));
      });
    }
    
    return accessibleViews;
  } catch (error) {
    console.error('Error al listar vistas:', error);
  }
}

// Función para inferir la lógica de una vista basada en su nombre y columnas
function inferViewLogic(viewName, columns) {
  // Mapeo de vistas a descripciones lógicas
  const viewLogic = {
    'vista_brechas_salariales': 'Analiza las brechas salariales entre diferentes percentiles para cada carrera genérica',
    'vista_carreras_categorias': 'Clasifica las carreras en categorías según criterios específicos',
    'vista_crecimiento_ingresos': 'Calcula el crecimiento de ingresos a lo largo del tiempo para diferentes carreras',
    'vista_distribucion_sectorial': 'Muestra la distribución de empleos por sector económico',
    'vista_estadisticas_carreras': 'Proporciona estadísticas agregadas por carrera',
    'vista_estadisticas_por_sector': 'Analiza estadísticas laborales agrupadas por sector económico',
    'vista_estadisticas_unificadas': 'Consolida estadísticas de múltiples fuentes en una vista unificada',
    'vista_fortaleza_demanda': 'Evalúa la fortaleza de la demanda laboral para diferentes carreras',
    'vista_integracion_region_sector': 'Relaciona datos regionales con sectores económicos',
    'vista_matricula_con_indicadores': 'Enriquece datos de matrícula con indicadores de empleabilidad',
    'vista_matricula_empleo_sectorial': 'Relaciona datos de matrícula con empleo por sector',
    'vista_matricula_por_sector_region': 'Analiza matrículas agrupadas por sector y región',
    'vista_riesgo_saturacion': 'Evalúa el riesgo de saturación del mercado laboral para diferentes carreras',
    'vista_tendencias_empleabilidad': 'Analiza tendencias de empleabilidad a lo largo del tiempo',
    'valores_uf': 'Proporciona valores históricos de la Unidad de Fomento (UF)'
  };
  
  // Si tenemos una descripción predefinida, la usamos
  if (viewLogic[viewName]) {
    return viewLogic[viewName];
  }
  
  // Si no, inferimos basado en el nombre y las columnas
  let logic = `Vista que proporciona datos relacionados con ${viewName.replace('vista_', '').replace(/_/g, ' ')}`;
  
  // Análisis adicional basado en columnas
  if (columns.includes('anio') || columns.includes('fecha')) {
    logic += '. Incluye dimensión temporal';
  }
  
  if (columns.includes('region') || columns.includes('region_codigo') || columns.includes('region_id')) {
    logic += '. Contiene desagregación geográfica';
  }
  
  if (columns.some(col => col.includes('valor_') || col.includes('tasa_') || col.includes('indice_'))) {
    logic += '. Contiene métricas o indicadores cuantitativos';
  }
  
  return logic;
}

// Ejecutar la función principal
listAllViews()
  .then(() => console.log('\nProceso completado.'))
  .catch(err => console.error('Error en la ejecución:', err)); 