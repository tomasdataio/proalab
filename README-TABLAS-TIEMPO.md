# Tablas Sectoriales con Información Temporal en Supabase

Este documento detalla las tablas existentes en Supabase que contienen información sectorial y temporal para los dashboards de ProALab, incluyendo sus estructuras, rangos de tiempo, e información estadística relevante.

## Resumen de Tablas Analizadas

| Tabla | Filas | Período de Tiempo | Enfoque |
|-------|-------|-------------------|---------|
| `tasa_desocupacion` | 952 | 2020-2024 (trimestral) | Tasa de desocupación por región y género |
| `poblacion` | 112,104 | 2024 (proyección) | Datos demográficos detallados por comuna, provincia y región |
| `panel_region_sector` | 21,008 | 2020-2024 (trimestral) | Indicadores laborales por región y sector económico |
| `informalidad` | 952 | 2020-2024 (trimestral) | Tasa de informalidad laboral por región y género |
| `fuerza_trabajo` | 952 | 2020-2024 (trimestral) | Datos de fuerza laboral por región y género |
| `tendencias_trimestrales` | 576 | 2020-2024 (mensual) | Tendencias ocupacionales con periodicidad mensual |

## Detalle de las Tablas

### `tasa_desocupacion`

**Descripción**: Esta tabla contiene información sobre la tasa de desocupación por región, desagregada por género y trimestre.

**Estructura**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único |
| anio | número | Año de la medición (2020-2024) |
| trimestre | texto | Trimestre (valores no disponibles en la muestra) |
| region_id | número | ID de la región |
| region_codigo | texto | Código de la región |
| geo_region_codigo | texto | Código geográfico de la región |
| lab_indicador_codigo | texto | Código del indicador laboral |
| tmp_trimestre_codigo | texto | Código del trimestre (formato: YYYY-V0X) |
| lab_region_codigo | texto | Código laboral de la región |
| lab_region_nombre | texto | Nombre de la región |
| lab_sexo_codigo | texto | Código de género |
| lab_sexo_nombre | texto | Nombre de género (Hombres, Mujeres) |
| valor_total | número | Valor de la tasa de desocupación total |
| valor_hombres | número | Valor de la tasa de desocupación para hombres |
| valor_mujeres | número | Valor de la tasa de desocupación para mujeres |
| created_at | timestamp | Fecha de creación del registro |

**Cobertura Temporal**:
- **Período**: 2020 - 2024
- **Granularidad**: Trimestral
- **Formato de trimestres**: Códigos como "2020-V01" hasta "2024-V04"

**Cantidad de Datos**: 952 registros

**Observaciones**:
- Los datos cubren todas las regiones de Chile
- La información está desagregada por género (hombres y mujeres)
- El formato de trimestre usa un código especial (V01-V04 para representar los 4 trimestres)

---

### `poblacion`

**Descripción**: Contiene datos demográficos detallados, con estimaciones de población por comuna, provincia, región, género y edad.

**Estructura**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único |
| anio | número | Año de la proyección (2024) |
| region_id | número | ID de la región |
| provincia_codigo | texto | Código de la provincia |
| provincia_nombre | texto | Nombre de la provincia |
| comuna_codigo | texto | Código de la comuna |
| comuna_nombre | texto | Nombre de la comuna |
| sexo_codigo | texto | Código de género |
| edad | número | Edad (posiblemente en rangos o específica) |
| valor | número | Valor estimado de población |
| anio_proyeccion | texto | Año de proyección |
| geo_region_codigo | texto | Código geográfico de la región |
| geo_region_nombre | texto | Nombre geográfico de la región |
| lab_pob_provincia_codigo | texto | Código laboral de la provincia |
| lab_pob_provincia_nombre | texto | Nombre laboral de la provincia |
| lab_pob_comuna_codigo | texto | Código laboral de la comuna |
| lab_pob_comuna_nombre | texto | Nombre laboral de la comuna |
| dem_sexo_codigo | texto | Código demográfico de género |
| lab_pob_edad | texto | Código laboral para edad |
| lab_valor | número | Valor laboral (posiblemente redundante) |
| lab_pob_anio_proyeccion | texto | Código del año de proyección ("pob_proyeccion_2024") |
| created_at | timestamp | Fecha de creación del registro |

**Cobertura Temporal**:
- **Período**: 2024 (proyección)
- **Granularidad**: Anual (proyección única para 2024)

**Cantidad de Datos**: 112,104 registros

