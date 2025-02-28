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