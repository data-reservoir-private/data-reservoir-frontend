import { DB_SQL } from "@/database/db-new";
import { PaginationSchema } from "@/model/validation/base";
import { newResponse, GETMethodRoute } from "@/utilities/api";
import { NextResponse } from "next/server";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return NextResponse.json(newResponse(
    await DB_SQL.query.twoConsoleCareerInTheSims.findMany({
      limit: query.pageSize === 0 ? undefined : query.pageSize,
      offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
    })
  ));
});