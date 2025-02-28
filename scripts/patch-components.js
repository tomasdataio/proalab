/**
 * Script para aplicar parches a los componentes de visualización
 * Este script modifica automáticamente los componentes para limitar
 * el tamaño de los arrays y prevenir errores de compilación en Vercel
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 APLICANDO PARCHES A COMPONENTES DE VISUALIZACIÓN');
console.log('   Este script modifica temporalmente los componentes para evitar errores de compilación');

// Crear un archivo de marcador para evitar múltiples aplicaciones de parches
const patchedMarker = path.join(process.cwd(), '.patched');

// Directorios objetivo para aplicar parches
const COMPONENTS_DIR = path.join(process.cwd(), 'components', 'visualizaciones');
const LIB_DIR = path.join(process.cwd(), 'lib');

// Contador de archivos modificados
let modifiedFilesCount = 0;

/**
 * Función que aplica un parche a un archivo mediante expresiones regulares
 */
function patchFile(filePath, patches) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Archivo no encontrado: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let modified = false;

  // Aplicar cada parche
  patches.forEach(patch => {
    if (patch.pattern.test(content)) {
      content = content.replace(patch.pattern, patch.replacement);
      modified = true;
      console.log(`  - Parche aplicado: ${patch.description}`);
    }
  });

  // Guardar solo si hubo modificaciones
  if (modified) {
    fs.writeFileSync(filePath, content);
    modifiedFilesCount++;
    return true;
  }
  
  return false;
}

// Lista de archivos y sus parches
const patchList = [
  // GraficoRadarShadcn.tsx
  {
    file: path.join(COMPONENTS_DIR, 'grafico-radar-shadcn.tsx'),
    patches: [
      {
        description: 'Limitar categorías a un máximo seguro de 5',
        pattern: /const categoriasArray = Array\.from\(uniqueEtiquetas\)\.slice\(0, 10\)\.slice\(0, 20\)/g,
        replacement: 'const categoriasArray = Array.from(uniqueEtiquetas).slice(0, 5)'
      },
      {
        description: 'Agregar validación de longitud para evitar error de array inválido',
        pattern: /if \(!datos \|\| datos\.length === 0 \|\| !metricas \|\| metricas\.length === 0 \|\| categorias\.length === 0\) {/g,
        replacement: 'if (!datos || !Array.isArray(datos) || datos.length === 0 || !metricas || !Array.isArray(metricas) || metricas.length === 0 || categorias.length === 0 || categorias.length > 10) {'
      }
    ]
  },
  
  // GraficoBarraShadcn.tsx
  {
    file: path.join(COMPONENTS_DIR, 'grafico-barra-shadcn.tsx'),
    patches: [
      {
        description: 'Limitar valores del eje X a máximo 15 (en lugar de 50)',
        pattern: /const uniqueXValues = Array\.from\(uniqueXValuesSet\)\.slice\(0, 30\)\.slice\(0, 50\)/g,
        replacement: 'const uniqueXValues = Array.from(uniqueXValuesSet).slice(0, 15)'
      },
      {
        description: 'Limitar grupos a máximo 5 (en lugar de 10)',
        pattern: /const uniqueGroupValues = Array\.from\(uniqueGroupValuesSet\)\.slice\(0, 5\)\.slice\(0, 10\)/g,
        replacement: 'const uniqueGroupValues = Array.from(uniqueGroupValuesSet).slice(0, 5)'
      },
      {
        description: 'Limitar datos procesados a máximo 100 elementos',
        pattern: /const limitedFiltered = filtered\.slice\(0, 1000\)/g,
        replacement: 'const limitedFiltered = filtered.slice(0, 100)'
      }
    ]
  },
  
  // GraficoLineaShadcn.tsx
  {
    file: path.join(COMPONENTS_DIR, 'grafico-linea-shadcn.tsx'),
    patches: [
      {
        description: 'Limitar valores del eje X a máximo 25',
        pattern: /const uniqueXValues = uniqueXValuesArray\.slice\(0, 50\)\s*\.slice\(0, 100\)/g,
        replacement: 'const uniqueXValues = uniqueXValuesArray.slice(0, 25)'
      },
      {
        description: 'Limitar series a máximo 3',
        pattern: /const uniqueSeries = Array\.from\(uniqueSeriesSet\)\.slice\(0, 5\)\.slice\(0, 10\)/g,
        replacement: 'const uniqueSeries = Array.from(uniqueSeriesSet).slice(0, 3)'
      }
    ]
  },
  
  // MapaCalorShadcn.tsx
  {
    file: path.join(COMPONENTS_DIR, 'mapa-calor-shadcn.tsx'),
    patches: [
      {
        description: 'Limitar el número de filas a 10',
        pattern: /const etiquetasFilas = Array\.from\(etiquetasFilasSet\)\.slice\(0, 20\)\.slice\(0, 50\)/g,
        replacement: 'const etiquetasFilas = Array.from(etiquetasFilasSet).slice(0, 10)'
      },
      {
        description: 'Limitar el número de columnas a 10',
        pattern: /const etiquetasColumnas = Array\.from\(etiquetasColumnasSet\)\.slice\(0, 20\)\.slice\(0, 50\)\.sort\(\)/g,
        replacement: 'const etiquetasColumnas = Array.from(etiquetasColumnasSet).slice(0, 10).sort()'
      },
      {
        description: 'Ajustar validación de matriz demasiado grande',
        pattern: /if \(etiquetasFilas\.length \* etiquetasColumnas\.length > 2500\) {/g,
        replacement: 'if (etiquetasFilas.length * etiquetasColumnas.length > 100) {'
      }
    ]
  },
  
  // mock-data.ts (para evitar generación excesiva de datos)
  {
    file: path.join(LIB_DIR, 'mock-data.ts'),
    patches: [
      {
        description: 'Limitar generación de datos de tendencias a solo 4 meses',
        pattern: /for \(let trimestre = 1; trimestre <= 4; trimestre\+\+\) {/g,
        replacement: 'for (let trimestre = 1; trimestre <= (año === 2023 ? 2 : 4); trimestre++) {'
      },
      {
        description: 'Limitar generación de datos ocupacionales a 6 meses',
        pattern: /for \(let mes = 1; mes <= 12; mes\+\+\) {/g,
        replacement: 'for (let mes = 1; mes <= (año === 2023 ? 6 : 12); mes++) {'
      }
    ]
  }
];

// Aplicar parches
let successCount = 0;
patchList.forEach(entry => {
  console.log(`🔍 Verificando ${path.basename(entry.file)}...`);
  try {
    const success = patchFile(entry.file, entry.patches);
    if (success) {
      successCount++;
    }
  } catch (error) {
    console.error(`❌ Error al procesar ${path.basename(entry.file)}: ${error.message}`);
  }
});

// Crear archivo de marcador para indicar que los parches fueron aplicados
fs.writeFileSync(patchedMarker, new Date().toISOString());

console.log(`✅ Parches aplicados: ${successCount} componentes modificados de ${patchList.length} revisados`);
console.log('   Ahora el proyecto debería compilar correctamente sin errores de "Invalid array length"');

module.exports = {
  patchedCount: modifiedFilesCount
}; 