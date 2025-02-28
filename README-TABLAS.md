# Estructura de Tablas para ProALab en Supabase

Este documento detalla las tablas existentes y las que necesitan ser creadas en Supabase para el correcto funcionamiento de los dashboards de ProALab.

## Resumen de Estado Actual

### Tablas Existentes
- ✅ `dashboard_distribucion_institucional`
- ✅ `instituciones`
- ✅ `regiones`

### Tablas por Crear
- ❌ `dashboard_brechas_genero`
- ❌ `dashboard_analisis_sectorial`
- ❌ `dashboard_sectores_tendencias`
- ❌ `dashboard_explorador_carreras`
- ❌ `dashboard_analisis_area`
- ❌ `dashboard_tendencias_ocupacionales`
- ❌ `market_trends`
- ❌ `skills_demand`
- ❌ `areas`
- ❌ `carreras`
- ❌ `sectores`

## Tablas Existentes

### `dashboard_distribucion_institucional`

**Propósito**: Datos para el dashboard de distribución institucional.

**Estructura**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| tipo | texto | Tipo de institución (Universidades, Centros de Formación Técnica, Institutos Profesionales) |
| acreditacion | texto | Nivel de acreditación (3 años, 4 años, 5 años, etc.) |
| region | texto | Región geográfica |
| num_instituciones | número | Cantidad de instituciones |
| num_carreras | número | Cantidad de carreras |
| matricula_total | número | Total de matriculados |

**Registros**: 46 entradas.

**Relaciones**:
- Debería tener relación con la tabla `regiones` pero actualmente usa valores de texto en lugar de IDs.

---

### `instituciones`

**Propósito**: Almacena información detallada sobre las instituciones educativas.

**Estructura**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único |
| codigo | número | Código de la institución |
| nombre | texto | Nombre completo de la institución |
| tipo | texto | Tipo de institución |
| acreditacion | texto | Nivel de acreditación |
| region_id | número | ID de referencia a la tabla regiones (no siempre establecido) |
| region | texto | Nombre de la región (redundante) |
| created_at | timestamp | Fecha de creación |

**Registros**: 135 entradas.

**Relaciones**:
- Tiene un campo `region_id` que podría relacionarse con `regiones.id`, pero no siempre está establecido.

---

### `regiones`

**Propósito**: Información sobre las regiones de Chile.

**Estructura**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único |
| codigo | texto | Código de la región (formato: "CHL01") |
| nombre | texto | Nombre de la región |
| geo_region_codigo | texto | Código geográfico (no siempre establecido) |
| geo_region_nombre | texto | Nombre geográfico (no siempre establecido) |
| created_at | timestamp | Fecha de creación |

**Registros**: 17 entradas (las 16 regiones de Chile + 1).

**Relaciones**:
- Referencias desde `instituciones.region_id` (aunque no usada consistentemente).

## Tablas por Crear

### `dashboard_brechas_genero`

**Propósito**: Datos para el dashboard de brechas de género.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| area | texto | Área de conocimiento |
| region | texto | Región geográfica |
| region_id | número | ID de referencia a la tabla regiones (FK) |
| pct_mujeres | número | Porcentaje de mujeres en el área |
| pct_hombres | número | Porcentaje de hombres en el área |
| brecha_desocupacion | número | Diferencia en tasas de desocupación (puntos porcentuales) |
| brecha_informalidad | número | Diferencia en tasas de informalidad laboral (puntos porcentuales) |
| created_at | timestamp | Fecha de creación |

---

### `dashboard_analisis_sectorial`

**Propósito**: Datos para el dashboard de análisis sectorial.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| sector | texto | Sector económico |
| sector_id | número | ID de referencia a la tabla sectores (FK) |
| region | texto | Región geográfica |
| region_id | número | ID de referencia a la tabla regiones (FK) |
| tasa_desocupacion | número | Tasa de desocupación en el sector |
| variabilidad | número | Índice de variabilidad del empleo |
| fuerza_trabajo | número | Cantidad de personas en la fuerza laboral |
| informalidad | número | Porcentaje de informalidad laboral |
| crecimiento | número | Tasa de crecimiento del sector |
| empleabilidad | número | Índice de empleabilidad |
| created_at | timestamp | Fecha de creación |

---

### `dashboard_sectores_tendencias`

**Propósito**: Datos históricos para el dashboard de tendencias sectoriales.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| sector | texto | Sector económico |
| sector_id | número | ID de referencia a la tabla sectores (FK) |
| region | texto | Región geográfica |
| region_id | número | ID de referencia a la tabla regiones (FK) |
| tmp_fecha | fecha | Fecha de medición |
| valor | número | Valor del indicador (ej: empleo) |
| crecimiento | número | Tasa de crecimiento respecto al período anterior |
| tendencia | número | Indicador de tendencia futura |
| demanda | número | Nivel de demanda laboral |
| created_at | timestamp | Fecha de creación |

