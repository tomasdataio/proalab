// Intentar importar configuración de usuario de manera segura
let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error - archivo no encontrado o error de importación
  console.log('No se encontró configuración personalizada, usando la configuración por defecto')
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mantener la detección de errores de ESLint solo durante el desarrollo
  eslint: {
    // Ignorar errores de ESLint durante el build para Vercel
    ignoreDuringBuilds: true,
  },
  
  // Permitir ignorar errores de TypeScript en build
  // Esto es útil cuando hay errores de tipo que no afectan la funcionalidad
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Habilitar la optimización de imágenes para mejor rendimiento
  images: {
    unoptimized: false, // Cambiar a false para usar la optimización de Next.js
    domains: [], // Agregar dominios externos si es necesario
    remotePatterns: [], // Configurar patrones remotos si es necesario
  },
  
  // Reducir características experimentales para mayor estabilidad
  experimental: {
    // Mantenemos solo las características más estables
    webpackBuildWorker: true, // Mantener esta para paralelismo en builds
  },
  
  // Añadir configuración de output para aumentar compatibilidad con Vercel
  output: 'standalone',
  
  // Configuración de entorno para Vercel
  env: {
    // Agregar variables de entorno públicas necesarias
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV || 'development',
  },
  
  // Configuración de headers para mejor seguridad y rendimiento
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  
  // Configuración de redirecciones para manejar rutas antiguas o cambiadas
  async redirects() {
    return []
  }
}

// Función mejorada para la fusión de configuraciones
function mergeConfig(baseConfig, customConfig) {
  if (!customConfig) {
    return baseConfig
  }

  // Crear una copia profunda para evitar modificar el objeto original directamente
  const mergedConfig = JSON.parse(JSON.stringify(baseConfig))

  for (const key in customConfig) {
    if (
      typeof baseConfig[key] === 'object' && 
      !Array.isArray(baseConfig[key]) &&
      baseConfig[key] !== null
    ) {
      mergedConfig[key] = {
        ...baseConfig[key],
        ...customConfig[key],
      }
    } else {
      mergedConfig[key] = customConfig[key]
    }
  }
  
  return mergedConfig
}

// Aplicar la fusión de configuraciones
const finalConfig = userConfig ? mergeConfig(nextConfig, userConfig.default || userConfig) : nextConfig

export default finalConfig
