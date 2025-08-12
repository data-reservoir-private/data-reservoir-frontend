import { z } from 'zod/v4'

const inArray = <TArg>(array: TArg[] = []) => (input: TArg) => array.includes(input);

export const PaginationSchema = z.object({
  pageSize: z.coerce.number().refine(inArray([0, 5, 10, 25, 30, 50, 100]), "PageSize expects [0, 5, 10, 25, 30, 50, 100]").default(0),
  currentPage: z.coerce.number().gte(1, "CurrentPage must be greater than 1").default(1)
});