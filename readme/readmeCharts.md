Guía Completa de Gráficos con shadcn/ui para Visualización de Datos
Introducción
Los gráficos son elementos fundamentales para visualizar datos complejos en dashboards de análisis. shadcn/ui ofrece una colección completa de componentes de gráficos basados en Recharts, una biblioteca de visualización de datos para React. Esta guía detalla cada tipo de gráfico disponible, sus variantes, casos de uso óptimos y estrategias de implementación para nuestro proyecto de análisis del mercado laboral y educativo.
Índice
Instalación y Configuración
Tipos de Gráficos
Gráficos de Área
Gráficos de Barras
Gráficos de Línea
Gráficos Circulares
Gráficos Radar
Gráficos Radiales
Tooltips
3. Estrategias de Visualización para Datos de Empleabilidad
Personalización Avanzada
Accesibilidad en Gráficos
Optimización de Rendimiento
Instalación y Configuración
Antes de comenzar a usar los gráficos de shadcn/ui, necesitamos instalar las dependencias necesarias:
# Instalar Recharts
npm install recharts

# Agregar los componentes de gráficos de shadcn/ui
npx shadcn-ui@latest add area-chart
npx shadcn-ui@latest add bar-chart
npx shadcn-ui@latest add line-chart
npx shadcn-ui@latest add pie-chart
npx shadcn-ui@latest add radar-chart
npx shadcn-ui@latest add radial-chart
Tipos de Gráficos
Gráficos de Área
Los gráficos de área son excelentes para mostrar tendencias a lo largo del tiempo y visualizar la magnitud de los cambios.
Variantes principales:
1. Gráfico de Área Básico: Muestra una única serie de datos con área coloreada.
Gráfico de Área Apilada: Muestra múltiples series de datos apiladas.
Gráfico de Área Expandida: Similar al apilado, pero normalizado al 100%.
Gráfico de Área con Gradiente: Utiliza gradientes para mejorar la estética visual.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@/components/ui/area-chart";

// Datos formateados para el gráfico de tendencias de empleo
const empleabilidadData = [
  { mes: "Ene", valor_hombres: 65.2, valor_mujeres: 53.8, valor_total: 59.5 },
  { mes: "Feb", valor_hombres: 66.1, valor_mujeres: 54.2, valor_total: 60.1 },
  // ... más datos mensuales
];

export function TendenciasEmpleoChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendencias de Empleo 2024</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart
          data={empleabilidadData}
          index="mes"
          categories={["valor_hombres", "valor_mujeres", "valor_total"]}
          colors={["blue", "pink", "gray"]}
          valueFormatter={(value) => `${value}%`}
          showLegend={true}
          showGridLines={true}
          startEndOnly={false}
          showXAxis={true}
          showYAxis={true}
          yAxisWidth={40}
          showAnimation={true}
        />
      </CardContent>
    </Card>
  );
}

Casos de uso óptimos:
Tasa de ocupación mensual: Visualizar tendencias a lo largo de diferentes períodos.
Comparativa de empleo por género: Usar gráficos de área apilados para mostrar la distribución.
Evolución de matriculados por tipo de institución: Mostrar cambios proporcionales a lo largo del tiempo.
Gráficos de Barras
Los gráficos de barras son ideales para comparaciones categóricas y análisis de distribución.
Variantes principales:
Gráfico de Barras Vertical: Comparación estándar de categorías.
Gráfico de Barras Horizontal: Útil cuando hay muchas categorías o nombres largos.
Gráfico de Barras Apiladas: Muestra la composición dentro de cada categoría.
Gráfico de Barras Agrupadas: Permite comparar múltiples series lado a lado.
Gráfico de Barras Negativas: Útil para visualizar valores positivos y negativos.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/bar-chart";

// Datos formateados para comparativa regional
const datosRegionales = [
  { region: "Metropolitana", valor_hombres: 68.3, valor_mujeres: 55.7 },
  { region: "Valparaíso", valor_hombres: 63.8, valor_mujeres: 51.2 },
  // ... más regiones
];

export function ComparativaRegionalChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Empleo por Región y Género</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          data={datosRegionales}
          index="region"
          categories={["valor_hombres", "valor_mujeres"]}
          colors={["blue", "pink"]}
          valueFormatter={(value) => `${value.toFixed(1)}%`}
          layout="vertical"
          showLegend={true}
          showGridLines={true}
          showAnimation={true}
          stack={false}
          yAxisWidth={120}
        />
      </CardContent>
    </Card>
  );
}

