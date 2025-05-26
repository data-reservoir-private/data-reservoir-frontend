import { GETMethodRoute } from "@/utilities/api";
import { z } from "zod/v4";

interface MonthlyResult {
  date: Date,
  tenant: string,
  categories: string[],
  details: {
    category: string,
    order: string,
    quantity: number,
    price: number
  },
  total: number
}

const schema = z.object({
  year: z.coerce.number().default(new Date().getFullYear()),
  month: z.coerce.number().default(new Date().getMonth() + 1)
})

export const GET = GETMethodRoute(schema, async (_, { year, month }) => {
  return {};
});