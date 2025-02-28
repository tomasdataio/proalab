/**
 * Script para limpiar caché y archivos temporales
 * 
 * Este script elimina la caché y archivos temporales que podrían
 * estar causando problemas durante la compilación en Vercel.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Iniciando limpieza de caché y archivos temporales...');

// Directorios a limpiar
const dirsToClean = [
  '.next',
  '.swc',
  'node_modules/.cache'
];

// Archivos a eliminar
const filesToDelete = [
  '.babel-cache'
];

// Eliminar directorios
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
  } else {
    console.log(`ℹ️ Directorio no encontrado: ${dir}`);
  }
});

// Eliminar archivos específicos
filesToDelete.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  
  if (fs.existsSync(filePath)) {
    try {
      console.log(`🗑️ Eliminando archivo: ${file}`);
      fs.unlinkSync(filePath);
      console.log(`✅ Archivo eliminado: ${file}`);
    } catch (error) {
      console.error(`❌ Error al eliminar archivo ${file}:`, error.message);
    }
  } else {
    console.log(`ℹ️ Archivo no encontrado: ${file}`);
  }
});

// Limpiar caché de npm
try {
  console.log('🧹 Limpiando caché de npm...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('✅ Caché de npm limpiada correctamente');
} catch (error) {
  console.error('❌ Error al limpiar caché de npm:', error.message);
}

console.log('✨ Limpieza completada. Esto debería resolver problemas de caché.');

// Crear marcador para indicar que se ha limpiado la caché
fs.writeFileSync(path.join(process.cwd(), '.cache-cleaned'), new Date().toISOString());

module.exports = {
  cleaned: true
}; 