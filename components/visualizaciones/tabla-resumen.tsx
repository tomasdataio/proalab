// components/visualizaciones/tabla-resumen.tsx
"use client"

import { useState } from "react"

interface Columna {
  field: string
  header: string
}

interface TablaResumenProps {
  datos: any[]
  columnas: Columna[]
  ordenablePor?: string[]
}

export function TablaResumen({ datos, columnas, ordenablePor = [] }: TablaResumenProps) {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (!ordenablePor.includes(field)) return

    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = [...datos].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue
  })

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            {columnas.map((columna) => (
              <th
                key={columna.field}
                className={`p-2 text-left border ${
                  ordenablePor.includes(columna.field) ? "cursor-pointer" : ""
                } ${sortField === columna.field ? "bg-muted-foreground/20" : ""}`}
                onClick={() => handleSort(columna.field)}
              >
                <div className="flex items-center">
                  {columna.header}
                  {ordenablePor.includes(columna.field) && (
                    <span className="ml-1">{sortField === columna.field && (sortDirection === "asc" ? "↑" : "↓")}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
              {columnas.map((columna) => (
                <td key={columna.field} className="p-2 border">
                  {row[columna.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

