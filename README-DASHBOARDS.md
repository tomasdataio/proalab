# ProALab - Documentación de Dashboards

Este documento describe los dashboards disponibles en la plataforma ProALab, sus componentes, rutas asociadas y estructuras de datos necesarias.

## Índice

1. [Dashboard: Distribución Institucional](#distribución-institucional)
2. [Dashboard: Brechas de Género](#brechas-de-género)
3. [Dashboard: Análisis Sectorial](#análisis-sectorial)
4. [Dashboard: Tendencias Sectores](#tendencias-sectores)
5. [Dashboard: Explorador de Carreras](#explorador-de-carreras)
6. [Dashboard: Análisis por Área](#análisis-por-área)
7. [Dashboard: Tendencias Ocupacionales](#tendencias-ocupacionales)
8. [Dashboard: Mercado Laboral](#mercado-laboral)

---

## Distribución Institucional

### Descripción
Este dashboard muestra la distribución de instituciones educativas por tipo, acreditación y región geográfica en Chile.

### Estructura de Archivos
- **Vista**: `app/dashboards/distribucion-institucional/page.tsx`
- **API**: `app/api/dashboard/distribucion-institucional/route.ts`

### Datos Utilizados
La información proviene de la tabla `dashboard_distribucion_institucional` en Supabase.

#### Estructura de la Tabla
| Campo | Tipo | Descripción |
|-------|------|-------------|
| tipo | texto | Tipo de institución (Universidades, Centros de Formación Técnica, Institutos Profesionales) |
| acreditacion | texto | Nivel de acreditación (3 años, 4 años, 5 años, etc.) |
| region | texto | Región geográfica |
| num_instituciones | número | Cantidad de instituciones |
| num_carreras | número | Cantidad de carreras |
| matricula_total | número | Total de matriculados |

#### Ejemplo de Datos
```
{
  "tipo": "Centros de Formacion Tecnica",
  "acreditacion": "3 anos",
  "region": "Sin Región",
  "num_instituciones": 3,
  "num_carreras": 79,
  "matricula_total": 12852
}
```

### Filtros Disponibles
- **Tipo de Institución**: Universidades, Centros de Formación Técnica, Institutos Profesionales
- **Acreditación**: 3 años, 4 años, 5 años, 6 años, 7 años, No Acreditada
- **Región**: Todas las regiones de Chile

### Visualizaciones
1. **Mapa de Chile**: Muestra la distribución geográfica de instituciones usando la escala de color azul.
   - **Componente**: `<MapaChile datos={datos} valorCampo="num_instituciones" colorEscala="blues" />`

2. **Gráfico de Barras - Tipos de Institución por Región**:
   - **Componente**: `<GraficoBarra datos={datos} campoX="tipo" campoY="num_instituciones" agruparPor="region" apilado={true} />`

3. **Gráfico de Barras - Acreditación por Tipo de Institución**:
   - **Componente**: `<GraficoBarra datos={datos} campoX="acreditacion" campoY="num_instituciones" agruparPor="tipo" apilado={false} />`

4. **Tabla Resumen**:
   - **Componente**: `<TablaResumen datos={datos} columnas={...} ordenablePor={...} />`

### Interacción con la API
La API acepta los siguientes parámetros de consulta:
- `tipo`: Filtrar por tipo de institución
- `acreditacion`: Filtrar por nivel de acreditación
- `region`: Filtrar por región

### Tablas Relacionadas
- `instituciones`: Información detallada de cada institución
- `regiones`: Información sobre las regiones de Chile

### Estado Actual
- ✅ Tabla principal existente con datos
- ✅ Rutas y componentes implementados
- ✅ Visualizaciones funcionando

### Mejoras Pendientes
- Completar la relación entre la tabla `dashboard_distribucion_institucional` y la tabla `regiones` para permitir filtrado avanzado
- Actualizar la lista completa de regiones en los filtros

---

## Brechas de Género

### Descripción
Este dashboard analiza las disparidades de género en educación y empleo por áreas de conocimiento y regiones en Chile.

### Estructura de Archivos
- **Vista**: `app/dashboards/brechas-genero/page.tsx`
- **API**: `app/api/dashboard/brechas-genero/route.ts`

### Datos Necesarios
La información debería provenir de una tabla `dashboard_brechas_genero` en Supabase, que actualmente no existe.

#### Estructura de Tabla Requerida
| Campo | Tipo | Descripción |
|-------|------|-------------|
| area | texto | Área de conocimiento |
| region | texto | Región geográfica |
| pct_mujeres | número | Porcentaje de mujeres en el área |
| pct_hombres | número | Porcentaje de hombres en el área |
| brecha_desocupacion | número | Diferencia en tasas de desocupación (puntos porcentuales) |
| brecha_informalidad | número | Diferencia en tasas de informalidad laboral (puntos porcentuales) |

#### Ejemplo de Datos Esperados
```
{
  "area": "Tecnología",
  "region": "Metropolitana",
  "pct_mujeres": 25.5,
  "pct_hombres": 74.5,
  "brecha_desocupacion": 3.2,
  "brecha_informalidad": 5.6
}
```

### Filtros Disponibles
- **Área de Conocimiento**: Administración y Comercio, Agropecuaria, Arte y Arquitectura, etc.
- **Región**: Nacional, Metropolitana, etc.

### Visualizaciones
1. **Gráfico de Barras - Distribución de Género por Área**:
   - **Componente**: `<GraficoBarra datos={datosDistribucion} campoX="area" campoY="valor" agruparPor="genero" />`

2. **Gráfico de Dispersión - Brechas de Género en Desocupación**:
   - **Componente**: `<GraficoDispersion datos={datos} campoX="pct_mujeres" campoY="brecha_desocupacion" etiqueta="area" />`

3. **Mapa de Chile - Brechas por Región**:
   - **Componente**: `<MapaChile datos={datosPorRegion} valorCampo="valor" colorEscala="reds" />`

4. **Tabla Resumen - Brechas de Género**:
   - **Componente**: `<TablaResumen datos={datos} columnas={...} ordenablePor={...} />`

### Estado Actual
- ❌ Tabla principal inexistente
- ✅ Rutas y componentes implementados
- ❌ API implementada pero sin datos

### Tablas a Crear
- `dashboard_brechas_genero`: Datos sobre brechas de género por área y región

---

## Análisis Sectorial

### Descripción
Este dashboard analiza diferentes sectores económicos, sus indicadores de empleo y tendencias.

### Estructura de Archivos
- **Vista**: `app/dashboards/analisis-sectorial/page.tsx`
- **API**: `app/api/dashboard/analisis-sectorial/route.ts`

### Datos Necesarios
La información debería provenir de una tabla `dashboard_analisis_sectorial` en Supabase, que actualmente no existe.

#### Estructura de Tabla Requerida
| Campo | Tipo | Descripción |
|-------|------|-------------|
| sector | texto | Sector económico |
| region | texto | Región geográfica |
| tasa_desocupacion | número | Tasa de desocupación en el sector |
| variabilidad | número | Índice de variabilidad del empleo |
| fuerza_trabajo | número | Cantidad de personas en la fuerza laboral |
| informalidad | número | Porcentaje de informalidad laboral |
| crecimiento | número | Tasa de crecimiento del sector |
| empleabilidad | número | Índice de empleabilidad |

#### Ejemplo de Datos Esperados
```
{
  "sector": "Minería",
  "region": "Antofagasta",
  "tasa_desocupacion": 3.2,
  "variabilidad": 15.3,
  "fuerza_trabajo": 45000,
  "informalidad": 12.5,
  "crecimiento": 4.5,
  "empleabilidad": 85.5
}
```

### Filtros Disponibles
- **Sector Económico**: Agricultura, Minería, Industria Manufacturera, etc.
- **Región**: Nacional, Metropolitana, etc.

### Visualizaciones
1. **Gráfico Radar - Métricas por Sector**:
   - **Componente**: `<GraficoRadar datos={datosRadar} metricas={metricasRadar} campoCategoria="sector" />`

2. **Gráfico de Dispersión - Comparación de Sectores**:
   - Componente no especificado en el código de ejemplo, pero parte del diseño.

3. **Tabla Resumen - Indicadores por Sector**:
   - **Componente**: `<TablaResumen datos={datos} columnas={...} ordenablePor={...} />`

### Estado Actual
- ❌ Tabla principal inexistente
- ✅ Rutas y componentes implementados
- ❌ API implementada pero sin datos

### Tablas a Crear
- `dashboard_analisis_sectorial`: Datos sobre métricas de sectores económicos

---

## Tendencias Sectores

### Descripción
Este dashboard visualiza las tendencias históricas en diferentes sectores económicos, mostrando su evolución a lo largo del tiempo y las diferencias regionales.

### Estructura de Archivos
- **Vista**: `app/dashboards/tendencias-sectores/page.tsx`
- **API**: `app/api/dashboard/sectores-tendencias/route.ts`

### Datos Necesarios
La información debería provenir de una tabla `dashboard_sectores_tendencias` en Supabase, que actualmente no existe.

#### Estructura de Tabla Requerida
| Campo | Tipo | Descripción |
|-------|------|-------------|
| sector | texto | Sector económico |
| region | texto | Región geográfica |
| tmp_fecha | fecha | Fecha de medición |
| valor | número | Valor del indicador (por ejemplo, empleo) |
| crecimiento | número | Tasa de crecimiento respecto al período anterior |
| tendencia | número | Indicador de tendencia futura |
| demanda | número | Nivel de demanda laboral |

#### Ejemplo de Datos Esperados
```
{
  "sector": "Minería",
  "region": "Antofagasta",
  "tmp_fecha": "2022-06-30",
  "valor": 12500,
  "crecimiento": 2.3,
  "tendencia": 4.5,
  "demanda": 85
}
```

### Filtros Disponibles
- **Sector Económico**: Agricultura, Minería, Industria Manufacturera, etc.
- **Rango de Fechas**: Fechas de inicio y fin para el análisis
- **Región**: Todas las regiones de Chile

### Visualizaciones
1. **Gráfico de Línea - Evolución Temporal**:
   - **Componente**: `<GraficoLinea datos={...} campoX="tmp_fecha" campoY="valor" agruparPor="sector" />`

2. **Mapa de Calor - Tendencias por Sector/Tiempo**:
   - **Componente**: `<MapaCalor datos={...} campoX="tmp_fecha" campoY="sector" valorCampo="crecimiento" />`

3. **Mapa de Chile - Indicadores Regionales**:
   - **Componente**: `<MapaChile datos={...} valorCampo="valor" colorEscala="blues" />`

### Estado Actual
- ❌ Tabla principal inexistente
- ✅ Rutas y componentes implementados
- ❌ API implementada pero sin datos

### Tablas a Crear
- `dashboard_sectores_tendencias`: Datos históricos y tendencias por sector económico

---

## Explorador de Carreras

### Descripción
Este dashboard permite buscar y explorar programas educativos específicos, filtrando por institución, área de conocimiento y región, con estadísticas sobre matrícula y distribución por género.

### Estructura de Archivos
- **Vista**: `app/dashboards/explorador-carreras/page.tsx`
- **API**: `app/api/dashboard/explorador-carreras/route.ts`

### Datos Necesarios
La información debería provenir de una tabla `dashboard_explorador_carreras` en Supabase, que actualmente no existe.

#### Estructura de Tabla Requerida
| Campo | Tipo | Descripción |
|-------|------|-------------|
| carrera | texto | Nombre del programa educativo |
| area | texto | Área de conocimiento |
| institucion | texto | Nombre de la institución |
| tipo_inst | texto | Tipo de institución (Universidad, CFT, IP) |
| region | texto | Región geográfica |
| mat_total | número | Matrícula total |
| mat_mujeres | número | Matrícula de mujeres |
| mat_hombres | número | Matrícula de hombres |
| edad_prom | número | Edad promedio de estudiantes |
| duracion | número | Duración teórica del programa (semestres) |
| arancel | número | Arancel anual |
| empleabilidad | número | Tasa de empleabilidad al primer año |
| ingreso_prom | número | Ingreso promedio al 4° año |

#### Ejemplo de Datos Esperados
```
{
  "carrera": "Ingeniería Civil Informática",
  "area": "Tecnología",
  "institucion": "Universidad de Chile",
  "tipo_inst": "Universidad",
  "region": "Metropolitana",
  "mat_total": 350,
  "mat_mujeres": 70,
  "mat_hombres": 280,
  "edad_prom": 22.5,
  "duracion": 12,
  "arancel": 4500000,
  "empleabilidad": 95.2,
  "ingreso_prom": 1850000
}
```

### Filtros Disponibles
- **Búsqueda de Carrera**: Búsqueda textual por nombre de programa
- **Área de Conocimiento**: Administración y Comercio, Agropecuaria, Arte y Arquitectura, etc.
- **Tipo de Institución**: Universidad, Centro de Formación Técnica, Instituto Profesional
- **Región**: Todas las regiones de Chile

### Visualizaciones
1. **Tabla Resumen - Programas Educativos**:
   - **Componente**: `<TablaResumen datos={datos} columnas={...} ordenablePor={...} />`

2. **Indicadores Resumidos**:
   - Total de programas
   - Matrícula total
   - Distribución por género (% mujeres y % hombres)
   - Edad promedio

### Estado Actual
- ❌ Tabla principal inexistente
- ✅ Rutas y componentes implementados
- ❌ API implementada pero sin datos

### Tablas a Crear
- `dashboard_explorador_carreras`: Datos detallados sobre programas educativos

---

## Análisis por Área

### Descripción
Este dashboard proporciona un análisis comparativo de áreas de conocimiento, incluyendo información sobre sus instituciones, matrícula y programas académicos.

### Estructura de Archivos
- **Vista**: `app/dashboards/analisis-area/page.tsx`
- **API**: `app/api/dashboard/analisis-area/route.ts`

### Datos Necesarios
La información debería provenir de una tabla `dashboard_analisis_area` en Supabase, que actualmente no existe.

#### Estructura de Tabla Requerida
| Campo | Tipo | Descripción |
|-------|------|-------------|
| area_conocimiento | texto | Área de conocimiento |
| num_instituciones | número | Cantidad de instituciones que ofrecen programas en el área |
| num_programas | número | Cantidad de programas educativos en el área |
| matricula_total | número | Total de estudiantes matriculados |
| pct_mujeres | número | Porcentaje de mujeres en el área |
| pct_hombres | número | Porcentaje de hombres en el área |
| empleabilidad | número | Tasa de empleabilidad promedio |
| ingreso_promedio | número | Ingreso promedio al 4° año |
| duracion_real | número | Duración real promedio (semestres) |
| arancel_promedio | número | Arancel promedio anual |

#### Ejemplo de Datos Esperados
```
{
  "area_conocimiento": "Tecnología",
  "num_instituciones": 45,
  "num_programas": 120,
  "matricula_total": 35000,
  "pct_mujeres": 25.5,
  "pct_hombres": 74.5,
  "empleabilidad": 92.3,
  "ingreso_promedio": 1750000,
  "duracion_real": 14.2,
  "arancel_promedio": 4200000
}
```

### Filtros Disponibles
- **Área de Conocimiento**: Administración y Comercio, Agropecuaria, Arte y Arquitectura, etc.

### Visualizaciones
1. **Gráfico de Barras - Matrícula por Área**:
   - **Componente**: `<GraficoBarra datos={datos} campoX="area_conocimiento" campoY="matricula_total" />`

2. **Gráfico de Dispersión - Empleabilidad vs. Ingreso**:
   - **Componente**: `<GraficoDispersion datos={datos} campoX="empleabilidad" campoY="ingreso_promedio" etiqueta="area_conocimiento" />`

3. **Tabla Resumen - Comparativa de Áreas**:
   - **Componente**: `<TablaResumen datos={datos} columnas={...} ordenablePor={...} />`

### Estado Actual
- ❌ Tabla principal inexistente
- ✅ Rutas y componentes implementados
- ❌ API implementada pero sin datos

### Tablas a Crear
- `dashboard_analisis_area`: Datos comparativos por área de conocimiento

---

## Tendencias Ocupacionales

### Descripción
Este dashboard visualiza las tendencias históricas en diferentes categorías ocupacionales, mostrando su evolución a lo largo del tiempo, las habilidades demandadas y la distribución geográfica.

### Estructura de Archivos
- **Vista**: `app/dashboards/tendencias-ocupacionales/page.tsx`
- **API**: `app/api/dashboard/tendencias-ocupacionales/route.ts`

### Datos Necesarios
La información debería provenir de una tabla `dashboard_tendencias_ocupacionales` en Supabase, que actualmente no existe.

#### Estructura de Tabla Requerida
| Campo | Tipo | Descripción |
|-------|------|-------------|
| ocupacion | texto | Categoría ocupacional |
| region | texto | Región geográfica |
| tmp_fecha | fecha | Fecha de medición |
| valor | número | Valor del indicador (por ejemplo, personas empleadas) |
| crecimiento | número | Tasa de crecimiento respecto al período anterior |
| salario_promedio | número | Salario promedio en la ocupación |
| demanda | número | Nivel de demanda laboral (índice) |
| vacantes | número | Número de vacantes disponibles |

#### Ejemplo de Datos Esperados
```
{
  "ocupacion": "Profesionales",
  "region": "Metropolitana",
  "tmp_fecha": "2022-06-30",
  "valor": 250000,
  "crecimiento": 1.8,
  "salario_promedio": 1450000,
  "demanda": 75,
  "vacantes": 3500
}
```

### Filtros Disponibles
- **Categoría Ocupacional**: Directores, Profesionales, Técnicos, etc.
- **Rango de Fechas**: Fechas de inicio y fin para el análisis
- **Región**: Todas las regiones de Chile

### Visualizaciones
1. **Gráfico de Línea - Evolución Temporal**:
   - **Componente**: `<GraficoLinea datos={...} campoX="tmp_fecha" campoY="valor" agruparPor="ocupacion" />`

2. **Mapa de Calor - Tendencias por Ocupación/Tiempo**:
   - **Componente**: `<MapaCalor datos={...} campoX="tmp_fecha" campoY="ocupacion" valorCampo="crecimiento" />`

3. **Tabla Resumen - Datos Ocupacionales**:
   - **Componente**: `<TablaResumen datos={datos} columnas={...} ordenablePor={...} />`

### Estado Actual
- ❌ Tabla principal inexistente
- ✅ Rutas y componentes implementados
- ❌ API implementada pero sin datos

### Tablas a Crear
- `dashboard_tendencias_ocupacionales`: Datos históricos y tendencias por categoría ocupacional

---

## Mercado Laboral

### Descripción
Este dashboard proporciona un resumen general del mercado laboral, incluyendo tendencias globales y habilidades más demandadas.

### Estructura de Archivos
- **Vista**: `app/dashboards/mercado-laboral/page.tsx`
- **API**: No implementada específicamente (lee directamente desde client-side)

### Datos Necesarios
La información debería provenir de las tablas `market_trends` y `skills_demand` en Supabase, que actualmente no existen.

#### Estructura de Tabla `market_trends`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único |
| created_at | fecha | Fecha de creación |
| trend_data | json | Datos de tendencias en formato JSON |

#### Estructura de Tabla `skills_demand`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único |
| skill_name | texto | Nombre de la habilidad |
| demand_score | número | Puntuación de demanda |
| sector | texto | Sector relacionado |
| created_at | fecha | Fecha de creación |

#### Ejemplo de Datos Esperados para `market_trends`
```
{
  "id": 1,
  "created_at": "2022-07-15T10:30:00Z",
  "trend_data": {
    "data": [
      {"date": "2022-01", "value": 105},
      {"date": "2022-02", "value": 110},
      {"date": "2022-03", "value": 108},
      {"date": "2022-04", "value": 115}
    ]
  }
}
```

#### Ejemplo de Datos Esperados para `skills_demand`
```
{
  "id": 1,
  "skill_name": "Programación Python",
  "demand_score": 95,
  "sector": "Tecnología",
  "created_at": "2022-07-15T10:30:00Z"
}
```

### Visualizaciones
1. **Gráfico de Línea - Tendencias del Mercado**:
   - **Componente**: `<Chart data={marketTrends.trend_data.data} xKey="date" yKey="value" />`

2. **Lista - Top 5 Habilidades Demandadas**:
   - Lista simple de habilidades con sus puntuaciones de demanda

### Estado Actual
- ❌ Tablas principales inexistentes (`market_trends`, `skills_demand`)
- ✅ Componente implementado
- ❌ Sin datos disponibles

### Tablas a Crear
- `market_trends`: Tendencias generales del mercado laboral
- `skills_demand`: Habilidades más demandadas por sector 

## Introducción

Los dashboards de ProaLab han sido actualizados para utilizar componentes modernos de shadcn/ui en lugar de D3.js directo. Esto permite:

- Mejor integración con el tema visual de la aplicación
- Soporte para modo oscuro/claro
- Mejor rendimiento y mantenibilidad
- Mayor consistencia visual con el resto de la aplicación

## Componentes de visualización

Se han creado tres componentes principales de visualización que siguen el enfoque de shadcn/ui:

### GraficoBarraShadcn

Componente para crear gráficos de barras utilizando Recharts, un wrapper de React para gráficos basado en D3.js.

```tsx
import { GraficoBarraShadcn } from "@/components/visualizaciones/grafico-barra-shadcn"

<GraficoBarraShadcn 
  datos={datos} 
  campoX="region" 
  campoY="estudiantes" 
  agruparPor="genero" 
  apilado={true}
  titulo="Estudiantes por región y género"
/>
```

**Propiedades:**
- `datos`: Array de objetos con los datos a visualizar
- `campoX`: Campo que se utilizará para el eje X
- `campoY`: Campo que contiene los valores numéricos para el eje Y
- `agruparPor` (opcional): Campo para agrupar los datos y crear barras múltiples
- `apilado` (opcional): Boolean que indica si las barras deben apilarse
- `titulo` (opcional): Título del gráfico
- `colorPalette` (opcional): Array de colores para personalizar la paleta

### MapaChileShadcn

Componente para visualizar datos geográficos de Chile utilizando un enfoque simplificado basado en shadcn/ui.

```tsx
<MapaChileShadcn 
  datos={datos} 
  valorCampo="num_instituciones" 
  colorEscala="blue" 
  titulo="Distribución Geográfica"
/>
```

**Propiedades:**
- `datos`: Array de objetos con los datos a visualizar
- `valorCampo`: Campo que contiene los valores numéricos a representar
- `colorEscala` (opcional): Escala de color a utilizar (blue, green, red, etc.)
- `titulo` (opcional): Título del mapa

### TablaResumenShadcn

Componente para mostrar datos tabulares con capacidad de ordenación utilizando shadcn/ui y @tanstack/react-table.

```tsx
<TablaResumenShadcn
  datos={datos}
  columnas={[
    { field: "region", header: "Región" },
    { field: "poblacion", header: "Población" },
    { field: "superficie", header: "Superficie (km²)" },
  ]}
  ordenablePor={["poblacion", "superficie"]}
  titulo="Resumen de regiones"
/>
```

**Propiedades:**
- `datos`: Array de objetos con los datos a visualizar
- `columnas`: Array de objetos que definen las columnas de la tabla
- `ordenablePor` (opcional): Array de nombres de campos por los que se permite ordenar
- `titulo` (opcional): Título de la tabla

## Conversión de dashboards

Cada dashboard original que utilizaba D3.js tiene ahora una versión alternativa con el sufijo `-shadcn`, por ejemplo:

- `app/dashboards/distribucion-institucional/page.tsx` (versión original con D3.js)
- `app/dashboards/distribucion-institucional/page-shadcn.tsx` (nueva versión con shadcn/ui)

Para utilizar la nueva versión, simplemente renombre los archivos `.tsx` o actualice las rutas en la aplicación.

## Estructura de directorios

```
components/
  visualizaciones/
    grafico-barra-shadcn.tsx    # Nuevo componente de gráfico de barras
    mapa-chile-shadcn.tsx       # Nuevo componente de mapa
    tabla-resumen-shadcn.tsx    # Nuevo componente de tabla
    grafico-barra.tsx           # Componente original con D3.js (deprecado)
    mapa-chile.tsx              # Componente original con D3.js (deprecado)
    tabla-resumen.tsx           # Componente original con D3.js (deprecado)
```

## Cambios en package.json

Se han actualizado las dependencias para incluir:
- `@tanstack/react-table`: Para tablas interactivas
- `recharts`: Para gráficos basados en React, en lugar de D3.js directo

Además, se han fijado versiones específicas para todas las dependencias, eliminando el uso de "latest" que causaba problemas en el despliegue en Vercel.

## Paleta de colores

Los nuevos componentes utilizan automáticamente la paleta de colores definida en Tailwind CSS y shadcn/ui, respetando los temas claro y oscuro. Los colores primarios y de acento se definen en la configuración del tema.

## Modo oscuro/claro

Todos los componentes respetan automáticamente el modo oscuro/claro de la aplicación sin necesidad de configuración adicional.

## Ejemplos

Cada dashboard incluye ejemplos de uso de estos componentes. Consulte el código en `app/dashboards/distribucion-institucional/page-shadcn.tsx` para ver un ejemplo completo.

---

Actualizado por el equipo de ProaLab, 2024. 

## Actualización de Componentes de Visualización

Este documento describe la actualización realizada a los dashboards, migrando de componentes basados en D3.js a componentes basados en shadcn/ui y recharts. Esta actualización proporciona varios beneficios importantes:

### Beneficios de la actualización

- **Mejor integración visual**: Los nuevos componentes se integran perfectamente con el tema visual de la aplicación
- **Soporte para modo oscuro/claro**: Todos los componentes respetan el tema actual del sistema
- **Mejor rendimiento**: Recharts ofrece un mejor rendimiento que D3.js directo para muchos casos de uso
- **Mantenimiento más sencillo**: Código más declarativo y fácil de mantener
- **Consistencia visual**: Interfaz más coherente en toda la aplicación
- **Mejor soporte para dispositivos móviles**: Los componentes son responsivos por defecto

## Nuevos Componentes de Visualización

Se han creado los siguientes componentes de visualización usando shadcn/ui y recharts:

### GraficoBarraShadcn

Componente para crear gráficos de barras, con soporte para agrupación y apilado.

```tsx
<GraficoBarraShadcn 
  datos={datosEjemplo} 
  campoX="categoria" 
  campoY="valor"
  agruparPor="grupo" // Opcional
  apilado={false} // Por defecto
  titulo="Título del gráfico" // Opcional
/>
```

**Propiedades**:
- `datos`: Array de objetos con los datos a visualizar
- `campoX`: Campo a utilizar para el eje X
- `campoY`: Campo a utilizar para el eje Y
- `agruparPor`: Campo para agrupar los datos (opcional)
- `apilado`: Indica si las barras deben apilarse (booleano, por defecto es false)
- `titulo`: Título del gráfico (opcional)
- `colorPalette`: Array de colores a utilizar (opcional)

### GraficoDispersionShadcn

Componente para crear gráficos de dispersión.

```tsx
<GraficoDispersionShadcn
  datos={datos}
  campoX="edad"
  campoY="salario"
  etiqueta="profesion" // Opcional
  tamano="experiencia" // Opcional
  formatoX={(v) => `${v} años`} // Opcional
  formatoY={(v) => `$${v}`} // Opcional
/>
```

**Propiedades**:
- `datos`: Array de objetos con los datos a visualizar
- `campoX`: Campo a utilizar para el eje X
- `campoY`: Campo a utilizar para el eje Y
- `etiqueta`: Campo para etiquetar los puntos (opcional)
- `tamano`: Campo que determina el tamaño de los puntos (opcional)
- `formatoX`: Función para formatear los valores del eje X (opcional)
- `formatoY`: Función para formatear los valores del eje Y (opcional)
- `titulo`: Título del gráfico (opcional)
- `colorPalette`: Array de colores a utilizar (opcional)

### GraficoLineaShadcn

Componente para crear gráficos de líneas temporales o de series.

```tsx
<GraficoLineaShadcn
  datos={datos}
  campoX="fecha"
  campoY="valor"
  series="categoria" // Opcional
  formatoFecha="MMM yyyy" // Opcional
  conPuntos={true} // Opcional
  leyendaInteractiva={true} // Opcional
/>
```

**Propiedades**:
- `datos`: Array de objetos con los datos a visualizar
- `campoX`: Campo a utilizar para el eje X
- `campoY`: Campo a utilizar para el eje Y
- `series`: Campo para generar múltiples series (opcional)
- `formatoFecha`: Formato para fechas en el eje X (opcional)
- `colorPor`: Campo para determinar el color (opcional)
- `conPuntos`: Mostrar puntos en las líneas (booleano, opcional)
- `leyendaInteractiva`: Permitir ocultar/mostrar series con la leyenda (booleano, opcional)
- `titulo`: Título del gráfico (opcional)
- `colorPalette`: Array de colores a utilizar (opcional)

### MapaChileShadcn

Componente para crear visualizaciones de datos regionales en un mapa de Chile.

```tsx
<MapaChileShadcn 
  datos={datosRegionales} 
  valorCampo="indicador" 
  colorEscala="blues" 
  titulo="Distribución regional" // Opcional
/>
```

**Propiedades**:
- `datos`: Array de objetos con datos por región
- `valorCampo`: Campo que contiene el valor a representar
- `colorEscala`: Escala de colores a utilizar (blues, reds, greens, etc.)
- `titulo`: Título del mapa (opcional)

### MapaCalorShadcn

Componente para crear mapas de calor.

```tsx
<MapaCalorShadcn 
  datos={datos} 
  filas="categoria" 
  columnas="periodo" 
  valores="valor" 
  colorEscala="viridis" 
  titulo="Mapa de calor" // Opcional
/>
```

**Propiedades**:
- `datos`: Array de objetos con los datos a visualizar
- `filas`: Campo para las filas del mapa de calor
- `columnas`: Campo para las columnas del mapa de calor
- `valores`: Campo con los valores a representar en el mapa de calor
- `colorEscala`: Escala de colores a utilizar (opcional)
- `titulo`: Título del mapa de calor (opcional)

### GraficoRadarShadcn

Componente para crear gráficos de radar (diagrama de araña).

```tsx
<GraficoRadarShadcn 
  datos={datos} 
  metricas={metricas} 
  etiqueta="categoria" 
  titulo="Análisis multidimensional" // Opcional
/>
```

**Propiedades**:
- `datos`: Array de objetos con los datos a visualizar
- `metricas`: Array de métricas a mostrar en el radar (cada una es un eje)
- `etiqueta`: Campo para etiquetar cada serie
- `titulo`: Título del gráfico (opcional)
- `colorPalette`: Array de colores a utilizar (opcional)

### TablaResumenShadcn

Componente para mostrar datos tabulares con ordenación.

```tsx
<TablaResumenShadcn
  datos={datos}
  columnas={[
    { field: "nombre", header: "Nombre" },
    { field: "valor", header: "Valor" },
  ]}
  ordenablePor={["valor"]} // Opcional
  titulo="Tabla de datos" // Opcional
/>
```

**Propiedades**:
- `datos`: Array de objetos con los datos a mostrar
- `columnas`: Configuración de las columnas a mostrar
- `ordenablePor`: Array con los nombres de los campos por los que se puede ordenar
- `titulo`: Título de la tabla (opcional)

## Guía de conversión

Para convertir un dashboard existente, siga estos pasos:

1. Actualice las importaciones para usar los nuevos componentes:
   ```tsx
   // Antes
   import { GraficoBarra } from "@/components/visualizaciones/grafico-barra"
   
   // Después
   import { GraficoBarraShadcn } from "@/components/visualizaciones/grafico-barra-shadcn"
   ```

2. Defina interfaces para los tipos de datos:
   ```tsx
   interface DatoEjemplo {
     categoria: string
     valor: number
     [key: string]: any
   }
   
   const [datos, setDatos] = useState<DatoEjemplo[]>([])
   ```

3. Actualice los componentes en el JSX:
   ```tsx
   // Antes
   <GraficoBarra datos={datos} campoX="categoria" campoY="valor" />
   
   // Después
   <GraficoBarraShadcn datos={datos} campoX="categoria" campoY="valor" />
   ```

## Estructura de directorios

```
components/
├── visualizaciones/
│   ├── grafico-barra.tsx        # Componente original D3.js (deprecated)
│   ├── grafico-barra-shadcn.tsx # Nuevo componente shadcn/ui + recharts
│   ├── grafico-linea.tsx        # Componente original D3.js (deprecated)
│   ├── grafico-linea-shadcn.tsx # Nuevo componente shadcn/ui + recharts
│   └── ...
```

## Actualizaciones en package.json

Se han añadido o actualizado las siguientes dependencias:

- Añadido `recharts` para los gráficos
- Añadido `@tanstack/react-table` para la tabla de datos
- Corregidos problemas de versiones con `next` y `next-themes`

## Paleta de colores

Los componentes de visualización utilizan las variables CSS de shadcn/ui para los colores, lo que significa que se adaptan automáticamente al modo oscuro/claro.

- `--primary`: Azules
- `--destructive`: Rojos
- `--success`: Verdes
- `--accent`: Púrpuras

También se puede personalizar la paleta de colores pasando el parámetro `colorPalette` a los componentes.

## Ejemplos

Puedes ver ejemplos de uso en los siguientes dashboards:

- `app/dashboards/brechas-genero/page.tsx` - Ejemplo de gráficos de barra, dispersión y mapa de Chile
- `app/dashboards/analisis-sectorial/page.tsx` - Ejemplo de gráficos de radar y dispersión
- `app/dashboards/tendencias-sectores/page.tsx` - Ejemplo de gráficos de línea y mapa de calor
- `app/dashboards/distribucion-institucional/page.tsx` - Ejemplo completo de dashboard

---

Documentación preparada por el equipo de ProaLab, 2024. 