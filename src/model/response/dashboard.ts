export type IDashboardResponse = {
  category: string
  owner: string
  prefix: string
  rows: number,
  dataTotal: number,
  sizeTotal: number,
  tables: {
    tableName: string
    tableURL: string
    rowCount: number
    size: number
  }[],
  datasets: {
    name: string,
    total: number
  }[]
}