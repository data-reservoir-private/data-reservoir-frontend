import { DB_SQL } from "@/database/db-new";
import { PaginationSchema } from "@/model/validation/base";
import { newResponse, GETMethodRoute } from "@/utilities/api";
import { fourPcHarvestableInTheSims } from "@drizzle/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

const schema = z.object({
  field: z.string()
}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return NextResponse.json(newResponse(
    await DB_SQL.query.fourPcHarvestableInTheSims.findMany({
      extras: {
        image: sql<string>`${process.env.IMAGE_URL} || ${fourPcHarvestableInTheSims.image}`.as("image")
      },
      limit: query.pageSize,
      offset: query.currentPage * query.pageSize
    })
  ));
});