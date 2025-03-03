import { NextResponse } from 'next/server'
import { listTables } from '@/lib/db/list-tables'
import { TableInfo, TableColumn, SchemaResponse } from '@/types/schema'

export async function GET() {
  try {
    const tables = await listTables()
    
    if (!tables) {
      return NextResponse.json(
        { error: 'No se encontraron tablas' },
        { status: 404 }
      )
    }

    const response: SchemaResponse = {
      status: 'ok',
      tables: (tables as TableInfo[]).map(table => ({
        name: table.table_info.table_name,
        columns: table.table_info.columns.map((col: TableColumn) => ({
          name: col.name,
          type: col.type,
          nullable: col.nullable,
          default: col.default,
          maxLength: col.max_length,
          isIdentity: col.is_identity
        }))
      }))
    }

    return NextResponse.json(response)

  } catch (error: any) {
    console.error('Error listing tables:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
