// Script de compilación personalizado para Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Iniciando script de compilación personalizado para Vercel');

try {
  // Ejecutar script de limpieza de caché
  const clearCacheScriptPath = path.join(process.cwd(), 'scripts', 'clear-cache.js');
  
  if (fs.existsSync(clearCacheScriptPath)) {
    console.log('🧹 Ejecutando limpieza de caché...');
    require(clearCacheScriptPath);
  } else {
    console.log('⚠️ Script de limpieza de caché no encontrado. Se omite este paso.');
  }

  // Verificar y corregir problemas con .babelrc
  const babelrcPath = path.join(process.cwd(), '.babelrc');
  if (fs.existsSync(babelrcPath)) {
    console.log('🗑️ Eliminando archivo .babelrc para usar SWC...');
    try {
      fs.unlinkSync(babelrcPath);
      console.log('✅ Archivo .babelrc eliminado correctamente');
    } catch (error) {
      console.error('⚠️ No se pudo eliminar .babelrc, intentando sobrescribir...');
      // Si no se puede eliminar, intentamos sobrescribir con una configuración mínima
      const minimalBabelConfig = {
        "presets": ["next/babel"]
      };
      fs.writeFileSync(babelrcPath, JSON.stringify(minimalBabelConfig, null, 2));
      console.log('✅ Archivo .babelrc sobrescrito con configuración mínima');
    }
  } else {
    console.log('✅ No se encontró .babelrc, se usará SWC por defecto');
  }
  
  // Ejecutar primero el script de parche para componentes
  const patchScriptPath = path.join(process.cwd(), 'scripts', 'patch-components.js');
  
  // Verificar si existe el directorio scripts y crearlo si no existe
  const scriptsDir = path.join(process.cwd(), 'scripts');
  if (!fs.existsSync(scriptsDir)) {
    console.log('📁 Creando directorio para scripts...');
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  
  // Ejecutar el script de parche solo si no se ha aplicado antes
  const patchedMarker = path.join(process.cwd(), '.patched');
  if (!fs.existsSync(patchedMarker)) {
    console.log('🔧 Ejecutando script de parche para componentes...');
    
    if (fs.existsSync(patchScriptPath)) {
      require(patchScriptPath);
    } else {
      console.warn('⚠️ Script de parche no encontrado. Se omite este paso.');
    }
  } else {
    console.log('✅ Los parches ya han sido aplicados previamente');
  }
  
  // Asegurarse de que todas las dependencias necesarias estén instaladas
  console.log('🔧 Verificando dependencias necesarias...');
  
  // Lista de dependencias necesarias
  const dependencies = [
    '@babel/core',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@babel/runtime',
    '@babel/runtime-corejs3',
    'babel-plugin-transform-react-remove-prop-types',
    'core-js'
  ];

  // Instalar cualquier dependencia faltante
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const devDependencies = packageJson.devDependencies || {};
  const deps = packageJson.dependencies || {};
  
  const missingDeps = dependencies.filter(dep => 
    !devDependencies[dep] && !deps[dep]
  );
  
  if (missingDeps.length > 0) {
    console.log(`📥 Instalando dependencias faltantes: ${missingDeps.join(', ')}`);
    execSync(`npm install --save-dev ${missingDeps.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente');
  } else {
    console.log('✅ Todas las dependencias necesarias ya están instaladas');
  }

  // Verificar si existe una referencia circular en package.json y eliminarla si existe
  if (packageJson.dependencies && packageJson.dependencies['proalab-webpage']) {
    console.log('🔄 Eliminando referencia circular en package.json...');
    delete packageJson.dependencies['proalab-webpage'];
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Referencia circular eliminada correctamente');
  }
  
  // Ejecutar el comando de compilación usando npx para asegurar que se encuentre
  console.log('🚀 Iniciando compilación de Next.js...');
  try {
    // Usar NODE_OPTIONS para aumentar el límite de memoria
    process.env.NODE_OPTIONS = '--max-old-space-size=4096';
    execSync('npx next build', { stdio: 'inherit', env: process.env });
  } catch (buildError) {
    console.error('❌ Error durante la compilación con Next.js:', buildError);
    // Intentar un enfoque alternativo si falla el comando principal
    console.log('🔄 Intentando método alternativo...');
    execSync('node_modules/.bin/next build', { stdio: 'inherit', env: process.env });
  }
  
  console.log('✅ Compilación completada exitosamente');
} catch (error) {
  console.error('❌ Error durante la compilación:', error);
  process.exit(1);
} 