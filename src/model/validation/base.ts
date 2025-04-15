import { z } from 'zod'

const inArray = <TArg>(array: TArg[] = []) => (input: TArg) => array.includes(input);

export const PaginationSchema = z.object({
  pageSize: z.coerce.number().refine(inArray([0, 5, 10, 25, 30, 50, 100]), "Invalid number").default(0),
  currentPage: z.coerce.number().gte(1).default(1)
});
