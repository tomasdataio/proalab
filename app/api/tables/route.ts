import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = supabaseAdmin()
    
    // Consultar tablas públicas directamente
    const { data, error } = await supabase.from('information_schema.tables')
      .select('table_schema, table_name')
      .eq('table_schema', 'public')
    
    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Error al obtener tablas",
          error: error.message,
        },
        { status: 500 }
      )
    }
    
    // Obtener algunos datos de muestra de cada tabla
    const results = []
    
    for (const table of data || []) {
      try {
        const { data: sample, error: sampleError } = await supabase
          .from(table.table_name)
          .select('*')
          .limit(1)
        
        results.push({
          schema: table.table_schema,
          name: table.table_name,
          sample: sample,
          error: sampleError ? sampleError.message : null
        })
      } catch (e: any) {
        results.push({
          schema: table.table_schema,
          name: table.table_name,
          error: e.message || String(e)
        })
      }
    }
    
    return NextResponse.json({
      status: "success",
      tables: results
    })
    
  } catch (error: any) {
    console.error("Error al consultar tablas:", error.message);
    return NextResponse.json(
      {
        status: "error",
        message: "Error al obtener información de tablas",
        error: error.message || String(error),
      },
      { status: 500 }
    )
  }
}