// Configuración simplificada compatible con Next.js 15.2.0

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignorar errores de ESLint y TypeScript durante el build para Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Desactivar optimización de imágenes para evitar problemas
  images: {
    unoptimized: true,
  },
  
  // Configuración de componentes de servidor externos
  serverComponentsExternalPackages: [],
  
  // Opciones experimentales minimalistas
  experimental: {
    // Desactivar worker de webpack de forma segura
    webpackBuildWorker: false,
  },
  
  // Configuración para minimizar la carga de memoria
  webpack: (config) => {
    // Soporte explícito para extensiones de archivo
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
  
  // Desactivar la generación de mapas de origen para producción
  productionBrowserSourceMaps: false,
}

export default nextConfig
