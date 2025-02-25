import { InferType, number, object } from "yup";

export const TransactionMonthlySchema = object({
  month: number().required().min(1).max(12),
  year: number().required().min(new Date().getFullYear() - 5).max(new Date().getFullYear())
});
export type TransactionMonthly = InferType<typeof TransactionMonthlySchema>
