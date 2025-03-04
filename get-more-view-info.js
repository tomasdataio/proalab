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

async function getViewDetails() {
  console.log('🔍 Obteniendo más información sobre vista_tendencias_matricula...\n');
  
  try {
    // Consultar la estructura de la vista
    console.log('1. Estructura de la vista:');
    const { data, error } = await supabase
      .from('vista_tendencias_matricula')
      .select('*')
      .limit(10);
    
    if (error) {
      console.error('Error al consultar la vista:', error.message);
      return;
    }
    
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]);
      console.log(`Columnas (${columns.length}): ${columns.join(', ')}`);
      
      // Analizar tipos de datos basados en la primera fila
      console.log('\n2. Tipos de datos inferidos:');
      for (const col of columns) {
        const value = data[0][col];
        const type = typeof value;
        console.log(`  - ${col}: ${type}${value === null ? ' (puede ser nulo)' : ''}`);
      }
      
      // Mostrar un resumen de las filas para entender los datos
      console.log('\n3. Muestra de datos (hasta 5 filas):');
      data.slice(0, 5).forEach((row, index) => {
        console.log(`\nFila ${index + 1}:`);
        for (const col of columns) {
          console.log(`  ${col}: ${row[col]}`);
        }
      });
      
      // Realizar algunos análisis básicos
      console.log('\n4. Análisis básico de datos:');
      
      // Conteo de valores únicos por columna
      console.log('\n4.1 Valores únicos por columna:');
      for (const col of columns) {
        const uniqueValues = new Set(data.map(row => row[col])).size;
        console.log(`  - ${col}: ${uniqueValues} valores únicos`);
      }
      
      // Análisis de años
      if (columns.includes('anio')) {
        const años = data.map(row => row.anio);
        const añosUnicos = [...new Set(años)].sort();
        console.log('\n4.2 Años representados:', añosUnicos.join(', '));
      }
      
      // Análisis de carreras
      if (columns.includes('carr_generica')) {
        const carreras = data.map(row => row.carr_generica);
        const carrerasUnicas = [...new Set(carreras)];
        console.log(`\n4.3 Carreras genéricas representadas: ${carrerasUnicas.length} distintas`);
        if (carrerasUnicas.length <= 15) {
          console.log(`  - ${carrerasUnicas.join('\n  - ')}`);
        } else {
          console.log(`  - ${carrerasUnicas.slice(0, 10).join('\n  - ')}`);
          console.log(`  ... y ${carrerasUnicas.length - 10} más`);
        }
      }
      
      // Análisis de tendencias
      if (columns.includes('tendencia_matricula')) {
        const tendencias = data.map(row => row.tendencia_matricula);
        const tendenciasUnicas = [...new Set(tendencias)];
        console.log('\n4.4 Tipos de tendencias:', tendenciasUnicas.join(', '));
      }
      
      // Distribución de tendencias
      if (columns.includes('tendencia_matricula')) {
        console.log('\n4.5 Distribución de tendencias:');
        const tendenciasCount = {};
        data.forEach(row => {
          const tendencia = row.tendencia_matricula;
          tendenciasCount[tendencia] = (tendenciasCount[tendencia] || 0) + 1;
        });
        
        for (const [tendencia, count] of Object.entries(tendenciasCount)) {
          const porcentaje = (count / data.length * 100).toFixed(1);
          console.log(`  - ${tendencia}: ${count} (${porcentaje}%)`);
        }
      }
    } else {
      console.log('  No se encontraron datos en la vista');
    }
    
    // Intentar inferir la definición de la vista
    console.log('\n5. Inferencia de posible definición SQL:');
    console.log(`
CREATE OR REPLACE VIEW empleabilidad.vista_tendencias_matricula AS
SELECT 
  m.anio,
  m.carr_generica,
  SUM(m.mat_primer_anio_total) AS total_matricula_primer_anio,
  CASE 
    WHEN SUM(m.mat_primer_anio_total) > LAG(SUM(m.mat_primer_anio_total)) OVER (PARTITION BY m.carr_generica ORDER BY m.anio) THEN 'Creciente'
    WHEN SUM(m.mat_primer_anio_total) < LAG(SUM(m.mat_primer_anio_total)) OVER (PARTITION BY m.carr_generica ORDER BY m.anio) THEN 'Decreciente'
    ELSE 'Estable'
  END AS tendencia_matricula,
  CASE 
    WHEN LAG(SUM(m.mat_primer_anio_total)) OVER (PARTITION BY m.carr_generica ORDER BY m.anio) = 0 THEN 0
    ELSE ROUND(
      ((SUM(m.mat_primer_anio_total) - LAG(SUM(m.mat_primer_anio_total)) OVER (PARTITION BY m.carr_generica ORDER BY m.anio)) / 
      NULLIF(LAG(SUM(m.mat_primer_anio_total)) OVER (PARTITION BY m.carr_generica ORDER BY m.anio), 0)) * 100, 2
    )
  END AS crecimiento_anual_porcentual
FROM 
  empleabilidad.matricula_2021 m
GROUP BY 
  m.anio, m.carr_generica
ORDER BY 
  m.carr_generica, m.anio;
`);
    
  } catch (error) {
    console.error('Error durante la obtención de detalles:', error);
  }
}

// Ejecutar la función
getViewDetails(); 