# Documentación del Esquema de Base de Datos Supabase

## Introducción

Este documento detalla la estructura de la base de datos utilizada en nuestro proyecto de análisis del mercado laboral y educativo. La base de datos está alojada en Supabase y contiene múltiples tablas organizadas principalmente en el esquema `empleabilidad`.

## Índice

1. [Estructura General](#estructura-general)
2. [Tablas Principales](#tablas-principales)
   - [Matrículas](#matrículas-por-año)
   - [Indicadores Laborales](#indicadores-laborales)
   - [Instituciones](#instituciones)
   - [Datos Demográficos](#datos-demográficos)
3. [Tablas de Mapeo](#tablas-de-mapeo)
4. [Organización Temporal de Datos](#organización-temporal-de-datos)
5. [Relaciones Clave](#relaciones-clave)
6. [Convenciones de Nomenclatura](#convenciones-de-nomenclatura)
7. [Especificaciones Detalladas de Tablas](#especificaciones-detalladas-de-tablas)

## Estructura General

La base de datos está organizada principalmente en el esquema `empleabilidad` y contiene:

- **Tablas de datos principales**: Contienen información sobre matrículas, indicadores laborales y demografía.
- **Tablas de mapeo**: Facilitan la relación entre diferentes nomenclaturas y categorías.
- **Tablas temporales**: Almacenan datos en proceso de limpieza o transformación.
- **Tablas de seguimiento**: Monitorean acciones o cambios en los datos.

## Tablas Principales

### Matrículas por Año

Existen tablas separadas para los años 2021, 2022, 2023 y 2024, cada una contiene información detallada sobre matrículas educativas:

#### Campos comunes entre todas las tablas de matrícula

- `id`: Identificador único
- `anio`: Año de la matrícula
- `mat_total`: Total de matriculados
- `mat_mujeres`, `mat_hombres`, `mat_nobinario`: Desglose por género
- `mat_primer_anio_total`, `mat_primer_anio_mujeres`, `mat_primer_anio_hombres`, `mat_primer_anio_nobinario`: Matriculados de primer año
- `inst_tipo`, `inst_tipo_nivel2`, `inst_tipo_nivel3`: Categorización de la institución
- `inst_codigo`, `inst_nombre`, `inst_acreditacion`: Información de la institución
- `region`, `geo_provincia`, `geo_comuna`, `sede`: Ubicación geográfica
- `carr_nombre`, `carr_generica`: Identificación de la carrera
- `area_conocimiento`, `cine_area`, `cine_subarea`: Áreas de conocimiento
- `carr_nivel_global`, `carr_clasificacion_nivel1`, `carr_clasificacion_nivel2`: Nivel educativo
- `carr_modalidad`, `carr_jornada`, `carr_tipo_plan`: Modalidad de estudio
- `carr_duracion_estudio`, `carr_duracion_total`: Duración de la carrera
- `carr_codigo`, `carr_acreditacion`: Código y estado de acreditación
- `demo_edad_*`: Distribución etaria de estudiantes
- Diversos indicadores de origen educacional y tipo de estudiante

#### Campos adicionales en `matricula_2024`

`matricula_2024` incluye estas columnas adicionales relacionadas con empleabilidad y riesgo:

- `indice_fortaleza_demanda`, `clasificacion_fortaleza`: Evaluación de demanda laboral
- `indice_riesgo_saturacion`, `clasificacion_riesgo`: Evaluación de saturación 
- `gap_90_10_primer_anio`, `gap_90_10_quinto_anio`: Brechas salariales
- `cagr_ingreso`: Tasa compuesta de crecimiento anual del ingreso
- `empleabilidad_primer_ano`, `empleabilidad_segundo_ano`: Tasas de empleabilidad
- `tendencia_empleabilidad`, `tendencia_matricula`: Análisis de tendencias
- `sectores_principales`: Sectores económicos principales para la carrera

### Indicadores Laborales

#### `informalidad`
Contiene métricas sobre la informalidad laboral por región:
- `id`: Identificador único
- `anio`: Año de los datos
- `region_codigo`: Código de la región
- `region_id`: Identificador numérico de la región
- `lab_indicador_codigo`: Código del indicador laboral
- `valor_total`, `valor_hombres`, `valor_mujeres`: Tasas de informalidad por género

#### `panel_region_sector`
Relaciona datos laborales por región y sector económico:
- `id`: Identificador único
- `anio`: Año de los datos
- `region_codigo`: Código de la región
- `region_id`: Identificador numérico de la región
- `sec_codigo`: Código del sector económico
- `lab_indicador_codigo`: Código del indicador laboral
- `trimestre_movil`: Periodo específico (formato "YYYY-VXX")
- `valor_total`, `valor_hombres`, `valor_mujeres`: Valores del indicador por género

### Instituciones

#### `instituciones`
Contiene el catálogo de instituciones educativas:
- `id`: Identificador único
- `codigo`: Código único de la institución
- `nombre`: Nombre completo de la institución
- `tipo`: Clasificación de la institución (ej. "Universidades")
- `acreditacion`: Estado y duración de acreditación

### Datos Demográficos

#### `poblacion`
Contiene proyecciones demográficas:
- `id`: Identificador único
- `anio`: Año base
- `anio_proyeccion`: Referencia del año de proyección
- `dem_sexo_codigo`: Código para identificar el género
- `edad`: Edad específica
- `region`: Nombre de la región
- `region_id`: Identificador numérico de la región
- `valor`: Cantidad de población

## Tablas de Mapeo

#### `mapeo_carr_generica`
Mapea nombres específicos de carreras a categorías genéricas:
- `carr_nombre`: Nombre específico de la carrera
- `carr_generica_unificada`: Categoría genérica asignada
- `origen`: Fuente de los datos o tabla de origen

#### `mapeo_sin_duplicados`
Versión limpia del mapeo anterior sin entradas duplicadas:
- `carr_nombre`: Nombre específico de la carrera
- `carr_generica_unificada`: Categoría genérica unificada

#### `pares_con_origen`
Relaciona nombres de carreras con su categoría genérica y origen:
- `tabla_origen`: Tabla de donde provienen los datos 
- `carr_nombre`: Nombre específico de la carrera
- `carr_generica`: Categoría genérica

#### `pares_unicos`
Relación única entre nombres de carreras y categorías genéricas:
- `carr_nombre`: Nombre específico de la carrera
- `carr_generica`: Categoría genérica

#### `mapeo_temp`
Tabla temporal para procesamiento de mapeos:
- `carr_nombre`: Nombre específico de la carrera
- `carr_generica_unificada`: Categoría genérica asignada
- `tabla_origen`: Origen de los datos

## Organización Temporal de Datos

Los datos están organizados principalmente por año en distintas tablas:

1. **Tablas de matrícula anuales**: Separadas por año (`matricula_2021`, `matricula_2022`, etc.)
2. **Indicadores laborales**: Incluyen el campo `anio` y en algunos casos `trimestre_movil`
3. **Proyecciones de población**: Incluyen `anio` (año base) y `anio_proyeccion`

Esta estructura permite:
- Analizar tendencias temporales
- Comparar indicadores entre años
- Mantener la integridad histórica de los datos
- Adaptarse a cambios en la estructura de datos entre años

## Relaciones Clave

Las principales relaciones entre tablas son:

1. **Región como punto de unión**:
   - `region_id` y `region_codigo` están presentes en múltiples tablas:
     - `informalidad ⟷ panel_region_sector ⟷ poblacion`
     - `matricula_20XX ⟷ informalidad` (a través de region_id)

2. **Carreras y su clasificación**:
   - Las tablas de mapeo permiten relacionar nombres específicos con categorías genéricas:
     - `mapeo_carr_generica ⟷ matricula_20XX` (a través de carr_nombre y carr_generica)
     - `pares_unicos`, `pares_con_origen ⟷ matricula_20XX` (mapeos de carreras)

3. **Instituciones educativas**:
   - El campo `inst_codigo` vincula las tablas de matrícula con la tabla `instituciones`:
     - `instituciones ⟷ matricula_20XX` (a través de inst_codigo)

4. **Temporalidad**:
   - El campo `anio` permite relacionar datos de diferentes tablas del mismo periodo

## Convenciones de Nomenclatura

Las tablas y columnas siguen estas convenciones:

1. **Prefijos en columnas**:
   - `carr_`: Relacionado con carreras
   - `inst_`: Relacionado con instituciones
   - `mat_`: Relacionado con matrículas
   - `demo_`: Relacionado con demografía
   - `geo_`: Relacionado con ubicación geográfica
   - `lab_`: Relacionado con indicadores laborales
   - `sec_`: Relacionado con sectores económicos

2. **Sufijos en nombres de tablas**:
   - `_XXXX` (donde XXXX es un año): Indica datos específicos de ese año
   - `_temp`: Tablas temporales para procesamiento
   - `_sin_duplicados`: Versiones limpias de otras tablas

## Especificaciones Detalladas de Tablas

### Tabla `log_categorias_faltantes`
Registra categorías que requieren atención o corrección:
- `carr_generica`: Categoría genérica que presenta problemas 
- `accion_recomendada`: Acción sugerida para resolver el problema
- `accion_tomada`: Acción efectivamente implementada
- `estado`: Estado actual del problema
- `fecha_deteccion`: Cuándo se detectó el problema

### Matrículas: Evolución a lo largo de los años

La comparación entre las tablas de matrícula de diferentes años muestra la evolución del sistema para incorporar nuevos indicadores:

- **2021-2023**: Estructura básica con datos académicos y demográficos
- **2024**: Incorpora indicadores de empleabilidad y riesgo:
  - Índice de fortaleza de demanda laboral
  - Clasificación de riesgo de saturación
  - Brechas salariales
  - Empleabilidad en los primeros dos años
  - Tendencias de empleabilidad y matrícula
  - Sectores económicos principales

Esta evolución refleja un enfoque cada vez más orientado al análisis del mercado laboral y su relación con la formación académica.

### Relación entre tablas de mapeo

Las diferentes tablas de mapeo sirven para propósitos específicos:
- `mapeo_carr_generica`: Mapeo principal que incluye información de origen
- `mapeo_sin_duplicados`: Versión depurada para consultas más eficientes
- `pares_con_origen`: Formato alternativo que conserva la proveniencia
- `pares_unicos`: Versión simplificada para análisis básicos
- `mapeo_temp`: Utilizada durante procesos de transformación de datos

Esta documentación proporciona una visión general del esquema de la base de datos. Para consultas específicas, se recomienda utilizar los scripts disponibles, como `get-schema-info.js` y `list-empleabilidad-tables.js` para obtener detalles actualizados de cada tabla. 