Casos de uso óptimos:
Comparativa de regiones: Mostrar diferencias de tasas de empleo por región.
Distribución por sectores económicos: Visualizar la concentración laboral por industria.
Análisis de brechas de género: Usar barras agrupadas para comparar valores entre hombres y mujeres.
Evolución anual de matrículas: Comparar matriculados por año académico.
Gráficos de Línea
Los gráficos de línea son perfectos para mostrar tendencias continuas y evolución a lo largo del tiempo.
Variantes principales:
Gráfico de Línea Básico: Muestra tendencias simples con líneas.
Gráfico de Línea Múltiple: Compara múltiples series de datos.
Gráfico de Línea con Puntos: Destaca los puntos de datos específicos.
Gráfico de Línea Escalonado: Muestra cambios discretos entre períodos.
Gráfico de Línea con Etiquetas: Añade etiquetas a puntos específicos.

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart } from "@/components/ui/line-chart";

// Datos de tendencias trimestrales
const datosTendencias = [
  { trimestre: "2023-Q1", informalidad: 27.3, desempleo: 7.8, ocupacion: 58.2 },
  { trimestre: "2023-Q2", informalidad: 26.9, desempleo: 7.6, ocupacion: 58.7 },
  // ... más trimestres
];

export function TendenciasTrimestralesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores Laborales Trimestrales</CardTitle>
        <CardDescription>Evolución de métricas clave (2023-2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          data={datosTendencias}
          index="trimestre"
          categories={["informalidad", "desempleo", "ocupacion"]}
          colors={["amber", "red", "green"]}
          valueFormatter={(value) => `${value}%`}
          showLegend={true}
          showGridLines={true}
          connectNulls={true}
          showYAxis={true}
          showXAxis={true}
          showAnimation={true}
          curveType="monotone"
          showDots={true}
          showGradient={false}
        />
      </CardContent>
    </Card>
  );
}

Casos de uso óptimos:
Evolución de tasas de desempleo: Visualizar tendencias a lo largo de múltiples períodos.
Comparativa de indicadores económicos: Usar múltiples líneas para contrastar diferentes métricas.
Monitoreo de matriculados en tiempo: Seguimiento de inscripciones a lo largo de los años.
Proyecciones futuras: Extender líneas más allá de datos actuales para mostrar estimaciones.
Gráficos Circulares
Los gráficos circulares (pie charts) son efectivos para mostrar proporciones de un todo y distribuciones porcentuales.
Variantes principales:
Gráfico Circular Básico: Muestra proporciones simples.
Gráfico de Dona (Donut): Similar al circular, pero con espacio interior.
Gráfico de Dona con Texto Central: Añade un indicador o total en el centro.
Gráfico Circular con Etiquetas: Incluye etiquetas detalladas para cada segmento.
Gráfico Circular con Leyenda: Separa las etiquetas en una leyenda.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "@/components/ui/pie-chart";

// Datos de distribución por sector económico
const distribucionSectorial = [
  { sector: "Servicios", valor: 42.5 },
  { sector: "Comercio", valor: 18.3 },
  { sector: "Industria", valor: 11.2 },
  { sector: "Construcción", valor: 8.7 },
  { sector: "Agricultura", valor: 7.4 },
  { sector: "Otros", valor: 11.9 },
];

export function DistribucionSectorialChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución del Empleo por Sector</CardTitle>
      </CardHeader>
      <CardContent>
        <PieChart
          data={distribucionSectorial}
          index="sector"
          category="valor"
          colors={["blue", "cyan", "indigo", "purple", "orange", "gray"]}
          valueFormatter={(value) => `${value}%`}
          showAnimation={true}
          showTooltip={true}
          showLegend={true}
          donut={true}
          donutThickness={25}
          title="Sectores económicos"
          subtitle="2024"
        />
      </CardContent>
    </Card>
  );
}

#### Propiedades principales:

