// Script de compilación personalizado para Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Iniciando script de compilación personalizado para Vercel');

// Forzar el uso de SWC
process.env.NEXT_FORCE_SWC = 'true';

try {
  // Ejecutar script de limpieza de caché
  const clearCacheScriptPath = path.join(process.cwd(), 'scripts', 'clear-cache.js');
  
  if (fs.existsSync(clearCacheScriptPath)) {
    console.log('🧹 Ejecutando limpieza de caché...');
    require(clearCacheScriptPath);
  } else {
    console.log('⚠️ Script de limpieza de caché no encontrado. Implementando limpieza básica...');
    
    // Limpiar directorios clave
    const dirsToClean = ['.next', '.swc', 'node_modules/.cache'];
    dirsToClean.forEach(dir => {
      const dirPath = path.join(process.cwd(), dir);
      if (fs.existsSync(dirPath)) {
        try {
          console.log(`🗑️ Eliminando directorio: ${dir}`);
          fs.rmSync(dirPath, { recursive: true, force: true });
          console.log(`✅ Directorio eliminado: ${dir}`);
        } catch (error) {
          console.error(`❌ Error al eliminar directorio ${dir}:`, error.message);
        }
      }
    });
  }

  // PASO CRÍTICO: Eliminar TODOS los archivos de configuración de Babel de forma agresiva
  console.log('🔍 Buscando y eliminando todos los archivos de configuración de Babel...');
  
  // Eliminar mediante find en entornos UNIX
  try {
    console.log('Intentando eliminar archivos .babelrc con find...');
    execSync('find . -name ".babelrc*" -type f -delete', { stdio: 'inherit' });
    execSync('find . -name "babel.config.*" -type f -delete', { stdio: 'inherit' });
  } catch (findError) {
    console.log('Comando find no soportado o error. Usando método alternativo...');
  }
  
  // Método de respaldo: eliminar archivos conocidos
  const babelConfigFiles = [
    '.babelrc',
    '.babelrc.js',
    '.babelrc.json',
    'babel.config.js',
    'babel.config.json'
  ];
  
  babelConfigFiles.forEach(configFile => {
    const configPath = path.join(process.cwd(), configFile);
    if (fs.existsSync(configPath)) {
      console.log(`🗑️ Eliminando archivo de configuración de Babel: ${configFile}`);
      try {
        fs.unlinkSync(configPath);
        console.log(`✅ Archivo ${configFile} eliminado correctamente`);
      } catch (error) {
        console.error(`⚠️ No se pudo eliminar ${configFile}: ${error.message}`);
        
        // Intentar sobrescribir si no se puede eliminar
        try {
          fs.writeFileSync(configPath, '{}');
          console.log(`✅ Archivo ${configFile} sobrescrito con configuración vacía`);
        } catch (writeError) {
          console.error(`❌ No se pudo sobrescribir ${configFile}:`, writeError.message);
        }
      }
    }
  });
  
  console.log('✅ Limpieza de configuración de Babel completada');
  
  // Verificar si existe el directorio scripts y crearlo si no existe
  const scriptsDir = path.join(process.cwd(), 'scripts');
  if (!fs.existsSync(scriptsDir)) {
    console.log('📁 Creando directorio para scripts...');
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  
  // Ejecutar el script de parche para componentes
  const patchScriptPath = path.join(process.cwd(), 'scripts', 'patch-components.js');
  if (fs.existsSync(patchScriptPath)) {
    console.log('🔧 Ejecutando script de parche para componentes...');
    require(patchScriptPath);
  } else {
    console.warn('⚠️ Script de parche no encontrado. Se omite este paso.');
  }

  // Verificar y corregir package.json
  console.log('🔧 Verificando y corrigiendo package.json...');
  
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    let packageJsonData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    let modified = false;
    
    // Eliminar referencias circulares
    if (packageJsonData.dependencies && packageJsonData.dependencies['proalab-webpage']) {
      console.log('🔄 Eliminando referencia circular en package.json...');
      delete packageJsonData.dependencies['proalab-webpage'];
      modified = true;
    }
    
    // Asegurar que existe la sección 'resolutions' para punycode
    if (!packageJsonData.resolutions) {
      packageJsonData.resolutions = {};
      modified = true;
    }
    
    packageJsonData.resolutions.punycode = "^2.3.1";
    
    // Asegurar que existe la sección 'overrides'
    if (!packageJsonData.overrides) {
      packageJsonData.overrides = {};
      modified = true;
    }
    
    packageJsonData.overrides.punycode = "^2.3.1";
    
    // Guardar cambios si fue modificado
    if (modified) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonData, null, 2));
      console.log('✅ package.json actualizado correctamente');
    } else {
      console.log('✅ package.json ya está correctamente configurado');
    }
  } catch (packageJsonError) {
    console.error('❌ Error al procesar package.json:', packageJsonError.message);
  }
  
  // Ejecutar el comando de compilación de Next.js con SWC forzado
  console.log('🚀 Iniciando compilación de Next.js con SWC...');
  try {
    // Configurar variables de entorno para forzar SWC
    process.env.NODE_OPTIONS = '--max-old-space-size=4096';
    process.env.NEXT_TELEMETRY_DISABLED = '1';
    process.env.NEXT_FORCE_SWC = 'true';
    
    // Usamos cross-env para asegurar que funcione en todos los sistemas
    execSync('npx cross-env NEXT_FORCE_SWC=true next build', { 
      stdio: 'inherit', 
      env: process.env 
    });
  } catch (buildError) {
    console.error('❌ Error durante la compilación con Next.js:', buildError);
    // Intentar método alternativo
    console.log('🔄 Intentando método alternativo de compilación...');
    try {
      execSync('npx next build', { 
        stdio: 'inherit', 
        env: process.env 
      });
    } catch (alternativeBuildError) {
      console.error('❌ El método alternativo también falló:', alternativeBuildError);
      process.exit(1);
    }
  }
  
  console.log('✅ Compilación completada exitosamente');
} catch (error) {
  console.error('❌ Error durante la compilación:', error);
  process.exit(1);
} 