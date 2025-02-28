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
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

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
          const formattedValue = typeof value === 'number' ? value.toLocaleString() : value
          return formattedValue
        },
        enableSorting: canSort,
      }
    })
  }, [columnas, ordenablePor])

  const table = useReactTable({
    data: datos,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

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
      </CardContent>
    </Card>
  )
} 