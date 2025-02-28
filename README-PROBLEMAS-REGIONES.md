# Problemas y Soluciones: Integración de Regiones en los Dashboards

Este documento describe los problemas identificados con el manejo de regiones en los dashboards y propone soluciones.

## Problema Identificado

En todos los dashboards que utilizan regiones como filtro, se ha identificado el siguiente problema:

1. Las regiones están **hardcodeadas** directamente en cada componente `page.tsx` como un array estático:

```typescript
const regiones = [
  { value: "", label: "Todas" },
  { value: "Metropolitana", label: "Metropolitana" },
  { value: "Valparaíso", label: "Valparaíso" },
  { value: "Biobío", label: "Biobío" },
  // Añadir el resto de regiones...
]
```

2. La lista está incompleta, mostrando solo 3 regiones y el comentario "Añadir el resto de regiones..."

3. Al mismo tiempo, existe una tabla `regiones` en Supabase que contiene los datos completos:

```
| id | codigo | nombre | geo_region_codigo | geo_region_nombre | created_at |
|----|--------|--------|------------------|-------------------|------------|
| 1  | CHL01  | Tarapaca | | | 2025-02-25T04:35:31.558985+00:00 |
...
```

## Impacto

Este problema causa:

1. **Inconsistencia**: Las regiones mostradas en los filtros no coinciden con todas las regiones disponibles en la base de datos.
2. **Experiencia incompleta**: Los usuarios no pueden filtrar por todas las regiones de Chile.
3. **Mantenimiento difícil**: Si cambia algo en las regiones, habría que actualizar manualmente cada archivo.

## Dashboards Afectados

Este problema afecta a los siguientes dashboards:

1. **Distribución Institucional**: `app/dashboards/distribucion-institucional/page.tsx`
2. **Brechas de Género**: `app/dashboards/brechas-genero/page.tsx`
3. **Análisis Sectorial**: `app/dashboards/analisis-sectorial/page.tsx`
4. **Tendencias Sectores**: `app/dashboards/tendencias-sectores/page.tsx`
5. **Explorador de Carreras**: `app/dashboards/explorador-carreras/page.tsx`
6. **Tendencias Ocupacionales**: `app/dashboards/tendencias-ocupacionales/page.tsx`

## Solución Propuesta

Hay dos opciones para resolver este problema:

### Opción 1: Cargar dinámicamente las regiones desde Supabase

1. Crear un endpoint API para obtener todas las regiones:

```typescript
// app/api/regiones/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  const supabase = supabaseAdmin()
  
  try {
    const { data, error } = await supabase
      .from('regiones')
      .select('id, codigo, nombre')
      .order('id', { ascending: true })
    
    if (error) {
      throw error
    }
    
    const regiones = [
      { value: "", label: "Todas" },
      ...data.map(region => ({
        value: region.nombre,
        label: region.nombre
      }))
    ]
    
    return NextResponse.json({ regiones })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

2. Modificar cada dashboard para cargar las regiones desde el endpoint:

```typescript
const [regiones, setRegiones] = useState([
  { value: "", label: "Todas" }
])

useEffect(() => {
  async function fetchRegiones() {
    try {
      const response = await fetch('/api/regiones')
      const data = await response.json()
      if (data.regiones) {
        setRegiones(data.regiones)
      }
    } catch (err) {
      console.error("Error al cargar regiones:", err)
    }
  }
  
  fetchRegiones()
}, [])
```

### Opción 2: Crear un archivo compartido de constantes

Si no se desea hacer llamadas API adicionales:

1. Crear un archivo de constantes con todas las regiones:

```typescript
// lib/constants.ts
export const REGIONES = [
  { value: "", label: "Todas" },
  { value: "Tarapaca", label: "Tarapacá" },
  { value: "Antofagasta", label: "Antofagasta" },
  { value: "Atacama", label: "Atacama" },
  { value: "Coquimbo", label: "Coquimbo" },
  { value: "Valparaiso", label: "Valparaíso" },
  { value: "O'Higgins", label: "O'Higgins" },
  { value: "Maule", label: "Maule" },
  { value: "Biobio", label: "Biobío" },
  { value: "La Araucania", label: "La Araucanía" },
  { value: "Los Lagos", label: "Los Lagos" },
  { value: "Aysen", label: "Aysén" },
  { value: "Magallanes", label: "Magallanes" },
  { value: "Metropolitana", label: "Metropolitana" },
  { value: "Los Rios", label: "Los Ríos" },
  { value: "Arica y Parinacota", label: "Arica y Parinacota" },
  { value: "Nuble", label: "Ñuble" }
]
```

2. Importar y usar estas constantes en cada dashboard:

```typescript
import { REGIONES } from "@/lib/constants"

// ...

// Usar directamente REGIONES en el componente Select
<Select value={filtros.region} onValueChange={(value) => handleFilterChange("region", value)}>
  <SelectTrigger>
    <SelectValue placeholder="Seleccionar región" />
  </SelectTrigger>
  <SelectContent>
    {REGIONES.map((region) => (
      <SelectItem key={region.value} value={region.value}>
        {region.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

## Recomendación

La **Opción 1** es más robusta a largo plazo, ya que:

1. Garantiza coherencia con los datos reales en la base de datos
2. Si cambian las regiones en la base de datos, la UI se actualizará automáticamente
3. Sigue un patrón de diseño más mantenible y escalable

Si la prioridad es implementar rápidamente una solución, la **Opción 2** es más sencilla pero menos flexible. 