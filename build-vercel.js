// Script de compilación personalizado para Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Iniciando script de compilación personalizado para Vercel');

try {
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
  
  // Eliminar archivo .babelrc si existe para evitar conflictos con SWC
  const babelrcPath = path.join(process.cwd(), '.babelrc');
  if (fs.existsSync(babelrcPath)) {
    console.log('🗑️ Eliminando archivo .babelrc para usar SWC...');
    fs.unlinkSync(babelrcPath);
    console.log('✅ Archivo .babelrc eliminado correctamente');
  } else {
    console.log('✅ No se encontró .babelrc, se usará SWC por defecto');
  }

  // Verificar si existe una referencia circular en package.json y eliminarla si existe
  if (packageJson.dependencies && packageJson.dependencies['proalab-webpage']) {
    console.log('🔄 Eliminando referencia circular en package.json...');
    delete packageJson.dependencies['proalab-webpage'];
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Referencia circular eliminada correctamente');
  }
  
  // Ejecutar el comando de compilación estándar de Next.js
  console.log('🚀 Iniciando compilación de Next.js...');
  execSync('next build', { stdio: 'inherit' });
  
  console.log('✅ Compilación completada exitosamente');
} catch (error) {
  console.error('❌ Error durante la compilación:', error);
  process.exit(1);
} 