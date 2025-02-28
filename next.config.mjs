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
  
  // Usar serverExternalPackages en lugar de experimental.serverComponentsExternalPackages
  serverExternalPackages: [],
  
  // Minimizar características experimentales
  experimental: {
    // Explícitamente desactivar características experimentales problemáticas
    webpackBuildWorker: false,
    serverActions: false
  },
  
  // Configuración para minimizar la carga de memoria
  webpack: (config) => {
    // Añadir soporte explícito para Babel
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', '.json'];

    // Configuración de rendimiento
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    };

    return config;
  },
  
  // Aumentar los tiempos de espera para compilación
  staticPageGenerationTimeout: 180,
  
  // Entorno mínimo para producción
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV || 'production',
  },
  
  // Desactivar la generación de mapas de origen para reducir el tamaño de los archivos
  productionBrowserSourceMaps: false,

  // Usar SWC para compilación aunque exista configuración de Babel
  // Esto es necesario para que "next/font" funcione correctamente
  swcMinify: true
}

export default nextConfig