- **data**: Array de objetos con los datos a visualizar
- **index**: Campo que define las etiquetas de los ejes del radar
- **categories**: Array de campos de datos para cada línea/polígono
- **colors**: Array de colores para cada categoría
- **valueFormatter**: Función para formatear los valores mostrados
- **showLegend**: Muestra u oculta la leyenda
- **showAnimation**: Activa o desactiva las animaciones
- **startAngle/endAngle**: Ángulos de inicio y fin del radar (en grados)
- **gridShape**: Forma de la cuadrícula ("polygon" o "circle")
- **gridCount**: Número de círculos/polígonos concéntricos
- **showValues**: Si muestra valores numéricos en el radar

#### Casos de uso óptimos:
- **Análisis de competencias laborales**: Comparar niveles de diferentes habilidades demandadas.
- **Evaluación multidimensional de carreras**: Componer métricas como empleabilidad, salario, satisfacción, etc.
- **Comparativa regional multifactorial**: Analizar múltiples indicadores por región.
- **Perfiles ocupacionales**: Visualizar equilibrios de habilidades duras y blandas.
- **Evaluación de instituciones educativas**: Comparar dimensiones como calidad docente, infraestructura, investigación, etc.

### Gráficos Radiales

Los gráficos radiales (o gráficos de medidor) muestran valores únicos en formato circular, ideal para representar progreso o cumplimiento. Son especialmente efectivos para visualizar porcentajes o proporciones de un valor máximo.

#### Variantes principales:

1. **Gráfico Radial Básico**: Muestra un valor único como proporción de un círculo.
2. **Gráfico Radial con Etiqueta**: Incluye el valor numérico como etiqueta.
3. **Gráfico Radial con Texto**: Añade contexto textual al valor.
4. **Gráfico Radial con Rejilla**: Incluye líneas de referencia para facilitar la lectura.
5. **Gráfico Radial con Forma**: Personaliza la forma del arco o segmento.
6. **Gráfico Radial Apilado**: Muestra múltiples valores en capas concéntricas.

#### Implementación para metas de empleabilidad:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialChart } from "@/components/ui/radial-chart";

// Datos de cumplimiento de metas
const cumplimientoMetas = [
  { categoria: "Empleo Juvenil", valor: 78, meta: 100 },
  { categoria: "Paridad de Género", valor: 85, meta: 100 },
  { categoria: "Reducción Informalidad", valor: 62, meta: 100 },
];