---

### `dashboard_explorador_carreras`

**Propósito**: Datos para el explorador de carreras.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| carrera | texto | Nombre del programa educativo |
| carrera_id | número | ID de referencia a la tabla carreras (FK) |
| area | texto | Área de conocimiento |
| area_id | número | ID de referencia a la tabla areas (FK) |
| institucion | texto | Nombre de la institución |
| institucion_id | número | ID de referencia a la tabla instituciones (FK) |
| tipo_inst | texto | Tipo de institución |
| region | texto | Región geográfica |
| region_id | número | ID de referencia a la tabla regiones (FK) |
| mat_total | número | Matrícula total |
| mat_mujeres | número | Matrícula de mujeres |
| mat_hombres | número | Matrícula de hombres |
| edad_prom | número | Edad promedio de estudiantes |
| duracion | número | Duración teórica (semestres) |
| arancel | número | Arancel anual |
| empleabilidad | número | Tasa de empleabilidad al primer año |
| ingreso_prom | número | Ingreso promedio al 4° año |
| created_at | timestamp | Fecha de creación |

---

### `dashboard_analisis_area`

**Propósito**: Datos para el dashboard de análisis por área.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| area_conocimiento | texto | Área de conocimiento |
| area_id | número | ID de referencia a la tabla areas (FK) |
| num_instituciones | número | Cantidad de instituciones |
| num_programas | número | Cantidad de programas educativos |
| matricula_total | número | Total de estudiantes matriculados |
| pct_mujeres | número | Porcentaje de mujeres |
| pct_hombres | número | Porcentaje de hombres |
| empleabilidad | número | Tasa de empleabilidad promedio |
| ingreso_promedio | número | Ingreso promedio al 4° año |
| duracion_real | número | Duración real promedio (semestres) |
| arancel_promedio | número | Arancel promedio anual |
| created_at | timestamp | Fecha de creación |

---

### `dashboard_tendencias_ocupacionales`

**Propósito**: Datos históricos para el dashboard de tendencias ocupacionales.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| ocupacion | texto | Categoría ocupacional |
| region | texto | Región geográfica |
| region_id | número | ID de referencia a la tabla regiones (FK) |
| tmp_fecha | fecha | Fecha de medición |
| valor | número | Valor del indicador |
| crecimiento | número | Tasa de crecimiento |
| salario_promedio | número | Salario promedio |
| demanda | número | Nivel de demanda laboral |
| vacantes | número | Número de vacantes disponibles |
| created_at | timestamp | Fecha de creación |

---

### `market_trends`

**Propósito**: Tendencias generales del mercado laboral para el dashboard de mercado laboral.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| trend_data | json | Datos de tendencias en formato JSON |
| created_at | timestamp | Fecha de creación |

---

### `skills_demand`

**Propósito**: Habilidades demandadas para el dashboard de mercado laboral.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| skill_name | texto | Nombre de la habilidad |
| demand_score | número | Puntuación de demanda |
| sector | texto | Sector relacionado |
| sector_id | número | ID de referencia a la tabla sectores (FK) |
| created_at | timestamp | Fecha de creación |

---

### `areas`

**Propósito**: Catálogo de áreas de conocimiento.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| codigo | texto | Código del área |
| nombre | texto | Nombre del área de conocimiento |
| descripcion | texto | Descripción detallada |
| created_at | timestamp | Fecha de creación |

---

### `carreras`

**Propósito**: Catálogo de carreras/programas educativos.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| codigo | texto | Código de la carrera |
| nombre | texto | Nombre de la carrera |
| area_id | número | ID de referencia a la tabla areas (FK) |
| nivel | texto | Nivel educativo (pregrado, postgrado, etc.) |
| descripcion | texto | Descripción detallada |
| created_at | timestamp | Fecha de creación |

---

### `sectores`

**Propósito**: Catálogo de sectores económicos.

**Estructura Propuesta**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | número | Identificador único (PK) |
| codigo | texto | Código del sector |
| nombre | texto | Nombre del sector económico |
| descripcion | texto | Descripción detallada |
| created_at | timestamp | Fecha de creación |

## Recomendaciones de Implementación

1. **Priorizar relaciones con IDs**: En lugar de almacenar textos redundantes como "Metropolitana", usar IDs de referencia (region_id) y establecer relaciones.

2. **Orden de creación sugerido**:
   - Primero: Tablas de catálogo (`areas`, `sectores`, `carreras`)
   - Segundo: Tablas de dashboards (`dashboard_explorador_carreras`, etc.)

3. **Migraciones**: Usar el sistema de migraciones de Supabase para mantener un historial de cambios en la estructura de la base de datos.

4. **Índices**: Crear índices apropiados para mejorar rendimiento en las consultas frecuentes.

5. **Validación**: Implementar validación a nivel de base de datos (constraints) para garantizar la integridad de los datos. 