import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Datos del Mercado Laboral",
  description: "Exploración de datos del mercado laboral y educativo",
}

export default function DatosPage() {
  // Datos de ejemplo
  const datosEjemplo = [
    { carrera: "Ingeniería Civil", empleabilidad: "87%", salarioPromedio: "$1,250,000", demanda: "Alta" },
    { carrera: "Medicina", empleabilidad: "95%", salarioPromedio: "$1,850,000", demanda: "Alta" },
    { carrera: "Derecho", empleabilidad: "82%", salarioPromedio: "$1,350,000", demanda: "Media" },
    { carrera: "Psicología", empleabilidad: "78%", salarioPromedio: "$950,000", demanda: "Media" },
    { carrera: "Administración de Empresas", empleabilidad: "84%", salarioPromedio: "$1,150,000", demanda: "Alta" },
    { carrera: "Diseño Gráfico", empleabilidad: "75%", salarioPromedio: "$850,000", demanda: "Media" },
    { carrera: "Enfermería", empleabilidad: "92%", salarioPromedio: "$1,050,000", demanda: "Alta" },
    { carrera: "Arquitectura", empleabilidad: "80%", salarioPromedio: "$1,200,000", demanda: "Media" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Datos del Mercado Laboral</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Exploración de Datos</CardTitle>
          <CardDescription>
            Visualización de datos clave sobre empleabilidad, salarios y demanda laboral por carrera.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Datos de empleabilidad y salarios por carrera (datos de ejemplo)</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Carrera</TableHead>
                <TableHead>Empleabilidad</TableHead>
                <TableHead>Salario Promedio</TableHead>
                <TableHead>Demanda</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datosEjemplo.map((dato, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{dato.carrera}</TableCell>
                  <TableCell>{dato.empleabilidad}</TableCell>
                  <TableCell>{dato.salarioPromedio}</TableCell>
                  <TableCell>{dato.demanda}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fuentes de Datos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Los datos presentados en esta plataforma provienen de diversas fuentes oficiales, 
              incluyendo ministerios de educación, institutos de estadística y estudios sectoriales.
              Todos los datos son procesados y normalizados para garantizar su comparabilidad.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Metodología</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              La metodología utilizada para el análisis de datos incluye técnicas estadísticas 
              avanzadas y modelos predictivos que permiten identificar tendencias y patrones 
              en el mercado laboral y educativo.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 