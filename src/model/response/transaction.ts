export interface TransactionSummaryResponse {
  year: number;
  month: number;
  total: number;
}

export interface TransactionCategoryResponse {
  year: number;
  month: number;
  total: number;
  category: string;
}