export type IDashboardResponse = {
  category: string
  owner: string
  prefix: string
  rows: number,
  dataTotal: number,
  tables: {
    tableName: string
    tableURL: string
    rowCount: number
  }[],
  datasets: {
    name: string,
    total: number
  }[]
}