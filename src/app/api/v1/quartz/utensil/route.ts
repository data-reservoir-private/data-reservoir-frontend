import { DB_SQL } from "@/database/db-new";
import { PaginationSchema } from "@/model/validation/base";
import { GETMethodRoute } from "@/utilities/api";
import { utensilInQuartz } from "@drizzle/schema";
import { sql } from "drizzle-orm";
import { z } from "zod/v4";

const schema = z.object({}).extend(PaginationSchema.shape);

export const GET = GETMethodRoute(schema, async (_, query) => {
  return (
    await DB_SQL.query.utensilInQuartz.findMany({
      extras: {
        image: sql<string>`${process.env.IMAGE_URL} || ${utensilInQuartz.image}`.as("image")
      },
      limit: query.pageSize === 0 ? undefined : query.pageSize,
      offset: query.pageSize === 0 ? 0 : query.currentPage * query.pageSize
    })
  );
}, { cache: true });