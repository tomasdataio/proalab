/**
 * Script para parchear componentes con posibles problemas de tamaños de array
 */
const fs = require('fs');
const path = require('path');

console.log('📝 Iniciando parches de componentes para evitar errores de array length...');

// Lista de componentes y límites de seguridad
const componentPatches = [
  {
    path: 'components/visualizaciones/grafico-radar-shadcn.tsx',
    fixes: [
      {
        pattern: /const categoriasArray = Array\.from\(uniqueEtiquetas\)/,
        replacement: 'const categoriasArray = Array.from(uniqueEtiquetas).slice(0, 10)'
      }
    ]
  },
  {
    path: 'components/visualizaciones/grafico-barra-shadcn.tsx',
    fixes: [
      {
        pattern: /const uniqueXValues = Array\.from\(uniqueXValuesSet\)/,
        replacement: 'const uniqueXValues = Array.from(uniqueXValuesSet).slice(0, 30)'
      },
      {
        pattern: /const uniqueGroupValues = Array\.from\(uniqueGroupValuesSet\)/,
        replacement: 'const uniqueGroupValues = Array.from(uniqueGroupValuesSet).slice(0, 5)'
      }
    ]
  },
  {
    path: 'components/visualizaciones/grafico-linea-shadcn.tsx',
    fixes: [
      {
        pattern: /const uniqueXValues = uniqueXValuesArray/,
        replacement: 'const uniqueXValues = uniqueXValuesArray.slice(0, 50)'
      },
      {
        pattern: /const uniqueSeries = Array\.from\(uniqueSeriesSet\)/,
        replacement: 'const uniqueSeries = Array.from(uniqueSeriesSet).slice(0, 5)'
      }
    ]
  },
  {
    path: 'components/visualizaciones/mapa-calor-shadcn.tsx',
    fixes: [
      {
        pattern: /const etiquetasFilas = Array\.from\(etiquetasFilasSet\)/,
        replacement: 'const etiquetasFilas = Array.from(etiquetasFilasSet).slice(0, 20)'
      },
      {
        pattern: /const etiquetasColumnas = Array\.from\(etiquetasColumnasSet\)/,
        replacement: 'const etiquetasColumnas = Array.from(etiquetasColumnasSet).slice(0, 20)'
      }
    ]
  },
  {
    path: 'lib/mock-data.ts',
    fixes: [
      {
        pattern: /const sectores = \["Tecnología", "Comercio", "Construcción", "Salud", "Educación"\]/,
        replacement: 'const sectores = ["Tecnología", "Comercio", "Construcción"]'
      },
      {
        pattern: /const regiones = \["Metropolitana", "Valparaíso", "Biobío"\]/,
        replacement: 'const regiones = ["Metropolitana", "Valparaíso"]'
      },
      {
        pattern: /const ocupaciones = \["Desarrollador de Software", "Administrador", "Médico", "Profesor", "Vendedor"\]/,
        replacement: 'const ocupaciones = ["Desarrollador de Software", "Administrador", "Médico"]'
      }
    ]
  }
];

// Función para aplicar los parches a un archivo
function patchFile(filePath, fixes) {
  const fullPath = path.join(process.cwd(), filePath);
  
  // Verificar si el archivo existe
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ Archivo no encontrado: ${filePath}`);
    return false;
  }
  
  try {
    // Leer contenido del archivo
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;
    
    // Aplicar cada corrección
    fixes.forEach(fix => {
      if (fix.pattern.test(content)) {
        content = content.replace(fix.pattern, fix.replacement);
        modified = true;
        console.log(`✅ Parche aplicado en ${filePath}: ${fix.pattern}`);
      }
    });
    
    // Guardar el archivo si hubo cambios
    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf8');
      return true;
    } else {
      console.log(`ℹ️ No se requirieron cambios en ${filePath}`);
      return false;
    }
  } catch (err) {
    console.error(`❌ Error al parchear ${filePath}:`, err.message);
    return false;
  }
}

// Aplicar todos los parches
let patchedCount = 0;
componentPatches.forEach(component => {
  if (patchFile(component.path, component.fixes)) {
    patchedCount++;
  }
});

console.log(`🎉 Parches aplicados: ${patchedCount} componentes modificados.`);

// Crear un archivo centinela para indicar que ya se aplicaron los parches
fs.writeFileSync(path.join(process.cwd(), '.patched'), new Date().toISOString(), 'utf8');
console.log('✨ Proceso de parcheo completado.'); 