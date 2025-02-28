const fs = require('fs');
const path = require('path');

// Leer el package.json actual
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Leer el package-babel.json con las dependencias de Babel
const babelDepsPath = path.join(__dirname, 'package-babel.json');
const babelDeps = JSON.parse(fs.readFileSync(babelDepsPath, 'utf8'));

// Fusionar devDependencies
packageJson.devDependencies = {
  ...packageJson.devDependencies,
  ...babelDeps.devDependencies
};

// Actualizar la versión de dependencias existentes
if (!packageJson.dependencies["core-js"]) {
  packageJson.dependencies["core-js"] = "3.31.1";
}

// Guardar el package.json actualizado
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

console.log('Dependencias de Babel fusionadas correctamente con package.json'); 