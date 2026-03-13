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
  },
  'export': {
    id: string
    tenant: string
    date: string
    taxDiscount: number
    details: {
      category: string
      order: string
      quantity: number
      price: number
      subtotal: number
    }[]
    detailTotal: number
  },
  'export-flat': {
    id: string
    tenant: string
    date: string
    orderCategory: string
    orderName: string
    orderQuantity: number
    orderPrice: number
  }
}