**Observaciones**:
- Esta tabla contiene la mayor cantidad de registros entre todas las analizadas
- Los datos están muy desagregados: por comuna, provincia, región, sexo y edad
- Todos los datos corresponden a proyecciones demográficas para el año 2024
- No hay datos históricos, solo proyecciones para un año específico

---

### `panel_region_sector`

**Descripción**: Panel de datos que combina información laboral por región y sector económico, desagregada por trimestre y género.

**Estructura**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único |
| anio | número | Año de la medición (2020-2024) |
| trimestre | texto | Trimestre (valores no disponibles en la muestra) |
| region_id | número | ID de la región |
| sector_id | número | ID del sector económico |
| region_codigo | texto | Código de la región |
| sector_codigo | texto | Código del sector económico |
| geo_region_codigo | texto | Código geográfico de la región |
| sec_codigo | texto | Código secundario del sector |
| lab_indicador_codigo | texto | Código del indicador laboral |
| lab_indicador_nombre | texto | Nombre del indicador laboral |
| lab_codigo_bandera | texto | Código de bandera (posiblemente para indicar calidad del dato) |
| lab_descripcion_bandera | texto | Descripción de la bandera |
| tmp_trimestre_codigo | texto | Código del trimestre (formato: YYYY-V0X) |
| tmp_trimestre_nombre | texto | Nombre del trimestre |
| dem_sexo_codigo | texto | Código demográfico de género |
| dem_sexo_nombre | texto | Nombre del género |
| edu_nivel_codigo | texto | Código del nivel educativo |
| valor_total | número | Valor total del indicador |
| valor_hombres | número | Valor del indicador para hombres |
| valor_mujeres | número | Valor del indicador para mujeres |
| valor | número | Valor general (posiblemente redundante) |
| created_at | timestamp | Fecha de creación del registro |

**Cobertura Temporal**:
- **Período**: 2020 - 2024
- **Granularidad**: Trimestral
- **Formato de trimestres**: Códigos como "2020-V01" hasta "2024-V04"

**Cantidad de Datos**: 21,008 registros

**Observaciones**:
- Esta tabla es muy completa, combinando dimensiones de región, sector económico, tiempo y género
- Es la segunda tabla con mayor volumen de datos
- Incluye información sobre indicadores laborales específicos por sector económico
- Los datos también están desagregados por nivel educativo

---

### `informalidad`

**Descripción**: Contiene datos sobre tasas de informalidad laboral por región y trimestre, desagregados por género.

**Estructura**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único |
| anio | número | Año de la medición (2020-2024) |
| trimestre | texto | Trimestre (valores no disponibles en la muestra) |
| region_id | número | ID de la región |
| region_codigo | texto | Código de la región |
| geo_region_codigo | texto | Código geográfico de la región |
| lab_indicador_codigo | texto | Código del indicador laboral |
| lab_trimestre_codigo | texto | Código del trimestre (formato: YYYY-V0X) |
| lab_region_codigo | texto | Código laboral de la región |
| lab_bandera_estandarizada | texto | Bandera estandarizada (posiblemente para calidad del dato) |
| lab_sexo_codigo | texto | Código de género |
| lab_sexo_nombre | texto | Nombre del género |
| valor_total | número | Valor total de informalidad |
| valor_hombres | número | Valor de informalidad para hombres |
| valor_mujeres | número | Valor de informalidad para mujeres |
| created_at | timestamp | Fecha de creación del registro |

**Cobertura Temporal**:
- **Período**: 2020 - 2024
- **Granularidad**: Trimestral
- **Formato de trimestres**: Códigos como "2020-V01" hasta "2024-V04"

**Cantidad de Datos**: 952 registros

**Observaciones**:
- Estructura similar a la tabla `tasa_desocupacion`
- Contiene información específica sobre informalidad laboral
- Los datos están desagregados por género y región
- La cobertura temporal coincide con las demás tablas trimestrales (2020-2024)

---

### `fuerza_trabajo`

**Descripción**: Esta tabla contiene datos sobre la fuerza laboral por región y trimestre, desagregados por género.

**Estructura**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único |
| anio | número | Año de la medición (2020-2024) |
| trimestre | texto | Trimestre (valores no disponibles en la muestra) |
| region_id | número | ID de la región |
| region_codigo | texto | Código de la región |
| geo_region_codigo | texto | Código geográfico de la región |
| lab_indicador_codigo | texto | Código del indicador laboral |
| lab_trimestre_codigo | texto | Código del trimestre (formato: YYYY-V0X) |
| lab_region_codigo | texto | Código laboral de la región |
| lab_region_nombre | texto | Nombre de la región |
| lab_sexo_codigo | texto | Código de género |
| lab_sexo_nombre | texto | Nombre del género |
| valor_total | número | Valor total de la fuerza laboral |
| valor_hombres | número | Valor de la fuerza laboral para hombres |
| valor_mujeres | número | Valor de la fuerza laboral para mujeres |
| created_at | timestamp | Fecha de creación del registro |

