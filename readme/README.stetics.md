# Diseño de Dashboard con shadcn/ui

## Introducción

[shadcn/ui](https://ui.shadcn.com/) es una biblioteca de componentes de React bellamente diseñados y accesibles que se integra perfectamente con Tailwind CSS. A diferencia de otras bibliotecas UI, shadcn/ui ofrece código fuente que puedes copiar y personalizar directamente en tu proyecto, lo que brinda máxima flexibilidad.

Este documento explica cómo implementar shadcn/ui para crear dashboards atractivos y funcionales en nuestra aplicación de análisis del mercado laboral y educativo.

## Índice

- [Instalación](#instalación)
- [Componentes Clave para Dashboards](#componentes-clave-para-dashboards)
- [Ejemplos de Implementación](#ejemplos-de-implementación)
- [Personalización del Tema](#personalización-del-tema)
- [Integración con Supabase](#integración-con-supabase)
- [Consideraciones de Accesibilidad](#consideraciones-de-accesibilidad)

## Instalación

Para comenzar a utilizar shadcn/ui en nuestro proyecto Next.js:

```bash
# Inicializar shadcn/ui en tu proyecto
npx shadcn-ui@latest init

# Seguir las instrucciones interactivas:
# - Seleccionar estilo (por defecto o personalizado)
# - Configurar ubicación de componentes (usualmente @/components/ui)
# - Seleccionar tema de color (recomendado: zinc para nuestra aplicación)
```

Instalar componentes individuales según sean necesarios:

```bash
# Ejemplo: instalar componentes básicos para dashboard
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add table
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add sheet
```

## Componentes Clave para Dashboards

### 1. Cards

Las tarjetas son fundamentales para organizar información en un dashboard:

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DashboardCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasa de Empleabilidad</CardTitle>
        <CardDescription>Último trimestre</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">87.5%</p>
        <p className="text-sm text-muted-foreground">+2.5% vs periodo anterior</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Actualizado: Junio 2024</p>
      </CardFooter>
    </Card>
  );
}
```

### 2. Tablas de Datos

Para mostrar datos tabulares del mercado laboral:

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function EmpleabilidadTable({ data }) {
  return (
    <Table>
      <TableCaption>Indicadores por región</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Región</TableHead>
          <TableHead>Tasa Ocupación</TableHead>
          <TableHead>Tasa Desempleo</TableHead>
          <TableHead className="text-right">Variación Anual</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.region_id}>
            <TableCell className="font-medium">{item.region}</TableCell>
            <TableCell>{item.valor_total}%</TableCell>
            <TableCell>{item.tasa_desempleo}%</TableCell>
            <TableCell className="text-right">{item.variacion}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### 3. Tabs para Segmentar Contenido

Útiles para organizar diferentes visualizaciones o categorías:

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AnalisisTabs() {
  return (
    <Tabs defaultValue="empleo">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="empleo">Empleo</TabsTrigger>
        <TabsTrigger value="educacion">Educación</TabsTrigger>
        <TabsTrigger value="proyecciones">Proyecciones</TabsTrigger>
      </TabsList>
      <TabsContent value="empleo">
        {/* Contenido del tab de empleo */}
      </TabsContent>
      <TabsContent value="educacion">
        {/* Contenido del tab de educación */}
      </TabsContent>
      <TabsContent value="proyecciones">
        {/* Contenido del tab de proyecciones */}
      </TabsContent>
    </Tabs>
  );
}
```

### 4. Calendarios

Para filtros por fecha o visualización de tendencias temporales:

```tsx
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function DateSelector() {
  const [date, setDate] = useState(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
```

## Ejemplos de Implementación

### Dashboard Principal

Ejemplo de un dashboard de vista general combinando varios componentes:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardOverview({ data }) {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      {/* Tarjetas de métricas clave */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Matriculados
            </CardTitle>
            <svg {...} /> {/* Icono */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalMatriculados.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {data.cambioMatriculados > 0 ? '+' : ''}{data.cambioMatriculados}% vs año anterior
            </p>
          </CardContent>
        </Card>
        
        {/* Repite para otras métricas: Tasa empleo, Nuevas carreras, etc */}
      </div>
      
      {/* Contenido por pestañas */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">General</TabsTrigger>
          <TabsTrigger value="sectores">Sectores</TabsTrigger>
          <TabsTrigger value="regiones">Regiones</TabsTrigger>
          <TabsTrigger value="demografico">Demográfico</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {/* Contenido del tab General */}
        </TabsContent>
        {/* Otros TabsContent */}
      </Tabs>
    </div>
  );
}
```

### Visualización de Datos de Tendencias

Para tendencias ocupacionales:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from "recharts"; // Requiere instalar recharts

export function TendenciasOcupacionales({ data }) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Tendencias Ocupacionales por Sector</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="sector"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip />
            <Bar
              dataKey="valor_total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
```

## Personalización del Tema

shadcn/ui facilita la personalización del tema para que se alinee con la identidad visual del proyecto:

### 1. Colores Personalizados

Editar el archivo `globals.css` para definir los colores principales:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 201 96% 32%; /* Azul institucional */
    --primary-foreground: 0 0% 98%;
    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... resto de variables para modo oscuro ... */
  }
}
```

### 2. Configuración del Tema en tailwind.config.js

```js
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... otros colores ...
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

## Integración con Supabase

Para integrar los componentes de shadcn/ui con datos de Supabase:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmpleabilidadDashboard() {
  const [loading, setLoading] = useState(true)
  const [informalidad, setInformalidad] = useState([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        const { data, error } = await supabase
          .from('informalidad')
          .select('*')
          .eq('anio', 2024)
        
        if (error) throw error
        
        setInformalidad(data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [supabase])

  return (
    <div className="space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Informalidad Laboral</h2>
      
      {loading ? (
        <div className="flex items-center justify-center h-24">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {informalidad.map(item => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.region_codigo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.valor_total.toFixed(1)}%</div>
                <div className="flex">
                  <div className="text-xs text-muted-foreground mr-2">H: {item.valor_hombres.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">M: {item.valor_mujeres.toFixed(1)}%</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

## Consideraciones de Accesibilidad

shadcn/ui está construido con accesibilidad en mente, pero hay algunas buenas prácticas a seguir:

1. **Mantener un contraste adecuado**: Usar los colores predefinidos que ya tienen contraste adecuado.

2. **Textos descriptivos**: Incluir textos alternativos para imágenes y descripciones para gráficos.

3. **Teclado y navegación**: Asegurarse de que todos los componentes interactivos sean accesibles por teclado.

4. **Responsive**: Diseñar para todos los tamaños de pantalla (los componentes de shadcn/ui son responsive por defecto).

5. **Estados de carga**: Proporcionar indicadores visuales durante estados de carga.

```tsx
// Ejemplo de estado de carga accesible
{loading ? (
  <div className="flex items-center justify-center p-8" aria-live="polite" aria-busy="true">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" role="status">
      <span className="sr-only">Cargando...</span>
    </div>
  </div>
) : (
  // Contenido
)}
```

## Recursos Adicionales

- [Documentación oficial de shadcn/ui](https://ui.shadcn.com/docs)
- [Ejemplos de dashboards](https://ui.shadcn.com/examples)
- [Repositorio de GitHub](https://github.com/shadcn/ui)
- [Configuración avanzada de temas](https://ui.shadcn.com/docs/theming)

## Conclusión

shadcn/ui proporciona un conjunto completo de componentes estéticamente agradables y altamente personalizables para crear dashboards profesionales. Al combinar estos componentes con los datos de Supabase, podemos construir visualizaciones efectivas que ayudarán a los usuarios a entender mejor las tendencias del mercado laboral y educativo.

Debido a su naturaleza "copy-paste", shadcn/ui nos da total control sobre el código, permitiéndonos adaptar cada componente exactamente a nuestras necesidades específicas sin depender de una biblioteca externa que podría limitar nuestra flexibilidad. 