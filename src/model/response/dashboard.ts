export type IDashboardResponse = {
  category: string
  owner: string
  prefix: string
  rows: number
  tables: {
    tableName: string
    tableURL: string
    rowCount: number
  }[]
}