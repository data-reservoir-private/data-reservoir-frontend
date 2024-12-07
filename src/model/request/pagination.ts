import { InferType, number, object } from "yup"

export const PaginationRequestSchema = object({
  currentPage: number().required().min(0),
  pageSize: number().required().oneOf([5, 10, 20, 50, 100])
});
export type PaginationRequest = InferType<typeof PaginationRequestSchema>
