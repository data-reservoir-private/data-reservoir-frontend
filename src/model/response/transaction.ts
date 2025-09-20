export type ITransactionMonthlyResponse = {
  'category': {
    category: string
    total: number
  },
  'daily': {
    date: string
    total: number
  },
  'income': {
    source: string
    total: number
  },
  'top': {
    date: string
    tenant: string
    order: string
    price: number
    category: string
  }
}