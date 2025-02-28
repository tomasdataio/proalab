# ProALab - Prototipo de Observatorio del Mercado Laboral

Prototipo de observatorio del mercado laboral y prospección educativa para ProALab.

## Tecnologías

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Base de Datos**: [Supabase](https://supabase.com/)
- **Estilización**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes**: [Shadcn/UI](https://ui.shadcn.com/)
- **Gráficos**: [Recharts](https://recharts.org/)
- **Despliegue**: [Vercel](https://vercel.com/)

## Documentación

Este proyecto incluye varios documentos que detallan diferentes aspectos del sistema:

- [**README-DASHBOARDS.md**](./README-DASHBOARDS.md) - Documentación detallada de todos los dashboards y visualizaciones.
- [**README-TABLAS.md**](./README-TABLAS.md) - Estructura de todas las tablas existentes y propuestas en Supabase.
- [**README-MEJORAS.md**](./README-MEJORAS.md) - Recomendaciones detalladas de mejoras para el proyecto.
- [**README-PROBLEMAS-REGIONES.md**](./README-PROBLEMAS-REGIONES.md) - Análisis del problema con las regiones y soluciones propuestas.

## Estructura del Proyecto

```
proalab-webpage/
├── app/              # Rutas y páginas de la aplicación (Next.js App Router)
│   ├── api/          # Endpoints de API
│   ├── dashboard/    # Páginas de dashboards
│   └── ...
├── components/       # Componentes reutilizables
├── lib/              # Utilidades y configuraciones
│   ├── supabase.ts   # Cliente de Supabase
│   └── ...
├── hooks/            # Custom hooks de React
├── styles/           # Estilos globales
├── public/           # Archivos estáticos
├── analysis/         # Scripts de análisis de datos 
└── ...
```

## Dashboards

El sistema incluye diversos dashboards interactivos para análisis educativo y laboral:

1. **Distribución Institucional** - Análisis de instituciones educativas por tipo y región.
2. **Brechas de Género** - Visualización de brechas de género en educación y empleo.
3. **Análisis Sectorial** - Exploración de sectores económicos y su demanda laboral.
4. **Tendencias Sectores** - Tendencias históricas y proyecciones de sectores económicos.
5. **Explorador de Carreras** - Comparativa de datos sobre programas educativos.
6. **Análisis por Área** - Estadísticas por área de conocimiento.
7. **Tendencias Ocupacionales** - Tendencias del mercado laboral para ocupaciones.
8. **Mercado Laboral** - Indicadores generales del mercado de trabajo.

Para más detalles sobre cada dashboard, consulta [README-DASHBOARDS.md](./README-DASHBOARDS.md).

## Estado Actual de Desarrollo

- ✅ Estructura base del proyecto
- ✅ Configuración de Supabase
- ✅ Dashboard de Distribución Institucional
- ⚠️ Dashboards restantes (implementación parcial)
- ⚠️ Integración con datos reales (parcial)
- ❌ Pruebas automatizadas

Para ver las mejoras propuestas, consulta [README-MEJORAS.md](./README-MEJORAS.md).

## Instalación y Desarrollo

1. Clona el repositorio
   ```bash
   git clone https://github.com/tu-usuario/proalab-webpage.git
   cd proalab-webpage
   ```

2. Instala las dependencias
   ```bash
   npm install
   ```

3. Configura las variables de entorno
   Copia el archivo `.env.example` a `.env.local` y actualiza las variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-de-supabase
   ```

4. Inicia el servidor de desarrollo
   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Scripts de Análisis

En el directorio `analysis/` se encuentran varios scripts para diagnóstico y análisis de datos:

- `diagnostico_tablas.py` - Verifica las tablas existentes en Supabase
- `mostrar_datos.py` - Muestra datos de muestra de las tablas existentes

Para ejecutar estos scripts, asegúrate de tener instaladas las dependencias de Python:
```bash
pip install python-dotenv supabase tabulate
```

## Supabase y Migraciones

Este proyecto utiliza Supabase como base de datos. Para más información sobre la estructura de tablas y las migraciones pendientes, consulta [README-TABLAS.md](./README-TABLAS.md).

## Despliegue

El proyecto está configurado para desplegarse en Vercel. Puedes desplegar tu propia instancia siguiendo estos pasos:

1. Importa el repositorio en Vercel
2. Configura las variables de entorno en Vercel
3. Despliega la aplicación
