// Configuración simplificada para mejor compatibilidad con Vercel

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignorar errores de ESLint y TypeScript durante el build para Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Mantener la optimización de imágenes desactivada para evitar problemas
  images: {
    unoptimized: true,
  },
  
  // Eliminar TODAS las características experimentales
  experimental: {
    // Explícitamente desactivamos todas las características experimentales
    webpackBuildWorker: false,
    serverComponentsExternalPackages: [],
    serverActions: false
  },
  
  // Configuración para minimizar la carga de memoria
  webpack: (config) => {
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
    return config;
  },
  
  // Aumentar los tiempos de espera para compilación
  staticPageGenerationTimeout: 180,
  
  // Entorno mínimo para producción
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV || 'production',
  },
  
  // Desactivar la generación de mapas de origen para reducir el tamaño de los archivos
  productionBrowserSourceMaps: false
}

export default nextConfig
