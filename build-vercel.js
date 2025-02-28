// Script de compilación personalizado para Vercel
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Iniciando script de compilación personalizado para Vercel');

try {
  // Asegurarse de que todas las dependencias de Babel estén instaladas
  console.log('🔧 Verificando dependencias de Babel...');
  
  // Lista de dependencias de Babel necesarias
  const babelDependencies = [
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
  const dependencies = packageJson.dependencies || {};
  
  const missingDeps = babelDependencies.filter(dep => 
    !devDependencies[dep] && !dependencies[dep]
  );
  
  if (missingDeps.length > 0) {
    console.log(`📥 Instalando dependencias faltantes: ${missingDeps.join(', ')}`);
    execSync(`npm install --save-dev ${missingDeps.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ Dependencias instaladas correctamente');
  } else {
    console.log('✅ Todas las dependencias de Babel ya están instaladas');
  }
  
  // Verificar configuración de Babel
  const babelrcPath = path.join(process.cwd(), '.babelrc');
  if (!fs.existsSync(babelrcPath)) {
    console.log('📝 Creando archivo .babelrc...');
    fs.writeFileSync(babelrcPath, JSON.stringify({
      "presets": ["next/babel"]
    }, null, 2));
    console.log('✅ Archivo .babelrc creado correctamente');
  } else {
    console.log('✅ Archivo .babelrc ya existe');
  }
  
  // Ejecutar el comando de compilación estándar de Next.js
  console.log('🚀 Iniciando compilación de Next.js...');
  execSync('next build', { stdio: 'inherit' });
  
  console.log('✅ Compilación completada exitosamente');
} catch (error) {
  console.error('❌ Error durante la compilación:', error);
  process.exit(1);
} 