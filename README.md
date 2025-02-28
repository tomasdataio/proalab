# PROALAB

## Descripción del Proyecto

PROALAB es una plataforma de análisis de datos para el mercado laboral, desarrollada con Next.js para el frontend y Supabase como backend. Proporciona dashboards, análisis sectorial, y tendencias ocupacionales para ayudar en la toma de decisiones académicas y profesionales.

## Tecnologías Utilizadas

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Despliegue**: Vercel (frontend), Supabase (base de datos)
- **Visualización de Datos**: Recharts, D3.js
- **UI Components**: Radix UI
- **Formularios**: React Hook Form, Zod

## Estructura del Proyecto

```
proalab/
├── app/                    # Estructura de rutas y páginas (Next.js App Router)
│   ├── api/                # Endpoints de API
│   ├── carreras/           # Páginas de carreras
│   ├── dashboards/         # Diferentes dashboards (análisis, sectores, etc.)
│   ├── herramientas/       # Herramientas adicionales
│   ├── layout.tsx          # Layout principal de la aplicación
│   └── page.tsx            # Página de inicio
├── components/             # Componentes reutilizables
│   ├── ui/                 # Componentes UI básicos
│   ├── visualizaciones/    # Componentes de visualización de datos
│   └── ...                 # Otros componentes (header, footer, etc.)
├── lib/                    # Utilidades y configuraciones
│   ├── supabase.ts         # Configuración de Supabase
│   └── utils.ts            # Funciones utilitarias
├── public/                 # Archivos estáticos
├── styles/                 # Estilos globales
├── supabase/               # Configuración de Supabase
│   └── migrations/         # Migraciones SQL
├── types/                  # Definiciones de tipos TypeScript
├── hooks/                  # Custom hooks
├── .env.local              # Variables de entorno locales
├── next.config.mjs         # Configuración de Next.js
├── package.json            # Dependencias y scripts
└── tailwind.config.js      # Configuración de Tailwind CSS
```

## Estructura de la Base de Datos

El proyecto utiliza Supabase con PostgreSQL y consta de las siguientes tablas principales:

- **market_trends**: Tendencias del mercado laboral por sector
- **skills_demand**: Demanda de habilidades específicas
- **career_insights**: Análisis detallado de carreras profesionales

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tomasdataio/proalab.git
cd proalab
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env.local` con las siguientes variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://uelfawlakixwmjxgmalp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
```

## Ejecución en Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Despliegue

- **Frontend**: Desplegado en Vercel
- **Backend**: Alojado en Supabase
