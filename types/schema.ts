export interface TableColumn {
  name: string
  type: string
  nullable: boolean
  default?: string
  max_length?: number
  is_identity: boolean
}

export interface TableInfo {
  table_info: {
    table_name: string
    columns: TableColumn[]
  }
}

export interface SchemaResponse {
  status: string
  tables: Array<{
    name: string
    columns: Array<{
      name: string
      type: string
      nullable: boolean
      default?: string
      maxLength?: number
      isIdentity: boolean
    }>
  }>
}
