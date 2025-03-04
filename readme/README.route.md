# Guía Completa sobre Route Handlers en Next.js

## Introducción

Los Route Handlers son una característica potente del App Router en Next.js que permite crear API endpoints dentro de tu aplicación. Esta guía detalla cómo implementar, configurar y optimizar los Route Handlers para tu proyecto de análisis del mercado laboral y educativo con Supabase.

## Índice

1. [Fundamentos de Route Handlers](#fundamentos-de-route-handlers)
2. [Convenciones y Estructura](#convenciones-y-estructura)
3. [Métodos HTTP Soportados](#métodos-http-soportados)
4. [Respuestas y Request](#respuestas-y-request)
5. [Integración con Supabase](#integración-con-supabase)
6. [Seguridad y Control de Acceso](#seguridad-y-control-de-acceso)
7. [Casos de Uso para Análisis de Datos](#casos-de-uso-para-análisis-de-datos)
8. [Optimización y Mejores Prácticas](#optimización-y-mejores-prácticas)
9. [Ejemplos Prácticos](#ejemplos-prácticos)

## Fundamentos de Route Handlers

Los Route Handlers permiten crear endpoints de API usando la [API de Respuesta Web](https://developer.mozilla.org/en-US/docs/Web/API/Response) en Next.js. Se pueden definir dentro del directorio `app` en archivos especiales llamados `route.js` o `route.ts`.

```typescript
// app/api/empleabilidad/route.ts
export async function GET() {
  return Response.json({ message: 'Datos de empleabilidad disponibles' })
}
```

Los Route Handlers son exclusivos del App Router y sustituyen a las API Routes utilizadas en el sistema Pages Router de versiones anteriores de Next.js.

## Convenciones y Estructura

### Ubicación de los archivos

Los Route Handlers deben definirse en un archivo especial llamado `route.js` o `route.ts` dentro del directorio `app`:

```
app/
├── api/
│   ├── empleabilidad/
│   │   └── route.ts      # Accesible en /api/empleabilidad
│   ├── instituciones/
│   │   └── route.ts      # Accesible en /api/instituciones
│   └── tendencias/
│       └── [region]/
│           └── route.ts  # Accesible en /api/tendencias/{region}
└── ...
```

### Anidamiento y colisión

- **Importante**: No puedes tener un archivo `route.js` y un archivo `page.js` en el mismo segmento de ruta, ya que esto causaría un conflicto en la misma URL.
- Sí puedes tener rutas anidadas, como `app/api/empleabilidad/ruta` y `app/api/empleabilidad/region/ruta`.

## Métodos HTTP Soportados

Los Route Handlers soportan todos los métodos HTTP de la API Request:

```typescript
export async function GET(request: Request) { ... }
export async function POST(request: Request) { ... }
export async function PUT(request: Request) { ... }
export async function DELETE(request: Request) { ... }
export async function PATCH(request: Request) { ... }
export async function HEAD(request: Request) { ... }
export async function OPTIONS(request: Request) { ... }
```

También puedes crear un manejador personalizado que gestione todos los métodos:

```typescript
// app/api/empleabilidad/route.ts
export async function GET(request: Request) {
  return Response.json({ data: 'Datos de empleabilidad' })
}

// Manejador para otros métodos no implementados
export async function POST(request: Request) {
  return new Response('Método no permitido', { status: 405 })
}
```

## Respuestas y Request

### Objetos de Respuesta

Los Route Handlers utilizan la API de Respuesta Web, permitiendo varios tipos de respuestas:

```typescript
// Respuesta JSON
export async function GET() {
  return Response.json({ data: 'Ejemplo' })
}

// Respuesta de texto
export async function GET() {
  return new Response('Texto plano')
}

// Redirección
export async function GET() {
  return Response.redirect(new URL('https://nextjs.org'))
}
```

### Extracción de datos de la petición

Puedes extraer datos de la petición de varias formas:

```typescript
// Usando searchParams
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  return Response.json({ id })
}

// Extrayendo el cuerpo JSON
export async function POST(request: Request) {
  const data = await request.json()
  return Response.json({ recibido: data })
}

// Procesando FormData
export async function POST(request: Request) {
  const formData = await request.formData()
  const nombre = formData.get('nombre')
  return Response.json({ nombre })
}
```

### Cookies y Headers

Los Route Handlers permiten acceder y manipular cookies y headers:

```typescript
// Leer cookies
export async function GET(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  return Response.json({ token: token?.value })
}

// Establecer cookies
export async function GET(request: Request) {
  const response = Response.json({ success: true })
  cookies().set('usuario', 'admin')
  return response
}

// Headers
export async function GET(request: Request) {
  const headersList = headers()
  const referer = headersList.get('referer')
  return Response.json({ referer })
}
```

## Integración con Supabase

### Consultas a Supabase desde Route Handlers

Los Route Handlers son ideales para crear endpoints que obtengan datos de Supabase:

```typescript
// app/api/empleabilidad/datos/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Inicializar el cliente de Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  
  // Extraer parámetros
  const { searchParams } = new URL(request.url)
  const anio = searchParams.get('anio') || '2024'
  const region = searchParams.get('region') || 'NACIONAL'
  
  // Consultar datos de empleabilidad
  const { data, error } = await supabase
    .from('panel_region_sector')
    .select('*')
    .eq('anio', anio)
    .eq('region_codigo', region)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ data })
}
```

### Seguridad con Route Handlers y Supabase

Es importante proteger tus endpoints de API, especialmente cuando interactúan con tu base de datos:

```typescript
// app/api/datos-protegidos/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Cliente de Supabase que verifica la autenticación
  const supabase = createRouteHandlerClient({ cookies })
  
  // Verificar sesión actual
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return new Response('No autorizado', { status: 401 })
  }
  
  // Consulta a datos protegidos
  const { data, error } = await supabase
    .from('datos_sensibles')
    .select('*')
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ data })
}
```

## Seguridad y Control de Acceso

### Validación de entrada

Es crucial validar todos los datos de entrada para prevenir vulnerabilidades:

```typescript
// app/api/empleabilidad/filtro/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod' // Librería de validación

// Esquema de validación
const filtroSchema = z.object({
  anio: z.string().regex(/^\d{4}$/),
  region: z.string().min(1).max(50),
  sector: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    // Extraer y validar el cuerpo
    const body = await request.json()
    const resultado = filtroSchema.safeParse(body)
    
    if (!resultado.success) {
      return NextResponse.json(
        { error: 'Datos de entrada inválidos', detalles: resultado.error },
        { status: 400 }
      )
    }
    
    // Procesar los datos validados
    const datos = resultado.data
    
    // Lógica de consulta o procesamiento...
    
    return NextResponse.json({ mensaje: 'Filtro aplicado', datos })
  } catch (e) {
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
```

### CORS (Cross-Origin Resource Sharing)

Si tus endpoints necesitan ser accesibles desde otros dominios:

```typescript
// app/api/empleabilidad/publica/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const data = { /* tus datos */ }
  
  return new NextResponse(JSON.stringify(data), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    },
  })
}

// Manejar solicitudes OPTIONS para preflight CORS
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
```

## Casos de Uso para Análisis de Datos

### 1. Endpoint para gráficos de dashboard

```typescript
// app/api/dashboard/resumen/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    // Consultas paralelas para obtener múltiples conjuntos de datos
    const [
      infoEmpleo,
      infoMatricula,
      infoInstituciones
    ] = await Promise.all([
      supabase.from('panel_region_sector')
        .select('anio, trimestre_movil, region_codigo, valor_total')
        .eq('region_codigo', 'NACIONAL')
        .order('anio', { ascending: false })
        .order('trimestre_movil', { ascending: false })
        .limit(4),
        
      supabase.from('matricula_2024')
        .select('anio, total_matriculados')
        .order('anio', { ascending: false })
        .limit(5),
        
      supabase.from('instituciones')
        .select('tipo, count(*)::int', { count: 'exact' })
        .groupBy('tipo')
    ])
    
    // Transformar datos para los gráficos
    const datosFormateados = {
      empleo: {
        tendencia: infoEmpleo.data || [],
        ultimo: infoEmpleo.data?.[0] || {}
      },
      educacion: {
        tendenciaMatricula: infoMatricula.data || [],
        distribucionInstituciones: infoInstituciones.data || []
      }
    }
    
    return NextResponse.json(datosFormateados)
  } catch (error) {
    console.error('Error al obtener datos del dashboard:', error)
    return NextResponse.json(
      { error: 'Error al cargar los datos del dashboard' },
      { status: 500 }
    )
  }
}
```

### 2. Endpoint para informes descargables

```typescript
// app/api/informes/regional/[region]/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'

export async function GET(
  request: Request,
  { params }: { params: { region: string } }
) {
  // Validar parámetro de región
  const region = params.region
  
  if (!region || region.length > 50) {
    return NextResponse.json(
      { error: 'Región inválida' },
      { status: 400 }
    )
  }
  
  // Inicializar Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  try {
    // Obtener datos regionales
    const { data, error } = await supabase
      .from('panel_region_sector')
      .select('*')
      .eq('region_codigo', region.toUpperCase())
      .order('anio', { ascending: false })
      .order('trimestre_movil', { ascending: true })
    
    if (error) throw error
    
    // Generar Excel
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data || [])
    XLSX.utils.book_append_sheet(wb, ws, `Región ${region}`)
    
    // Convertir a buffer
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
    
    // Responder con el archivo
    return new NextResponse(buf, {
      headers: {
        'Content-Disposition': `attachment; filename="informe_${region}.xlsx"`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    })
  } catch (error) {
    console.error(`Error al generar informe para región ${region}:`, error)
    return NextResponse.json(
      { error: 'Error al generar el informe' },
      { status: 500 }
    )
  }
}
```

### 3. Endpoint de procesamiento en segundo plano

```typescript
// app/api/procesamiento/datos/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  // Verificar el token de autorización
  const authHeader = request.headers.get('Authorization')
  if (authHeader !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return new Response('No autorizado', { status: 401 })
  }
  
  // Obtener parámetros de la tarea
  const { tarea, parametros } = await request.json()
  
  // Iniciar procesamiento asíncrono
  procesarTareaAsync(tarea, parametros)
    .catch(err => console.error('Error en procesamiento asíncrono:', err))
  
  // Responder inmediatamente
  return NextResponse.json({
    mensaje: 'Tarea iniciada en segundo plano',
    id: `tarea_${Date.now()}`
  })
}

async function procesarTareaAsync(tarea: string, parametros: any) {
  // Simulación de procesamiento que toma tiempo
  console.log(`Iniciando tarea: ${tarea}`)
  
  // Esperar para simular procesamiento
  await new Promise(resolve => setTimeout(resolve, 5000))
  
  // Procesar según el tipo de tarea
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  switch (tarea) {
    case 'actualizar_estadisticas':
      // Lógica para actualizar estadísticas
      await supabase
        .from('log_procesamientos')
        .insert({ tipo: 'estadisticas', estado: 'completado', timestamp: new Date() })
      break
      
    case 'generar_reporte':
      // Lógica para generar reporte
      await supabase
        .from('log_procesamientos')
        .insert({ tipo: 'reporte', estado: 'completado', timestamp: new Date() })
      break
  }
  
  console.log(`Tarea completada: ${tarea}`)
}
```

## Optimización y Mejores Prácticas

### Caching de respuestas

Next.js proporciona mecanismos de caché para optimizar el rendimiento:

```typescript
// app/api/datos-cache/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const datos = await obtenerDatosCostosos()
  
  return NextResponse.json(
    { datos },
    {
      headers: {
        'Cache-Control': 'max-age=3600, s-maxage=3600, stale-while-revalidate',
      },
    }
  )
}
```

### Rutas estáticas vs dinámicas

Es importante configurar correctamente el comportamiento de las rutas:

```typescript
// app/api/datos-estaticos/route.ts
export const dynamic = 'force-static' // Forzar comportamiento estático
export const revalidate = 3600 // Revalidar cada hora

export async function GET() {
  const datos = await obtenerDatos()
  return Response.json({ datos })
}

// app/api/datos-dinamicos/route.ts
export const dynamic = 'force-dynamic' // Forzar comportamiento dinámico

export async function GET() {
  const datosActuales = await obtenerDatosRecientes()
  return Response.json({ datosActuales })
}
```

### Streaming de respuestas

Para conjuntos de datos grandes, puedes implementar streaming:

```typescript
// app/api/datos-streaming/route.ts
export async function GET() {
  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    async start(controller) {
      // Enviar encabezado JSON
      controller.enqueue(encoder.encode('{"datos":['))
      
      let primero = true
      
      // Obtener datos de forma incremental
      for (const dato of await obtenerDatosGrandes()) {
        // Añadir coma si no es el primer elemento
        if (!primero) {
          controller.enqueue(encoder.encode(','))
        } else {
          primero = false
        }
        
        // Enviar dato
        controller.enqueue(encoder.encode(JSON.stringify(dato)))
        
        // Simular retraso para mostrar streaming
        await new Promise(r => setTimeout(r, 200))
      }
      
      // Cerrar el JSON
      controller.enqueue(encoder.encode(']}'))
      controller.close()
    }
  })
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/json',
      'Transfer-Encoding': 'chunked'
    }
  })
}
```

## Ejemplos Prácticos

### 1. API para dashboard en tiempo real

```typescript
// app/api/dashboard/tiempo-real/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' // Asegurar datos frescos

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  
  // Verificar autenticación
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return new Response('No autorizado', { status: 401 })
  }
  
  try {
    // Obtener estadísticas en tiempo real
    const { searchParams } = new URL(request.url)
    const filtroRegion = searchParams.get('region')
    
    const consulta = supabase
      .from('panel_region_sector')
      .select('*')
      .order('anio', { ascending: false })
      .order('trimestre_movil', { ascending: false })
      .limit(10)
    
    // Aplicar filtro si se especifica
    if (filtroRegion) {
      consulta.eq('region_codigo', filtroRegion)
    }
    
    const { data, error } = await consulta
    
    if (error) throw error
    
    return NextResponse.json({
      datos: data,
      timestamp: new Date().toISOString(),
      filtros: { region: filtroRegion || 'todas' }
    })
  } catch (error) {
    console.error('Error en dashboard en tiempo real:', error)
    return NextResponse.json(
      { error: 'Error al obtener datos del dashboard' },
      { status: 500 }
    )
  }
}
```

### 2. API para búsqueda avanzada

```typescript
// app/api/busqueda/avanzada/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Obtener criterios de búsqueda
    const { 
      termino,
      regiones,
      anios,
      indicadores,
      ordenar,
      pagina = 1,
      porPagina = 20
    } = await request.json()
    
    // Validar parámetros básicos
    if (!termino && !regiones?.length && !anios?.length && !indicadores?.length) {
      return NextResponse.json(
        { error: 'Se requiere al menos un criterio de búsqueda' },
        { status: 400 }
      )
    }
    
    // Inicializar Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    // Construir consulta base
    let consulta = supabase
      .from('panel_region_sector')
      .select('*', { count: 'exact' })
    
    // Aplicar filtros
    if (termino) {
      consulta = consulta.or(`region_codigo.ilike.%${termino}%,sec_codigo.ilike.%${termino}%`)
    }
    
    if (regiones?.length) {
      consulta = consulta.in('region_codigo', regiones)
    }
    
    if (anios?.length) {
      consulta = consulta.in('anio', anios)
    }
    
    if (indicadores?.length) {
      consulta = consulta.in('lab_indicador_codigo', indicadores)
    }
    
    // Aplicar ordenación
    if (ordenar?.campo && ordenar?.direccion) {
      consulta = consulta.order(ordenar.campo, { 
        ascending: ordenar.direccion === 'asc' 
      })
    } else {
      consulta = consulta.order('anio', { ascending: false })
    }
    
    // Aplicar paginación
    const desde = (pagina - 1) * porPagina
    consulta = consulta.range(desde, desde + porPagina - 1)
    
    // Ejecutar consulta
    const { data, error, count } = await consulta
    
    if (error) throw error
    
    // Formatear resultado
    return NextResponse.json({
      resultados: data,
      total: count,
      pagina,
      porPagina,
      totalPaginas: Math.ceil((count || 0) / porPagina)
    })
  } catch (error) {
    console.error('Error en búsqueda avanzada:', error)
    return NextResponse.json(
      { error: 'Error al procesar la búsqueda' },
      { status: 500 }
    )
  }
}
```

### 3. Endpoint para webhooks de servicios externos

```typescript
// app/api/webhooks/actualizacion-datos/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  // Verificar firma del webhook para seguridad
  const firma = request.headers.get('x-webhook-signature')
  const cuerpoRaw = await request.text()
  
  const firmaCalculada = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET!)
    .update(cuerpoRaw)
    .digest('hex')
  
  if (firma !== firmaCalculada) {
    return new Response('Firma inválida', { status: 401 })
  }
  
  // Procesar el cuerpo
  const cuerpo = JSON.parse(cuerpoRaw)
  
  try {
    // Inicializar Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    // Insertar registro de la actividad
    await supabase
      .from('webhook_logs')
      .insert({
        origen: 'actualizacion-datos',
        datos: cuerpo,
        recibido_en: new Date()
      })
    
    // Procesar según el tipo de evento
    switch (cuerpo.tipo) {
      case 'nuevos_datos':
        // Lógica para procesar nuevos datos
        await procesarNuevosDatos(supabase, cuerpo.datos)
        break
        
      case 'correccion':
        // Lógica para corregir datos existentes
        await corregirDatos(supabase, cuerpo.datos)
        break
        
      default:
        return NextResponse.json({
          recibido: true,
          procesado: false,
          motivo: 'Tipo de evento no soportado'
        })
    }
    
    return NextResponse.json({
      recibido: true,
      procesado: true,
      id: cuerpo.id
    })
  } catch (error) {
    console.error('Error al procesar webhook:', error)
    return NextResponse.json(
      { error: 'Error interno al procesar la solicitud' },
      { status: 500 }
    )
  }
}

async function procesarNuevosDatos(supabase, datos) {
  // Implementación de procesamiento de nuevos datos
}

async function corregirDatos(supabase, datos) {
  // Implementación de corrección de datos
}
```

## Conclusión

Los Route Handlers de Next.js proporcionan una forma potente y flexible de crear APIs para tu aplicación de análisis del mercado laboral. Al combinarlos con Supabase, puedes crear endpoints que:

1. Recuperen y transformen datos de manera eficiente
2. Protejan la información mediante autenticación y autorización
3. Generen informes y visualizaciones personalizados
4. Procesen datos en segundo plano
5. Interactúen con servicios externos mediante webhooks

Implementa estas técnicas en tu proyecto para crear una plataforma de análisis de datos robusta, eficiente y segura.

## Recursos Adicionales

- [Documentación oficial de Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Documentación de la API Web Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
- [Integración de Supabase con Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Mejores prácticas de seguridad para APIs](https://owasp.org/www-project-api-security/) 