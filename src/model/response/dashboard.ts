export interface DashboardResponse {
  category: string,
  owner: string,
  prefix: string,
  tables: DashboardTableResponse[]
}

export interface DashboardTableResponse {
  tableName: string,
  tableUrl: string,
  rowCount: number,
}