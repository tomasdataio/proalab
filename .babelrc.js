// Configuración de Babel compatible con Next.js y SWC
module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: 'react'
        }
      }
    ]
  ],
  // No añadir plugins personalizados para evitar conflictos con SWC
  plugins: []
} 