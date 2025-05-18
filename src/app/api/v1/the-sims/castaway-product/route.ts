import { DB_SQL } from "@/database/db-new";
import { newResponse, GETMethodRoute } from "@/utilities/api";
import { castawayProductInTheSims } from "@drizzle/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  pageSize: z.coerce.number().optional()
})

export const GET = GETMethodRoute(schema, async (_, query) => {
  return NextResponse.json(newResponse(
    await DB_SQL.query.castawayProductInTheSims.findMany({
      extras: {
        image: sql<string>`${process.env.IMAGE_URL} || ${castawayProductInTheSims.image}`.as("image")
      },
      limit: query.pageSize
    })
  ));
})