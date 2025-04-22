import { GetHaydayOrderSummary } from "@/service/hayday";
import { newResponse, routeInstance } from "@/utilities/api";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  year: z.coerce.number().gte(2010).lte(new Date().getFullYear()).optional(),
  month: z.coerce.number().gte(1).lte(1).optional()
})

export const GET = routeInstance
  .query(schema)
  .handler(async (_, { query }) => {
    return NextResponse.json(
      newResponse(await GetHaydayOrderSummary((query.year && query.month) ? {
        year: query.year,
        month: query.month
      } : undefined))
    )
  });