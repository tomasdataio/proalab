"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Database } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase"

export function ConnectionTest() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tables, setTables] = useState<any[]>([])
  const [tableData, setTableData] = useState<any[]>([])
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  
  const supabase = createBrowserClient()

  const testConnection = async () => {
    setIsLoading(true)
    setError(null)
    setIsConnected(null)
    
    try {
      // Intentar obtener la lista de tablas en el esquema 'empleabilidad'
      const { data, error } = await supabase
        .from('informalidad')
        .select('*')
        .limit(1)
      
      if (error) throw error
      
      setIsConnected(true)
      
      // Obtener lista de tablas
      const { data: tablesData, error: tablesError } = await supabase
        .rpc('get_tables')
      
      if (tablesError) {
        console.error("Error al obtener tablas:", tablesError)
        // Si no podemos obtener las tablas con RPC, mostramos que estamos conectados pero no hay datos
        setTables([])
      } else {
        setTables(tablesData || [])
      }
      
    } catch (err: any) {
      console.error("Error al probar la conexión:", err)
      setIsConnected(false)
      setError(err.message || 'Error al conectar con Supabase')
    } finally {
      setIsLoading(false)
    }
  }
  
  const fetchTableData = async (tableName: string) => {
    setIsLoading(true)
    setTableData([])
    setSelectedTable(tableName)
    
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(5)
      
      if (error) throw error
      
      setTableData(data || [])
    } catch (err: any) {
      console.error(`Error al obtener datos de ${tableName}:`, err)
      setError(err.message || `Error al obtener datos de ${tableName}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-6 w-6" />
          Prueba de Conexión a Supabase
        </CardTitle>
        <CardDescription>
          Verifica la conexión con la base de datos y muestra información básica
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected === true && (
          <div className="flex items-center text-green-500 bg-green-50 p-3 rounded-md">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            <span>Conexión establecida correctamente</span>
          </div>
        )}
        
        {isConnected === false && (
          <div className="flex items-center text-red-500 bg-red-50 p-3 rounded-md">
            <XCircle className="mr-2 h-5 w-5" />
            <span>{error || 'Error de conexión con Supabase'}</span>
          </div>
        )}
        
        {isConnected && tables.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Tablas disponibles:</h3>
            <div className="flex flex-wrap gap-2">
              {tables.map((table, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm"
                  onClick={() => fetchTableData(table.table_name)}
                >
                  {table.table_name}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {selectedTable && tableData.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Datos de muestra ({selectedTable}):</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    {Object.keys(tableData[0]).map((column, index) => (
                      <th key={index} className="border p-2 text-left">{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value: any, valIndex) => (
                        <td key={valIndex} className="border p-2">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={testConnection} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Probando conexión..." : "Probar conexión con Supabase"}
        </Button>
      </CardFooter>
    </Card>
  )
} 