**Cobertura Temporal**:
- **Período**: 2020 - 2024
- **Granularidad**: Trimestral
- **Formato de trimestres**: Códigos como "2020-V01" hasta "2024-V04"

**Cantidad de Datos**: 952 registros

**Observaciones**:
- Estructura muy similar a las tablas `tasa_desocupacion` e `informalidad`
- Contiene información específica sobre la fuerza laboral (personas económicamente activas)
- Los datos están desagregados por género y región
- Misma cobertura temporal que las otras tablas trimestrales

---

### `tendencias_trimestrales`

**Descripción**: Esta tabla contiene datos de tendencias ocupacionales con periodicidad mensual, aunque su nombre indique "trimestrales".

**Estructura**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único |
| fecha | texto | Fecha (no disponible en la muestra) |
| anio | texto | Año (no disponible en la muestra) |
| mes | texto | Mes (no disponible en la muestra) |
| region_id | número | ID de la región |
| tmp_fecha | fecha | Fecha temporal (formato: YYYY-MM-DD) |
| tmp_anio | número | Año temporal (2020-2024) |
| tmp_mes | número | Mes temporal (1-12) |
| tmp_periodo | texto | Período temporal (formato: YYYY-MM) |
| ocupacion | texto | Categoría ocupacional |
| region_codigo | texto | Código de la región |
| region | texto | Nombre de la región |
| year | número | Año (posiblemente redundante) |
| valor | número | Valor del indicador |
| tipo | texto | Tipo de tendencia o medición |
| created_at | timestamp | Fecha de creación del registro |

**Cobertura Temporal**:
- **Período**: 2020-01-01 a 2024-10-01
- **Granularidad**: Mensual
- **Formato de fechas**: Fechas completas (YYYY-MM-DD) y períodos mensuales (YYYY-MM)

**Cantidad de Datos**: 576 registros

**Observaciones**:
- A pesar de su nombre "trimestrales", los datos tienen granularidad mensual
- Esta tabla tiene una estructura diferente a las anteriores, con campos de fecha más detallados
- Incluye datos hasta octubre de 2024 (proyecciones)
- Contiene información por tipo de ocupación y región

## Relaciones entre Tablas

Las tablas comparten varias claves comunes que permiten relacionarlas entre sí:

- `region_id`: Presente en todas las tablas, permite vincular con la tabla `regiones`.
- `anio` y códigos de trimestre: Permiten vincular datos temporalmente entre las distintas tablas.
- `sector_id`: En `panel_region_sector`, permitiría vincular con una tabla de sectores económicos.

## Recomendaciones de Uso

1. **Para análisis temporales**: Las tablas `tasa_desocupacion`, `panel_region_sector`, `informalidad` y `fuerza_trabajo` ofrecen una serie temporal consistente desde 2020 hasta 2024 con granularidad trimestral.

2. **Para análisis sectoriales**: La tabla `panel_region_sector` es la más completa para análisis por sector económico, ya que combina dimensiones de región, sector, tiempo y género.

3. **Para análisis demográficos**: La tabla `poblacion` ofrece el mayor nivel de desagregación geográfica (comuna, provincia, región) y demográfica (edad, género).

4. **Para tendencias recientes**: La tabla `tendencias_trimestrales` ofrece datos con granularidad mensual hasta octubre de 2024.

5. **Para comparativas de género**: Todas las tablas excepto `tendencias_trimestrales` ofrecen desagregación por género, con valores específicos para hombres y mujeres.

## Observaciones Generales

- La mayoría de las tablas comparten una estructura similar, con campos para región, tiempo, indicador y desagregación por género.
- Hay cierta redundancia en los campos, con múltiples códigos para la misma entidad (ej. varios códigos de región).
- Las tablas trimestrales abarcan el mismo período (2020-2024) y tienen estructuras similares, lo que facilita su integración.
- La tabla `poblacion` es atípica, con un gran volumen de datos pero limitada a proyecciones para un solo año (2024).
- La tabla `tendencias_trimestrales` es la única con granularidad mensual, a pesar de su nombre. 