export function CumplimientoMetasChart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cumplimientoMetas.map((item) => (
        <Card key={item.categoria}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{item.categoria}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadialChart
              value={item.valor}
              maxValue={item.meta}
              valueFormatter={(value) => `${value}%`}
              color="blue"
              showAnimation={true}
              label="Progreso"
              size={180}
              thickness={20}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

#### Propiedades principales:

- **value**: Valor numérico a mostrar
- **maxValue**: Valor máximo posible (para calcular la proporción)
- **valueFormatter**: Función para formatear el valor mostrado
- **color**: Color del arco o segmento
- **showAnimation**: Activa o desactiva las animaciones
- **label**: Texto descriptivo para el valor
- **size**: Tamaño del gráfico en píxeles
- **thickness**: Grosor del arco en píxeles

#### Casos de uso óptimos:
- **Indicadores de progreso**: Visualizar avance hacia metas específicas.
- **Nivel de cumplimiento**: Representar porcentajes de objetivos alcanzados.
- **Tasas de inserción laboral**: Mostrar la proporción de graduados empleados.
- **Indicadores de calidad institucional**: Representar métricas como acreditación, investigación, etc.
- **KPIs individuales**: Destacar métricas clave de rendimiento en dashboards.

### Tooltips

Los tooltips son componentes esenciales que mejoran la interactividad de las visualizaciones proporcionando información detallada al pasar el cursor sobre los elementos gráficos.

#### Variantes principales:

1. **Tooltip Estándar**: Muestra información básica sobre el punto de datos.
2. **Tooltip con Indicador de Línea**: Incluye una línea vertical que facilita la referencia.
3. **Tooltip sin Indicador**: Versión simplificada sin líneas adicionales.
4. **Tooltip con Formato Personalizado**: Adapta los valores mostrados según necesidades.
5. **Tooltip con Formato de Etiqueta**: Personaliza el formato de la etiqueta principal.
6. **Tooltip sin Etiqueta**: Omite la etiqueta principal para diseños minimalistas.
7. **Tooltip con Formato Personalizado**: Permite transformaciones avanzadas de datos.
8. **Tooltip con Iconos**: Enriquece visualmente la información presentada.
9. **Tooltip Avanzado**: Combina varios elementos para análisis detallados.

#### Implementación avanzada:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/ui/line-chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart-tooltip";
import { TrendingUp, TrendingDown } from "lucide-react";

// Datos de tendencia
const datosTendencia = [
  { periodo: "Ene 2024", valor: 7.8, valorAnterior: 8.1 },
  { periodo: "Feb 2024", valor: 7.6, valorAnterior: 7.8 },
  { periodo: "Mar 2024", valor: 7.3, valorAnterior: 7.6 },
  { periodo: "Abr 2024", valor: 7.5, valorAnterior: 7.3 },
  { periodo: "May 2024", valor: 7.2, valorAnterior: 7.5 },
  { periodo: "Jun 2024", valor: 6.9, valorAnterior: 7.2 },
];

export function TendenciaTooltipChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución del Desempleo con Análisis</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          data={datosTendencia}
          index="periodo"
          categories={["valor"]}
          colors={["blue"]}
          valueFormatter={(value) => `${value}%`}
          showLegend={false}
          showGridLines={true}
          showAnimation={true}
          tooltip={(props) => {
            if (!props.payload?.[0]) return null;
            
            const value = props.payload[0].value;
            const prevValue = props.payload[0].payload.valorAnterior;
            const cambio = value - prevValue;
            const esPositivo = cambio >= 0;
            
            return (
              <ChartTooltip>
                <ChartTooltipContent
                  className="p-3"
                  icon={esPositivo ? <TrendingUp /> : <TrendingDown />}
                  title={`${props.label}`}
                  content={[
                    { label: "Valor", value: `${value}%` },
                    { label: "Variación", value: `${cambio.toFixed(1)}%` },
                    { 
                      label: "Tendencia", 
                      value: esPositivo ? "Incremento" : "Reducción",
                      className: esPositivo ? "text-red-500" : "text-green-500"
                    }
                  ]}
                />
              </ChartTooltip>
            );
          }}
        />
      </CardContent>
    </Card>
  );
}
```

#### Propiedades principales del ChartTooltipContent:

- **title**: Título principal del tooltip
- **icon**: Icono opcional para mostrar junto al título
- **content**: Array de objetos con `label` y `value` para mostrar
- **className**: Clases CSS adicionales para personalizar estilos
- **separator**: Carácter separador entre etiqueta y valor

#### Casos de uso óptimos:
- **Análisis detallado al pasar el cursor**: Proporcionar contexto adicional a datos visualizados.
- **Comparativas temporales**: Mostrar variaciones respecto a períodos anteriores.
- **Desglose de datos agregados**: Revelar componentes de valores compuestos.
- **Metadatos adicionales**: Incluir información complementaria no visible en el gráfico principal.
- **Análisis de tendencias**: Mostrar dirección del cambio y magnitud en un solo vistazo.

## Estrategias de Visualización para Datos de Empleabilidad

### 1. Agrupación estratégica de gráficos

Organiza los gráficos en dashboards temáticos que cuenten una historia coherente:

```tsx
export function DashboardEmpleabilidad() {
  return (
    <div className="grid gap-4">
      {/* Resumen ejecutivo con KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <TasaOcupacionRadial />
        <TasaDesempleoRadial />
        <TasaInformalidadRadial />
        <VariacionAnualRadial />
      </div>
      
      {/* Tendencias temporales */}
      <div className="grid grid-cols-1 gap-4">
        <TendenciasTrimestralesChart />
      </div>
      
      {/* Análisis comparativo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ComparativaRegionalChart />
        <DistribucionSectorialChart />
      </div>
      
      {/* Análisis detallado */}
      <div className="grid grid-cols-1 gap-4">
        <CompetenciasSectorialesChart />
      </div>
    </div>
  );
}
```

### 2. Integración con datos de Supabase

Diseña componentes que manejen el ciclo de vida de los datos y estados de carga:

```tsx
'use client'

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/bar-chart";
import { Skeleton } from "@/components/ui/skeleton";

export function EmpleabilidadSectorialChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener datos de la tabla panel_region_sector
        const { data: sectorData, error } = await supabase
          .from('panel_region_sector')
          .select('sec_codigo, valor_total, valor_hombres, valor_mujeres')
          .eq('anio', 2024)
          .order('valor_total', { ascending: false })
          .limit(10);
        
        if (error) throw error;
        
        setData(sectorData || []);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [supabase]);

  // Renderizar estado de carga
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Empleo por Sector Económico</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    );
  }

  // Renderizar error
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Empleo por Sector Económico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-destructive">Error al cargar datos: {error}</div>
        </CardContent>
      </Card>
    );
  }

  // Renderizar gráfico
  return (
    <Card>
      <CardHeader>
        <CardTitle>Empleo por Sector Económico</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          data={data}
          index="sec_codigo"
          categories={["valor_total", "valor_hombres", "valor_mujeres"]}
          colors={["blue", "indigo", "violet"]}
          valueFormatter={(value) => `${value}%`}
          layout="vertical"
          showLegend={true}
          showGridLines={true}
          showAnimation={true}
          yAxisWidth={120}
        />
      </CardContent>
    </Card>
  );
}
```

### 3. Visualizaciones cruzadas con múltiples fuentes

Combina datos de diferentes tablas para análisis más profundos:

```tsx
'use client'

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/ui/line-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AnalisisIntegradoChart() {
  const [empleabilidadData, setEmpleabilidadData] = useState([]);
  const [matriculaData, setMatriculaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      // Consulta paralela para ambas tablas
      const [empleabilidadResult, matriculaResult] = await Promise.all([
        supabase
          .from('panel_region_sector')
          .select('anio, valor_total')
          .eq('region_codigo', 'NACIONAL')
          .order('anio'),
          
        supabase
          .from('matricula_2024')
          .select('anio, total_matriculados')
          .order('anio')
      ]);
      
      if (empleabilidadResult.data) setEmpleabilidadData(empleabilidadResult.data);
      if (matriculaResult.data) setMatriculaData(matriculaResult.data);
      
      setLoading(false);
    }
    
    fetchData();
  }, [supabase]);

  // Procesamiento de datos para correlación
  const datosCorrelacionados = empleabilidadData.map(item => {
    const matriculaCorrespondiente = matriculaData.find(m => m.anio === item.anio);
    return {
      anio: item.anio,
      tasa_empleo: item.valor_total,
      matriculados: matriculaCorrespondiente?.total_matriculados || 0
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Correlación Empleo-Educación</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tendencia">
          <TabsList>
            <TabsTrigger value="tendencia">Tendencias</TabsTrigger>
            <TabsTrigger value="correlacion">Correlación</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tendencia">
            <LineChart
              data={datosCorrelacionados}
              index="anio"
              categories={["tasa_empleo", "matriculados"]}
              colors={["blue", "green"]}
              valueFormatter={(value, category) => 
                category === "tasa_empleo" ? `${value}%` : value.toLocaleString()
              }
              showLegend={true}
              showYAxis={true}
              yAxisWidth={60}
            />
          </TabsContent>
          
          <TabsContent value="correlacion">
            {/* Aquí podría ir un gráfico de dispersión (scatter plot) 
                si estuviera disponible en shadcn/ui */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
```

### 4. Estrategias para análisis regional y sectorial

Para visualizar la empleabilidad por región y sector, podemos usar estas estrategias:

```tsx
// Ejemplo para matriz sectorial por región con mapa de calor
export function MatrizSectorialRegional({ data }) {
  // Organizar datos en formato adecuado para un mapa de calor
  // Combinando gráficos de barras apiladas y agrupadas
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Matriz Sectorial por Región</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          data={data}
          index="region"
          categories={/* categorías de sectores */}
          layout="vertical"
          stack={true}
          showLegend={true}
          // ...otras propiedades
        />
      </CardContent>
    </Card>
  );
}
```

## Personalización Avanzada

### 1. Adaptación a temas claros y oscuros

Asegura que tus gráficos se ajusten correctamente a ambos temas:

```tsx
'use client'

import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@/components/ui/area-chart";

export function TemaAdaptativoChart({ data }) {
  const { theme } = useTheme();
  
  // Colores adaptados según el tema
  const getChartColors = () => {
    return theme === "dark" 
      ? ["#93c5fd", "#c4b5fd", "#f9a8d4"] // Colores para tema oscuro
      : ["#3b82f6", "#8b5cf6", "#ec4899"]; // Colores para tema claro
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución Trimestral</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart
          data={data}
          index="trimestre"
          categories={["valor_hombres", "valor_mujeres", "valor_total"]}
          colors={getChartColors()}
          showYAxis={true}
          showGridLines={true}
          showGradient={true}
        />
      </CardContent>
    </Card>
  );
}
```

### 2. Personalización de estilos para la marca

Adapta los gráficos a la identidad visual del proyecto:

```tsx
// Configuración en globals.css
:root {
  /* Colores de gráficos institucionales */
  --chart-color-primary: 201 96% 32%;      /* Azul institucional */
  --chart-color-secondary: 203 89% 53%;    /* Azul claro */
  --chart-color-tertiary: 262 83% 58%;     /* Violeta */
  --chart-color-success: 142 69% 58%;      /* Verde */
  --chart-color-warning: 38 92% 50%;       /* Ámbar */
  --chart-color-danger: 0 84% 60%;         /* Rojo */
  --chart-color-neutral: 240 5% 64%;       /* Gris */
}

/* Clases de utilidad para gráficos */
.chart-primary { color: hsl(var(--chart-color-primary)); }
.chart-secondary { color: hsl(var(--chart-color-secondary)); }
/* ... */
```

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/bar-chart";

export function EstiloInstitucionalChart({ data }) {
  // Colores institucionales
  const coloresInstitucionales = [
    "hsl(var(--chart-color-primary))",
    "hsl(var(--chart-color-secondary))",
    "hsl(var(--chart-color-tertiary))",
    "hsl(var(--chart-color-success))",
  ];
  
  return (
    <Card className="border-primary/20">
      <CardHeader className="border-b border-primary/10">
        <CardTitle className="text-primary">Distribución Regional</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          data={data}
          index="region"
          categories={["valor"]}
          colors={coloresInstitucionales}
          showAnimation={true}
          className="h-[350px] mt-4" // Personalización de dimensiones
        />
      </CardContent>
    </Card>
  );
}
```

### 3. Responsividad y adaptación a diferentes dispositivos

Asegura que tus gráficos se vean bien en todos los tamaños de pantalla:

```tsx
export function GraficoResponsivo({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis Comparativo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] sm:h-[300px] md:h-[400px]">
          <BarChart
            data={data}
            index="categoria"
            categories={["valor"]}
            colors={["blue"]}
            // Configuraciones que cambian según el tamaño
            yAxisWidth={{
              base: 40,  // Móvil
              sm: 60,    // Tablet
              md: 80,    // Desktop
            }}
            // Más ajustes responsivos
          />
        </div>
      </CardContent>
    </Card>
  );
}
```

## Accesibilidad en Gráficos

Es crucial asegurar que las visualizaciones sean accesibles para todos los usuarios:

### 1. Colores accesibles

Usa combinaciones de colores con suficiente contraste y patrones diferenciables:

```tsx
// Paleta de colores accesible con suficiente contraste
const coloresAccesibles = [
  "hsl(201 96% 32%)",  // Azul oscuro (alto contraste)
  "hsl(47 100% 50%)",  // Amarillo vívido
  "hsl(328 100% 54%)", // Magenta
  "hsl(162 100% 41%)", // Verde turquesa
  "hsl(16 100% 50%)",  // Naranja
];

// Implementación con patrones diferenciables
export function GraficoAccesible({ data }) {
  return (
    <PieChart
      data={data}
      index="categoria"
      category="valor"
      colors={coloresAccesibles}
      showLegend={true}
      patternType="lines" // Usar patrones además de colores
    />
  );
}
```

### 2. Texto alternativo y etiquetas descriptivas

Proporciona descripciones para tecnologías asistivas:

```tsx
export function GraficoConDescripcion({ data, titulo, descripcion }) {
  return (
    <div>
      <div aria-hidden="true">
        <BarChart
          data={data}
          index="categoria"
          categories={["valor"]}
          colors={["blue"]}
        />
      </div>
      
      {/* Descripción textual para lectores de pantalla */}
      <div className="sr-only">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
        <ul>
          {data.map(item => (
            <li key={item.categoria}>
              {item.categoria}: {item.valor}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### 3. Interacción accesible por teclado

Asegura que los usuarios puedan navegar por los gráficos usando solo el teclado:

```tsx
export function GraficoAccesibleTeclado({ data }) {
  return (
    <div 
      tabIndex={0} 
      role="figure" 
      aria-label="Gráfico de empleabilidad por región"
      onKeyDown={(e) => {
        // Lógica para navegar entre puntos de datos con teclado
        if (e.key === 'ArrowRight') {
          // Mover al siguiente punto de datos
        } else if (e.key === 'ArrowLeft') {
          // Mover al punto de datos anterior
        }
      }}
    >
      <LineChart
        // Configuración del gráfico
      />
    </div>
  );
}
```

## Optimización de Rendimiento

### 1. Carga diferida de gráficos

Usa carga diferida para mejorar los tiempos de carga inicial:

```tsx
'use client';

import { Suspense, lazy } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Carga diferida de componentes de gráficos pesados
const LazyBarChart = lazy(() => import('@/components/ui/bar-chart').then(mod => ({ default: mod.BarChart })));

export function GraficoOptimizado({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis Regional</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
          <LazyBarChart
            data={data}
            index="region"
            categories={["valor"]}
            colors={["blue"]}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
```

### 2. Segmentación de datos según la vista

Limita la cantidad de datos visualizados según la necesidad:

```tsx
export function GraficoSegmentado({ data, vista }) {
  // Segmentar datos según el nivel de detalle requerido
  const datosVista = React.useMemo(() => {
    switch (vista) {
      case 'resumen':
        return data.slice(0, 5); // Solo los 5 principales
      case 'completo':
        return data; // Todos los datos
      case 'recientes':
        return data.filter(item => item.anio >= 2022); // Solo datos recientes
      default:
        return data;
    }
  }, [data, vista]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análisis por Región</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart
          data={datosVista}
          // Resto de propiedades
        />
      </CardContent>
    </Card>
  );
}
```

### 3. Actualización selectiva

Optimiza el rendimiento actualizando solo los gráficos necesarios:

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@/components/ui/area-chart";

export function GraficoOptimizadoActualizacion({ initialData }) {
  const [data, setData] = useState(initialData);
  
  // Usar useCallback para evitar recreaciones innecesarias
  const actualizarDatos = useCallback(async () => {
    // Actualizar solo si es necesario
    const nuevosDatos = await fetchNuevosDatos();
    if (sonDatosDiferentes(data, nuevosDatos)) {
      setData(nuevosDatos);
    }
  }, [data]);
  
  // Establecer intervalo para actualización periódica
  useEffect(() => {
    const intervalo = setInterval(actualizarDatos, 60000); // Cada minuto
    return () => clearInterval(intervalo);
  }, [actualizarDatos]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendencias en Tiempo Real</CardTitle>
      </CardHeader>
      <CardContent>
        <AreaChart
          data={data}
          // Resto de propiedades
        />
      </CardContent>
    </Card>
  );
}

// Helpers
function fetchNuevosDatos() {
  // Lógica para obtener nuevos datos
}

function sonDatosDiferentes(datosA, datosB) {
  // Comparación eficiente para evitar rerenders innecesarios
}
```

## Conclusión

Los gráficos de shadcn/ui proporcionan una manera elegante y personalizable de visualizar datos complejos en nuestra aplicación de análisis del mercado laboral y educativo. Al combinar estos componentes con los datos de Supabase y aplicar las estrategias detalladas en esta guía, podemos crear dashboards interactivos, accesibles y visualmente atractivos que comuniquen eficazmente información valiosa a nuestros usuarios.

La flexibilidad del enfoque "copy-paste" de shadcn/ui nos permite adaptar completamente cada visualización a nuestras necesidades específicas, mientras que la base sólida de Recharts garantiza un rendimiento óptimo y una amplia gama de opciones de personalización.

Al implementar estas visualizaciones, recuerda siempre priorizar:
1. La claridad en la comunicación de los datos
2. La accesibilidad para todos los usuarios
3. El rendimiento en diferentes dispositivos
4. La coherencia visual con la identidad del proyecto

Con estos principios en mente, nuestros dashboards no solo serán hermosos, sino también funcionales y efectivos para el análisis de datos.

## Recursos Adicionales

- [Documentación oficial de shadcn/ui Charts](https://ui.shadcn.com/charts)
- [Documentación de Recharts](https://recharts.org/en-US/)
- [Guía de accesibilidad para visualizaciones de datos](https://www.w3.org/WAI/RD/2012/data-visualization/)
- [Principios de diseño de información](https://www.edwardtufte.com/tufte/books_vdqi)