import { TransactionMasterSchema, TransactionTransportSchema } from "@/database/schema/transaction"
import { HasID } from "./base"

export interface TransactionMasterRaw extends Omit<TransactionMasterSchema & HasID, '_id'> {}
export interface TransactionTransportRaw extends Omit<TransactionTransportSchema & HasID, '_id'> {}


export interface TransactionSummaryResponse {
  monthly: TransactionSummaryMonthlyResponse[],
  category: TransactionSummaryCategoryResponse[]
}

export interface TransactionMonthlyResponse {
  income: {
    total: number,
    percentage: number,
    detail: {
      name: string,
      total: number
    }[]
  },
  expense: {
    total: number,
    percentage: number,
    topTen: {
      tenant: string,
      date: Date,
      total: number,
      details: {
        name: string,
        quantity: string,
        price: string
      }[]
    }[],
    category: {
      name: string
      total: number
    }[],
  }
}


export interface TransactionSummaryMonthlyResponse {
  year: number;
  month: number;
  total: number;
}

export interface TransactionSummaryCategoryResponse {
  category: string;
  total: number;
}