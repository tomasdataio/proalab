"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  HeaderContext,
  CellContext,
  Row,
  Header,
  HeaderGroup,
  Cell,
  PaginationState,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"

interface TablaResumenProps {
  datos: Record<string, any>[]
  columnas: { field: string; header: string }[]
  ordenablePor?: string[]
  titulo?: string
}

export function TablaResumenShadcn({
  datos,
  columnas,
  ordenablePor = [],
  titulo,
}: TablaResumenProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [error, setError] = React.useState<string | null>(null)
  const [datosValidados, setDatosValidados] = React.useState<Record<string, any>[]>([])

  // Validar y procesar datos
  React.useEffect(() => {
    try {
      // Validar que datos sea un array
      if (!datos || !Array.isArray(datos)) {
        setError("Los datos no son válidos")
        setDatosValidados([])
        return
      }

      // Limitar a un máximo de 1000 filas
      const datosLimitados = datos.slice(0, 1000)
      
      // Validar estructura de datos
      if (datosLimitados.length > 0) {
        const camposRequeridos = columnas.map(col => col.field)
        
        // Verificar que los datos contengan al menos algunas de las columnas requeridas
        const primeraFila = datosLimitados[0]
        const algunaColumnaPresente = camposRequeridos.some(campo => campo in primeraFila)
        
        if (!algunaColumnaPresente) {
          setError("Los datos no contienen las columnas necesarias")
          setDatosValidados([])
          return
        }
      }
      
      // Procesar y limpiar los datos
      const datosProcesados = datosLimitados.map(d => {
        const obj: Record<string, any> = {}
        
        // Incluir solo los campos definidos en columnas
        columnas.forEach(col => {
          const campo = col.field
          obj[campo] = d[campo] !== undefined ? d[campo] : null
        })
        
        return obj
      })
      
      setDatosValidados(datosProcesados)
      setError(null)
    } catch (err) {
      console.error("Error al procesar datos de la tabla:", err)
      setError("Error al procesar los datos de la tabla")
      setDatosValidados([])
    }
  }, [datos, columnas])

  // Convertir la configuración de columnas al formato de tanstack/react-table
  const columns: ColumnDef<Record<string, any>>[] = React.useMemo(() => {
    return columnas.map((col) => {
      const canSort = ordenablePor.includes(col.field)
      
      return {
        accessorKey: col.field,
        header: ({ column }: HeaderContext<Record<string, any>, unknown>) => {
          return canSort ? (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              {col.header}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            col.header
          )
        },
        cell: ({ row }: CellContext<Record<string, any>, unknown>) => {
          const value = row.getValue(col.field)
          // Manejar diferentes tipos de valores
          let formattedValue
          
          if (value === null || value === undefined) {
            formattedValue = "—" // Em dash para valores vacíos
          } else if (typeof value === 'number') {
            formattedValue = value.toLocaleString()
          } else if (typeof value === 'boolean') {
            formattedValue = value ? "Sí" : "No"
          } else {
            formattedValue = value
          }
          
          return formattedValue
        },
        enableSorting: canSort,
      }
    })
  }, [columnas, ordenablePor])

  // Configurar la tabla con paginación
  const table = useReactTable({
    data: datosValidados,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Manejar errores y estados vacíos
  if (error) {
    return (
      <Card className="w-full">
        {titulo && (
          <CardHeader>
            <CardTitle>{titulo}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-destructive text-center">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (datosValidados.length === 0) {
    return (
      <Card className="w-full">
        {titulo && (
          <CardHeader>
            <CardTitle>{titulo}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columnas.map((col) => (
                    <TableHead key={col.field}>{col.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columnas.length} className="h-24 text-center">
                    No se encontraron datos
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      {titulo && (
        <CardHeader>
          <CardTitle>{titulo}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<Record<string, any>>) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header: Header<Record<string, any>, unknown>) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row: Row<Record<string, any>>) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell: Cell<Record<string, any>, unknown>) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columnas.length} className="h-24 text-center">
                    No se encontraron datos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Controles de paginación */}
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="text-sm text-muted-foreground">
            Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, datosValidados.length)} de {datosValidados.length} registros
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 